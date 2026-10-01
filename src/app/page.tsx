'use client';

import { useState, useCallback } from 'react';
import clsx from 'clsx';
import CountrySelector from '@/components/CountrySelector';
import StatusBadge from '@/components/StatusBadge';
import LuggageCard from '@/components/LuggageCard';
import { LuggageItem, TripInfo, AnalyzeResponse, PlacementType, ChecklistItem, AnalysisResult } from '@/types/luggage';
import { setLocalStorage, getLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { PackingList } from '@/types/luggage';
import {
  Plane,
  Ship,
  ArrowLeftRight,
  Luggage,
  Backpack,
  Trash2,
  Plus,
  AlertTriangle,
  Radar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookmarkPlus,
  CheckCheck,
  Info,
  Globe,
  RotateCcw,
} from 'lucide-react';
import CustomDropdown, { DropdownOption } from '@/components/CustomDropdown';

type TransportMode = 'plane' | 'ship';

const FREQUENT_CHIPS = [
  { label: 'Powerbank 20.000mAh (74Wh)', value: 'Powerbank 20000mAh' },
  { label: 'Rendang Daging Sapi Vacuum (300g)', value: 'Rendang Daging Sapi kemasan vacuum' },
  { label: 'Disposable Vape Pod (2ml)', value: 'Vape Pod elektrik' },
  { label: 'Pisau Lipat Multi-Tool', value: 'Pisau lipat serbaguna' },
  { label: 'Laptop MacBook Pro 16" (99Wh)', value: 'Laptop MacBook Pro 16 inch' },
  { label: 'Spray Deodorant Aerosol 150ml', value: 'Parfum aerosol 150ml' },
  { label: 'Smartphone Baru Luar Negeri ($1,199)', value: 'Smartphone iPhone baru luar negeri' },
  { label: 'Kopi Bubuk Arabika Kemasan 250g', value: 'Kopi bubuk kemasan' },
];

const PLACEMENT_OPTIONS: DropdownOption<PlacementType>[] = [
  { value: 'either', label: 'Bebas Pilih', icon: <ArrowLeftRight size={13} className="text-slate-400" /> },
  { value: 'cabin', label: 'Rencana: Tas Kabin', icon: <Backpack size={13} className="text-sky-600" /> },
  { value: 'checkin', label: 'Rencana: Bagasi Kargo', icon: <Luggage size={13} className="text-emerald-600" /> },
];

export default function HomePage() {
  const [transport, setTransport] = useState<TransportMode>('plane');
  const [tripType, setTripType] = useState<'international' | 'domestic'>('domestic');
  const [origin, setOrigin] = useState('');
  const [originIsCustom, setOriginIsCustom] = useState(false);
  const [destination, setDestination] = useState('');
  const [destIsCustom, setDestIsCustom] = useState(false);

  // Input mode
  const [inputMode, setInputMode] = useState<'text' | 'structured'>('text');
  const [rawText, setRawText] = useState('');

  // Structured mode
  const [structuredItems, setStructuredItems] = useState<LuggageItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [allSavedToChecklist, setAllSavedToChecklist] = useState(false);

  // Quick chip adder
  const handleAddChip = (value: string) => {
    if (inputMode === 'text') {
      setRawText(prev => (prev.trim() ? `${prev.trim()}, ${value}` : value));
    } else {
      setStructuredItems(prev => [
        ...prev,
        { id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, name: value, placement: 'either' },
      ]);
    }
  };

  // Convert raw text into structured items
  const getPreparedItems = (): LuggageItem[] => {
    if (inputMode === 'structured') {
      return structuredItems.filter(i => i.name.trim().length > 0);
    }
    return rawText
      .split(/[,\n]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .map((name, idx) => {
        const lower = name.toLowerCase();
        let placement: PlacementType = 'either';
        let cleanName = name;

        if (lower.includes('di bagasi') || lower.includes('bagasi check-in') || lower.includes('koper')) {
          placement = 'checkin';
          cleanName = cleanName.replace(/di bagasi( check-in)?/i, '').replace(/koper/i, '').trim();
        } else if (lower.includes('di kabin') || lower.includes('kabin') || lower.includes('tas ransel')) {
          placement = 'cabin';
          cleanName = cleanName.replace(/di kabin/i, '').replace(/kabin/i, '').replace(/tas ransel/i, '').trim();
        }

        return {
          id: `raw-${idx}-${Date.now()}`,
          name: cleanName || name,
          placement,
        };
      });
  };

  // Swap Route Function
  const handleSwapRoute = () => {
    const tempOrigin = origin;
    const tempOriginCustom = originIsCustom;
    setOrigin(destination);
    setOriginIsCustom(destIsCustom);
    setDestination(tempOrigin);
    setDestIsCustom(tempOriginCustom);
  };

  const handleAnalyze = async () => {
    const preparedItems = getPreparedItems();

    if (preparedItems.length === 0) {
      setError('Silakan masukkan minimal 1 barang bawaan untuk dianalisa.');
      return;
    }
    if (!destination.trim()) {
      setError('Silakan pilih atau ketik tujuan perjalanan Anda.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setAllSavedToChecklist(false);

    setLoadingStep(1);
    const t1 = setTimeout(() => setLoadingStep(2), 1100);
    const t2 = setTimeout(() => setLoadingStep(3), 2200);

    const trip: TripInfo = {
      transportMode: transport,
      tripType,
      originCountry: origin || (tripType === 'domestic' ? 'Jakarta' : 'Indonesia'),
      destinationCountry: destination.trim(),
      isCustomDestination: destIsCustom,
    };

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: preparedItems, trip }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Terjadi kesalahan server (${res.status})`);
      }

      const data: AnalyzeResponse = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || 'Gagal menganalisa. Silakan coba lagi.');
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handleAddToChecklist = useCallback((itemResult: AnalysisResult) => {
    const lists = getLocalStorage<PackingList[]>(STORAGE_KEYS.PACKING_LISTS, []);
    const now = new Date().toISOString();

    const newItem: ChecklistItem = {
      id: `cl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: itemResult.item,
      placement: itemResult.placement === 'either' ? 'cabin' : itemResult.placement,
      checked: false,
      hasWarning: !!itemResult.placementWarning,
      warningMessage: itemResult.placementWarning,
    };

    if (lists.length === 0) {
      const newList: PackingList = {
        id: `list-${Date.now()}`,
        name: `Perjalanan ke ${destination || 'Tujuan'}`,
        items: [newItem],
        createdAt: now,
        updatedAt: now,
      };
      setLocalStorage(STORAGE_KEYS.PACKING_LISTS, [newList]);
    } else {
      lists[0].items.push(newItem);
      lists[0].updatedAt = now;
      setLocalStorage(STORAGE_KEYS.PACKING_LISTS, lists);
    }

    window.dispatchEvent(new Event('checklist-updated'));
  }, [destination]);

  const handleSaveAllToChecklist = () => {
    if (!result || !result.results) return;

    const lists = getLocalStorage<PackingList[]>(STORAGE_KEYS.PACKING_LISTS, []);
    const now = new Date().toISOString();

    const newItems: ChecklistItem[] = result.results.map((r, i) => ({
      id: `cl-${Date.now()}-${i}`,
      name: r.item,
      placement: r.placement === 'either' ? 'cabin' : r.placement,
      checked: false,
      hasWarning: !!r.placementWarning,
      warningMessage: r.placementWarning,
    }));

    if (lists.length === 0) {
      const newList: PackingList = {
        id: `list-${Date.now()}`,
        name: `Perjalanan ke ${destination || 'Tujuan'}`,
        items: newItems,
        createdAt: now,
        updatedAt: now,
      };
      setLocalStorage(STORAGE_KEYS.PACKING_LISTS, [newList]);
    } else {
      const existingNames = new Set(lists[0].items.map(it => it.name.toLowerCase()));
      const toAdd = newItems.filter(it => !existingNames.has(it.name.toLowerCase()));
      lists[0].items.push(...(toAdd.length > 0 ? toAdd : newItems));
      lists[0].updatedAt = now;
      setLocalStorage(STORAGE_KEYS.PACKING_LISTS, lists);
    }

    setAllSavedToChecklist(true);
    window.dispatchEvent(new Event('checklist-updated'));
  };

  const handleSwitchPlacement = (itemName: string, newPlacement: PlacementType) => {
    if (!result) return;
    setResult(prev => {
      if (!prev) return null;
      return {
        ...prev,
        results: prev.results.map(r => {
          if (r.item === itemName) {
            return {
              ...r,
              placement: newPlacement,
              placementWarning: undefined,
            };
          }
          return r;
        }),
      };
    });
  };

  const totalItemsCount = result?.results.length || 0;
  const warningItems = result?.results.filter(r => r.placementWarning) || [];
  const forbiddenItems = result?.results.filter(r => r.status === 'forbidden') || [];
  const conditionalItems = result?.results.filter(r => r.status === 'conditional') || [];
  const allowedItems = result?.results.filter(r => r.status === 'allowed') || [];

  return (
    <div className="pb-32 sm:pb-36 md:pb-20 bg-cyber-dotmatrix min-h-screen">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-3.5 sm:px-6 pt-26 sm:pt-28 md:pt-32 space-y-5 sm:space-y-6">
        {/* HUD Bento Row: Travel Mode & Route Terminal */}
        <section className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 relative z-20 space-y-4">
          {/* Top Row: Mode Switches & Baggage Allowance Status */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Mode Switches */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
              {/* Transport Switch */}
              <div className="grid grid-cols-2 sm:inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/60 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setTransport('plane')}
                  className={clsx(
                    'px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]',
                    transport === 'plane'
                      ? 'bg-white text-sky-700 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Plane size={15} strokeWidth={2} className="shrink-0" />
                  <span>Pesawat <span className="hidden sm:inline font-mono text-[10px] text-slate-400">(ICAO)</span></span>
                </button>
                <button
                  type="button"
                  onClick={() => setTransport('ship')}
                  className={clsx(
                    'px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]',
                    transport === 'ship'
                      ? 'bg-white text-slate-800 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Ship size={15} strokeWidth={2} className="shrink-0" />
                  <span>Kapal Laut <span className="hidden sm:inline font-mono text-[10px] text-slate-400">(IMO)</span></span>
                </button>
              </div>

              {/* Scope Switch: Domestic vs International */}
              <div className="grid grid-cols-2 sm:inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/60 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setTripType('domestic');
                    setOrigin('');
                    setOriginIsCustom(false);
                    setDestination('');
                    setDestIsCustom(false);
                  }}
                  className={clsx(
                    'px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]',
                    tripType === 'domestic'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>DOMESTIK ID</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('international');
                    setOrigin('');
                    setOriginIsCustom(false);
                    setDestination('');
                    setDestIsCustom(false);
                  }}
                  className={clsx(
                    'px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs flex items-center justify-center transition-all active:scale-[0.98]',
                    tripType === 'international'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <span>INTERNASIONAL</span>
                </button>
              </div>
            </div>

            {/* Allowance Metric Capsule */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-xs shrink-0 self-start lg:self-auto">
              <Luggage size={18} className="text-sky-600 shrink-0" strokeWidth={2} />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900 text-[11px] leading-tight font-sans">
                  {transport === 'plane' ? 'Standar Bagasi Udara' : 'Standar Bagasi Pelni'}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {transport === 'plane' ? 'Maks 20kg Bagasi • 7kg Kabin' : 'Maks 40kg Bagasi Tercatat'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Full-Width Tactile Route Selector */}
          <div className="w-full pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center w-full">
              <div className="md:col-span-5 w-full min-w-0">
                <CountrySelector
                  label={tripType === 'domestic' ? 'Titik Asal Perjalanan' : 'Negara Asal'}
                  placeholder={tripType === 'domestic' ? 'Pilih kota/pelabuhan asal...' : 'Pilih negara asal...'}
                  value={origin}
                  tripType={tripType}
                  transportMode={transport}
                  onChange={(name, custom) => {
                    setOrigin(name);
                    setOriginIsCustom(custom);
                  }}
                />
              </div>

              <div className="md:col-span-2 flex justify-center py-1 md:py-0">
                <button
                  type="button"
                  onClick={handleSwapRoute}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 border border-slate-200 text-slate-600 shadow-sm flex items-center justify-center transition-all active:scale-[0.98]"
                  title="Tukar Asal & Tujuan"
                >
                  <ArrowLeftRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="md:col-span-5 w-full min-w-0">
                <CountrySelector
                  label={tripType === 'domestic' ? 'Titik Tujuan Perjalanan' : 'Negara Tujuan'}
                  placeholder={tripType === 'domestic' ? 'Pilih kota/pelabuhan tujuan...' : 'Pilih negara tujuan...'}
                  value={destination}
                  tripType={tripType}
                  transportMode={transport}
                  onChange={(name, custom) => {
                    setDestination(name);
                    setDestIsCustom(custom);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Scanner & Cheki Mascot Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left 7 Cols: Scanner Feed & Cheki Mascot */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            {/* Mascot Banner */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative">
                <img
                  src="/images/cheki-mascot.png"
                  alt="Chekii Mascot"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Chekii Luggage Inspector</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-mono text-[10px] font-semibold">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Masukkan barang bawaanmu. Sistem akan memindai aturan ICAO Annex 18, batasan Bea Cukai, serta ketentuan karantina.
                </p>
              </div>
            </div>

            {/* Input Header & Mode Switch */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  Pemeriksaan Barang Bawaan
                </h2>
                <p className="text-xs text-slate-500 font-normal">
                  Ketik daftar barang yang ingin Anda bawa di perjalanan
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-semibold border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={clsx(
                    'px-3 py-1.5 rounded-xl transition-all active:scale-[0.98]',
                    inputMode === 'text'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Teks Cepat
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('structured')}
                  className={clsx(
                    'px-3 py-1.5 rounded-xl transition-all active:scale-[0.98]',
                    inputMode === 'structured'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Per Item (+Tas)
                </button>
              </div>
            </div>

            {/* Input Component */}
            {inputMode === 'text' ? (
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    value={rawText}
                    onChange={e => setRawText(e.target.value)}
                    rows={4}
                    placeholder="Contoh: Powerbank 20000mAh di bagasi, Parfum 150ml di kabin, Rendang, Gunting kuku, Laptop, Vape..."
                    className="w-full p-3.5 sm:p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 font-normal leading-relaxed resize-none shadow-sm placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400 px-1">
                  <span>💡 Tulis penempatan seperti &quot;di bagasi&quot; atau &quot;di kabin&quot; untuk menguji risiko.</span>
                  <button
                    type="button"
                    onClick={() => setRawText('')}
                    className="text-slate-400 hover:text-rose-500 font-semibold self-end sm:self-auto active:scale-[0.98]"
                  >
                    Bersihkan
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {structuredItems.length === 0 ? (
                  <div className="py-6 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-1.5">
                    <Luggage size={24} className="mx-auto text-slate-300" />
                    <p className="text-xs font-semibold text-slate-700">Daftar Barang Masih Kosong</p>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      Ketik barang secara manual dengan tombol di bawah, atau klik kartu pada <strong className="text-slate-600">Frequent Travel Pack</strong> di samping.
                    </p>
                  </div>
                ) : (
                  structuredItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-2xl"
                    >
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-400 pl-1">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item.name}
                          onChange={e => {
                            const val = e.target.value;
                            setStructuredItems(prev =>
                              prev.map(i => (i.id === item.id ? { ...i, name: val } : i))
                            );
                          }}
                          placeholder="Nama barang bawaan (contoh: Powerbank 20.000mAh)..."
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-sky-600 font-normal"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <CustomDropdown<PlacementType>
                          value={item.placement}
                          options={PLACEMENT_OPTIONS}
                          onChange={val => {
                            setStructuredItems(prev =>
                              prev.map(i => (i.id === item.id ? { ...i, placement: val } : i))
                            );
                          }}
                          size="sm"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setStructuredItems(prev => prev.filter(i => i.id !== item.id))
                          }
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-white transition-colors active:scale-[0.98]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                <button
                  type="button"
                  onClick={() =>
                    setStructuredItems(prev => [
                      ...prev,
                      { id: `item-${Date.now()}`, name: '', placement: 'either' },
                    ])
                  }
                  className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:text-sky-600 hover:border-sky-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98]"
                >
                  <Plus size={16} />
                  <span>Tambah Baris Barang</span>
                </button>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between gap-3 animate-in fade-in-50">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={18} className="text-rose-600 shrink-0" />
                  <span className="font-semibold">{error}</span>
                </div>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="px-3 py-1 bg-white border border-rose-300 hover:bg-rose-100 rounded-lg text-rose-800 font-semibold text-xs shrink-0 transition-colors active:scale-[0.98] flex items-center gap-1"
                >
                  <RotateCcw size={13} />
                  <span>Coba Lagi</span>
                </button>
              </div>
            )}

            {/* Scan Button (Solid sky-600 primary CTA) */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className={clsx(
                'w-full py-3.5 sm:py-4 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-150 shadow-sm active:scale-[0.98]',
                loading
                  ? 'bg-slate-800 text-white cursor-wait'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              )}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {loadingStep === 1
                      ? 'Memindai Regulasi ICAO & Maritim...'
                      : loadingStep === 2
                      ? 'Menganalisis Pembatasan Bea Cukai & Karantina...'
                      : 'Menyusun Sertifikat Kepatuhan Bagasi...'}
                  </span>
                </div>
              ) : (
                <>
                  <Radar size={20} className="animate-spin" strokeWidth={2} style={{ animationDuration: '4s' }} />
                  <span>Pindai Kepatuhan Barang dengan AI</span>
                  <ArrowRight size={18} strokeWidth={2} />
                </>
              )}
            </button>
          </div>

          {/* Right 5 Cols: Quick-Add Sensor Library */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-base">Frequent Travel Pack</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Klik untuk Tambah
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                Pilih barang populer untuk memvalidasi batasan Dangerous Goods ICAO &amp; Bea Cukai secara instan.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 pt-3">
                {FREQUENT_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddChip(chip.value)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-semibold border border-slate-200 hover:border-sky-200 transition-all active:scale-[0.98] flex items-center gap-1 shadow-sm"
                  >
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cheki Advisory Note Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <ShieldCheck size={18} strokeWidth={2} />
              </div>
              <div className="flex flex-col text-xs leading-relaxed">
                <span className="font-bold text-slate-900">Chekii Smart Sorter Active</span>
                <span className="text-slate-600 mt-0.5 font-normal">
                  Sistem otomatis memisahkan barang ke <strong className="text-sky-700 font-semibold">Tas Kabin</strong> vs <strong className="text-emerald-700 font-semibold">Bagasi Kargo</strong> untuk mencegah penyitaan di x-ray bandara.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State: Structured Skeleton Manifest */}
        {loading && (
          <section className="space-y-6 pt-2 animate-in fade-in-50 duration-200">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-2">
                  <div className="h-5 w-56 bg-slate-200 rounded-lg" />
                  <div className="h-3.5 w-72 bg-slate-100 rounded" />
                </div>
                <div className="h-9 w-44 bg-slate-100 rounded-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 bg-slate-50 border border-slate-100 rounded-2xl" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-56 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3 animate-pulse">
                    <div className="flex justify-between items-start">
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                      <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    </div>
                    <div className="h-14 bg-slate-50 rounded-xl" />
                    <div className="h-8 bg-slate-100 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty Initial State with CTA */}
        {!result && !loading && !error && (
          <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto shadow-sm">
              <Luggage size={28} strokeWidth={1.8} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-bold text-slate-800 text-base">Manifest Siap Diperiksa</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Pilih rute perjalanan dan masukkan daftar barang bawaan Anda di atas, lalu klik <strong>Pindai Kepatuhan Barang dengan AI</strong> untuk memulai inspeksi.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector('textarea');
                  el?.focus();
                }}
                className="px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-all active:scale-[0.98]"
              >
                Mulai Masukkan Barang
              </button>
            </div>
          </section>
        )}

        {/* Results Section: Luggage Manifest & Inspection Boarding Pass Cards */}
        {result && (
          <section className="space-y-6 pt-2 animate-in fade-in-50 duration-300">
            {/* Header & Metrics */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={22} className="text-sky-600 shrink-0" strokeWidth={2} />
                    <h2 className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                      Luggage Compliance Manifest
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-normal flex items-center gap-1.5">
                    <span>Rute: {origin} ➔ {destination}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      {transport === 'plane' ? <Plane size={13} className="shrink-0" /> : <Ship size={13} className="shrink-0" />}
                      <span>{transport === 'plane' ? 'Pesawat ICAO' : 'Kapal Laut IMO'}</span>
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAllToChecklist}
                    disabled={allSavedToChecklist}
                    className={clsx(
                      'px-4 py-2 rounded-full font-semibold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-[0.98]',
                      allSavedToChecklist
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                    )}
                  >
                    {allSavedToChecklist ? (
                      <CheckCheck size={16} strokeWidth={2} />
                    ) : (
                      <BookmarkPlus size={16} strokeWidth={2} />
                    )}
                    <span>
                      {allSavedToChecklist
                        ? 'Tersimpan di Packing Checklist!'
                        : `Simpan Semua ke Checklist (${totalItemsCount})`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Status Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3.5 bg-[#E6FCF5] border border-[#A7F3D0] rounded-2xl text-center">
                  <div className="text-2xl font-bold text-[#059669]">{allowedItems.length}</div>
                  <div className="text-xs font-semibold text-[#059669]">Aman (Boleh)</div>
                </div>
                <div className="p-3.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl text-center">
                  <div className="text-2xl font-bold text-[#D97706]">{conditionalItems.length}</div>
                  <div className="text-xs font-semibold text-[#D97706]">Boleh Bersyarat</div>
                </div>
                <div className="p-3.5 bg-[#FFE4E6] border border-[#FECDD3] rounded-2xl text-center">
                  <div className="text-2xl font-bold text-[#E11D48]">{forbiddenItems.length}</div>
                  <div className="text-xs font-semibold text-[#E11D48]">Dilarang Keras</div>
                </div>
                <div className="p-3.5 bg-rose-100/70 border border-rose-300 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-rose-700">{warningItems.length}</div>
                  <div className="text-xs font-semibold text-rose-800">Salah Penempatan</div>
                </div>
              </div>

              {/* High-Impact Alert Banner if any hazardous items */}
              {warningItems.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                    <AlertTriangle size={18} className="text-rose-600 shrink-0" strokeWidth={2} />
                    <span>PERHATIAN: Ditemukan {warningItems.length} Barang Berbahaya di Tas yang Salah</span>
                  </div>
                  <p className="text-xs text-rose-700 leading-relaxed font-normal">
                    Baterai litium, powerbank, dan vape dilarang ditaruh di bagasi check-in kargo pesawat. Periksa kartu di bawah dan gunakan tombol &quot;Tukar Tas&quot;.
                  </p>
                </div>
              )}

              {/* General Guidance */}
              {result.generalAdvice && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={15} className="text-sky-600 shrink-0" />
                    <span>Arahan Keselamatan Perjalanan:</span>
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {result.generalAdvice}
                  </p>
                </div>
              )}

              {/* Destination Specific Notes */}
              {result.countrySpecificNotes && (
                <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-2xl space-y-1">
                  <span className="text-xs font-semibold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe size={15} className="text-sky-700 shrink-0" />
                    <span>Ketentuan Otoritas: {destination}</span>
                  </span>
                  <p className="text-xs text-sky-900 leading-relaxed font-normal">
                    {result.countrySpecificNotes}
                  </p>
                </div>
              )}

              {/* Customs Notes */}
              {result.customsInfo && (
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-amber-700 shrink-0" />
                    <span>Informasi Bea Cukai &amp; Karantina:</span>
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed font-normal">
                    {result.customsInfo}
                  </p>
                </div>
              )}
            </div>

            {/* Individual Item Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                Daftar Hasil Inspeksi Per Barang ({result.results.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.results.map((itemResult, idx) => (
                  <LuggageCard
                    key={idx}
                    result={itemResult}
                    index={idx}
                    onAddToChecklist={handleAddToChecklist}
                    onSwitchPlacement={handleSwitchPlacement}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
