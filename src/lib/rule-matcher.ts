import { LuggageItem, AnalysisResult, TripInfo, ItemStatus, PlacementType } from '@/types/luggage';
import { ITEM_RULES } from '@/data/rules-database';

/**
 * Normalize text to lowercase for keyword matching
 */
function normalize(text: string): string {
  return text.toLowerCase().trim();
}

/**
 * Check if any keyword from the rule matches the item name
 */
function matchesRule(itemName: string, keywords: string[]): boolean {
  const normalizedItem = normalize(itemName);
  return keywords.some(kw => normalizedItem.includes(normalize(kw)));
}

/**
 * Determine if there's a placement warning
 */
function getPlacementWarning(
  itemPlacement: PlacementType,
  rulePlacement: PlacementType | undefined,
  warningMessage: string | undefined
): string | undefined {
  if (!rulePlacement || rulePlacement === 'either') return undefined;
  if (itemPlacement === 'either') return undefined;
  if (itemPlacement !== rulePlacement && warningMessage) {
    return warningMessage;
  }
  return undefined;
}

/**
 * Match a single item against the rules database
 */
function matchItem(item: LuggageItem, trip: TripInfo): AnalysisResult | null {
  const transport = trip.transportMode === 'plane' ? 'plane' : 'ship';

  // Find the best matching rule
  const matchedRules = ITEM_RULES.filter(rule => {
    const transportMatch = rule.transport === transport || rule.transport === 'both';
    const keywordMatch = matchesRule(item.name, rule.keywords);
    return transportMatch && keywordMatch;
  });

  if (matchedRules.length === 0) return null;

  // Pick the most specific rule (prefer transport-specific over 'both')
  const rule = matchedRules.find(r => r.transport === transport) || matchedRules[0];

  const placementWarning = getPlacementWarning(
    item.placement,
    rule.placement,
    rule.placementWarningIfWrong
  );

  return {
    item: item.name,
    status: rule.status as ItemStatus,
    placement: rule.placement || item.placement,
    placementWarning,
    reasons: rule.reasons,
    tips: rule.tips,
    customsNote: rule.customsNote,
  };
}

/**
 * Generate a generic result for items not found in the database
 */
function generateGenericResult(item: LuggageItem, trip: TripInfo): AnalysisResult {
  const isPlane = trip.transportMode === 'plane';
  return {
    item: item.name,
    status: 'conditional',
    placement: item.placement,
    reasons: [
      `Tidak ada aturan spesifik yang ditemukan untuk "${item.name}" dalam database offline.`,
      'Aturan umum berlaku berdasarkan moda transportasi yang dipilih.',
    ],
    tips: isPlane
      ? [
          'Periksa aturan maskapai Anda untuk barang ini',
          'Cairan ≤100ml boleh di kabin jika termasuk kategori LAGs',
          'Hubungi maskapai atau bandara untuk konfirmasi',
        ]
      : [
          'Periksa aturan operator kapal Anda untuk barang ini',
          'Perhatikan batas berat bagasi yang berlaku',
          'Hubungi operator kapal untuk konfirmasi',
        ],
    customsNote:
      trip.tripType === 'international'
        ? 'Untuk perjalanan internasional, cek aturan bea cukai dan karantina negara tujuan.'
        : undefined,
  };
}

/**
 * Main rule-matching function — runs locally without AI
 */
export function analyzeWithRuleEngine(
  items: LuggageItem[],
  trip: TripInfo
): AnalysisResult[] {
  return items.map(item => {
    const result = matchItem(item, trip);
    return result ?? generateGenericResult(item, trip);
  });
}

/**
 * Generate general advice based on trip context
 */
export function generateGeneralAdvice(trip: TripInfo): string {
  const lines: string[] = [];

  if (trip.transportMode === 'plane') {
    lines.push('✈️ **Penerbangan**: Pastikan semua baterai litium (powerbank, laptop, vape) ada di tas kabin.');
    if (trip.tripType === 'international') {
      lines.push('🌏 **Internasional**: Cairan di kabin maks 100ml per wadah, total 1 liter dalam ziplock transparan.');
    }
  } else {
    lines.push('🚢 **Kapal Laut**: Perhatikan batas berat bagasi gratis (Pelni: 40kg dewasa).');
    lines.push('⛽ Bahan bakar, gas, dan bahan mudah terbakar dilarang keras di kapal penumpang.');
  }

  if (trip.tripType === 'international') {
    const dest = trip.destinationCountry;
    lines.push(`📋 Isi formulir bea cukai / kartu deklarasi penumpang setibanya di ${dest}.`);
  }

  return lines.join('\n');
}
