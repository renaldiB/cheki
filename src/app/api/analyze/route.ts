import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AnalyzeRequest, AnalyzeResponse, AnalysisResult } from '@/types/luggage';
import { analyzeWithRuleEngine, generateGeneralAdvice } from '@/lib/rule-matcher';
import { analyzeRateLimiter, getClientIp } from '@/lib/rate-limiter';
import { sanitizeText, validatePayloadSize, MAX_ITEMS, MAX_ITEM_NAME_LEN, MAX_LOCATION_LEN } from '@/lib/sanitizer';

const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';
const AI_TIMEOUT = parseInt(process.env.AI_TIMEOUT_MS || '60000', 10);

function buildSystemPrompt(): string {
  return `Anda adalah Cheki AI, asisten spesialis inspeksi keselamatan barang bawaan perjalanan untuk penerbangan (pesawat) dan pelayaran maritim (kapal laut) di Indonesia dan internasional.

Pengetahuan Anda mencakup:
- Aturan Dangerous Goods ICAO / IATA (baterai litium, powerbank Wh/mAh, cairan LAGs 100ml, aerosol, senjata tajam)
- Aturan keselamatan kapal penumpang IMO / SOLAS / PT PELNI / ASDP (larangan tabung gas, jeriken BBM, durian, batas berat)
- Ketentuan Bea Cukai Indonesia (PMK 203/PMK.04/2017): batas FOB USD 500 per orang, pendaftaran IMEI gadget baru, batas rokok (200 batang) & miras (1 liter), uang tunai >= Rp 100 juta
- Aturan Karantina Pertanian & Hewan (BARANTAN UU No 21/2019): larangan buah/daging segar tanpa sertifikat
- Kepatuhan khusus negara-negara dunia: Singapura (larangan vape/e-cigarette & permen karet, tanpa pembebasan cukai rokok), Australia (biosecurity ketat deklarasi makanan), Jepang (larangan obat flu dengan pseudoephedrine tertentu & daging mentah), Arab Saudi (air zamzam resmi maskapai, zero tolerance alkohol/pornografi), dan negara-negara lain di seluruh dunia.

Jika pengguna memasukkan negara tujuan yang tidak ada dalam daftar umum, analisa secara spesifik dan cerdas berdasarkan regulasi pabean, imigrasi, dan penerbangan negara tersebut.`;
}

function buildUserPrompt(req: AnalyzeRequest): string {
  const { items, trip } = req;
  const moda = trip.transportMode === 'plane' ? '✈️ Pesawat Udara' : '🚢 Kapal Laut';
  const jenis = trip.tripType === 'domestic' ? 'Domestik' : 'Internasional';
  const itemList = items
    .map(
      (it, i) =>
        `${i + 1}. Barang: "${it.name}" | Rencana Penempatan Tas: ${
          it.placement === 'cabin'
            ? 'Tas Kabin (Carry-On)'
            : it.placement === 'checkin'
            ? 'Bagasi Check-In (Kargo)'
            : 'Belum Ditentukan'
        }${it.quantity ? ` | Spesifikasi/Ukuran: ${it.quantity}` : ''}`
    )
    .join('\n');

  return `Lakukan inspeksi dan analisa kepatuhan barang bawaan berikut:
- Moda Transportasi: ${moda}
- Jenis Rute: ${jenis}
- Negara Asal: ${trip.originCountry || 'Indonesia'}
- Negara Tujuan: ${trip.destinationCountry || 'Tujuan'}

DAFTAR BARANG:
${itemList}

Wajib berikan output HANYA format JSON valid tanpa tanda markdown (tidak boleh dibungkus \`\`\`json):
{
  "results": [
    {
      "item": "nama barang",
      "status": "allowed|conditional|forbidden",
      "placement": "cabin|checkin|either",
      "placementWarning": "peringatan keras JIKA penempatan yang direncanakan pengguna SALAH atau berbahaya (misal powerbank ditaruh di bagasi check-in kargo). Jika penempatan aman, isi null",
      "reasons": ["alasan aturan 1", "alasan aturan 2"],
      "tips": ["tips pengepakan/keamanan 1", "tips 2"],
      "customsNote": "catatan pabean/bea cukai/karantina negara tujuan (atau null)"
    }
  ],
  "generalAdvice": "2-3 kalimat saran umum keselamatan dan kepatuhan perjalanan untuk rute ini",
  "customsInfo": "ringkasan ketentuan Bea Cukai relevan untuk rute perjalanan ini",
  "countrySpecificNotes": "catatan aturan khusus otoritas negara tujuan yang wajib diketahui penumpang"
}

Kriteria Penilaian Status:
- "allowed": Aman dan diizinkan dibawa tanpa syarat rumit
- "conditional": Boleh dibawa tetapi ada batasan/syarat wajib (kapasitas Wh, maks 100ml, wajib kabin, resep dokter, deklarasi karantina, dsb)
- "forbidden": Dilarang keras dibawa dalam perjalanan ini

Pastikan bahasa respons adalah Bahasa Indonesia yang jelas, profesional, dan ramah pengguna.`;
}

function cleanJsonResponse(raw: string): string {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned;
}

async function callAI(req: AnalyzeRequest, customKey?: string): Promise<AnalyzeResponse> {
  const apiKey = customKey || AI_API_KEY;
  if (!apiKey) {
    throw new Error('No API Key configured');
  }

  const client = new OpenAI({
    apiKey,
    baseURL: AI_BASE_URL,
    timeout: AI_TIMEOUT,
    maxRetries: parseInt(process.env.AI_MAX_RETRIES || '1', 10),
  });

  const response = await client.chat.completions.create({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(req) },
    ],
    temperature: 0.2,
  });

  const rawContent = response.choices[0]?.message?.content ?? '{}';
  const cleaned = cleanJsonResponse(rawContent);

  let parsed: Partial<AnalyzeResponse>;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('[Cheki API] Failed to parse JSON from AI response');
    throw new Error('AI response could not be parsed as valid JSON');
  }

  return {
    results: (parsed.results || []) as AnalysisResult[],
    generalAdvice: parsed.generalAdvice || '',
    customsInfo: parsed.customsInfo,
    countrySpecificNotes: parsed.countrySpecificNotes,
    analysisSource: 'ai',
  };
}

export async function POST(request: NextRequest) {
  // 1. Rate Limiting Check (Anti-DDoS & API Credit Protection)
  const clientIp = getClientIp(request);
  const rateLimit = analyzeRateLimiter.check(clientIp);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak permintaan pemindaian. Batas: ${rateLimit.limit} per menit. Silakan tunggu ${rateLimit.retryAfter} detik.`,
        retryAfter: rateLimit.retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': '0',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  // 2. Payload Size Limit Check (Max 50KB to prevent memory exhaustion)
  const contentLength = request.headers.get('content-length');
  if (!validatePayloadSize(contentLength)) {
    return NextResponse.json(
      { error: 'Ukuran data terlalu besar. Maksimum data adalah 50KB.' },
      { status: 413 }
    );
  }

  let body: AnalyzeRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Format data JSON tidak valid' }, { status: 400 });
  }

  // 3. Validate items array
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Silakan berikan minimal 1 barang bawaan untuk dianalisa.' }, { status: 400 });
  }

  // 4. Sanitize and bound items (Anti-abuse & Anti-Prompt-Injection)
  const boundedItems = body.items.slice(0, MAX_ITEMS);
  const validItems = boundedItems
    .filter(it => it && typeof it.name === 'string' && it.name.trim().length > 0)
    .map(it => ({
      ...it,
      name: sanitizeText(it.name, MAX_ITEM_NAME_LEN),
      quantity: it.quantity ? sanitizeText(it.quantity, 50) : undefined,
    }))
    .filter(it => it.name.length > 0);

  if (validItems.length === 0) {
    return NextResponse.json({ error: 'Nama barang tidak valid atau kosong.' }, { status: 400 });
  }

  // 5. Sanitize trip info
  const rawTrip = body.trip || {
    transportMode: 'plane',
    tripType: 'international',
    originCountry: 'Indonesia',
    destinationCountry: 'Tujuan',
    isCustomDestination: false,
  };

  const trip = {
    transportMode: rawTrip.transportMode === 'ship' ? ('ship' as const) : ('plane' as const),
    tripType: rawTrip.tripType === 'domestic' ? ('domestic' as const) : ('international' as const),
    originCountry: sanitizeText(rawTrip.originCountry || 'Indonesia', MAX_LOCATION_LEN),
    destinationCountry: sanitizeText(rawTrip.destinationCountry || 'Tujuan', MAX_LOCATION_LEN),
    isCustomDestination: Boolean(rawTrip.isCustomDestination),
  };

  const sanitizedReq: AnalyzeRequest = {
    items: validItems,
    trip,
  };

  const standardHeaders = {
    'X-RateLimit-Limit': String(rateLimit.limit),
    'X-RateLimit-Remaining': String(rateLimit.remaining),
    'Cache-Control': 'no-store, max-age=0',
  };

  // 6. Try AI inspection first if API key configured
  const userHeaderKey = request.headers.get('x-ai-key') || body.apiKey;
  const keyToUse = userHeaderKey || AI_API_KEY;

  if (keyToUse) {
    try {
      const aiResult = await callAI(sanitizedReq, userHeaderKey);
      if (aiResult.results && aiResult.results.length > 0) {
        return NextResponse.json(aiResult, { headers: standardHeaders });
      }
    } catch (aiErr) {
      console.warn('[Cheki API] AI call fallback to local engine:', (aiErr as Error)?.message || 'AI unavailable');
    }
  }

  // 7. Fallback: Local rule matcher engine
  const localResults = analyzeWithRuleEngine(validItems, trip);
  const generalAdvice = generateGeneralAdvice(trip);

  const fallbackResponse: AnalyzeResponse = {
    results: localResults,
    generalAdvice,
    analysisSource: 'local',
    countrySpecificNotes: trip.isCustomDestination
      ? `ℹ️ Lokasi "${trip.destinationCountry}" dianalisa menggunakan standar kepatuhan regulasi ICAO/IMO. Untuk rincian pabean lokal yang lebih spesifik, pastikan koneksi AI aktif.`
      : undefined,
  };

  return NextResponse.json(fallbackResponse, { headers: standardHeaders });
}
