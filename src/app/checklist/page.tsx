'use client';

import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { PackingList, ChecklistItem, PlacementType } from '@/types/luggage';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import ConfirmModal from '@/components/ConfirmModal';
import {
  Backpack,
  Luggage,
  Ship,
  AlertTriangle,
  ArrowLeftRight,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const CABIN_ONLY_KEYWORDS = ['powerbank', 'power bank', 'baterai', 'vape', 'e-cigarette', 'laptop', 'tablet'];
const CHECKIN_FORBIDDEN = ['pisau', 'gunting besar', 'cutter', 'pedang', 'belati'];

function inspectItemWarning(itemName: string, placement: PlacementType): string | undefined {
  const name = itemName.toLowerCase();
  if (placement === 'checkin' && CABIN_ONLY_KEYWORDS.some(kw => name.includes(kw))) {
    return '⚠️ BATERAI/POWERBANK WAJIB DI KABIN! Dilarang di bagasi check-in kargo pesawat.';
  }
  if (placement === 'cabin' && CHECKIN_FORBIDDEN.some(kw => name.includes(kw))) {
    return '🚫 BENDA TAJAM DILARANG DI KABIN! Wajib ditaruh di bagasi check-in.';
  }
  return undefined;
}

const BAG_TABS = [
  { key: 'cabin' as PlacementType, label: 'Tas Kabin (Carry-On)', shortLabel: 'Kabin', Icon: Backpack },
  { key: 'checkin' as PlacementType, label: 'Bagasi Check-In (Kargo)', shortLabel: 'Bagasi', Icon: Luggage },
  { key: 'either' as PlacementType, label: 'Kapal / Bebas', shortLabel: 'Kapal', Icon: Ship },
];

const PACKING_PRESETS = [
  { name: 'Paspor & Tiket Boarding', placement: 'cabin' as PlacementType },
  { name: 'Powerbank 10.000 mAh', placement: 'cabin' as PlacementType },
  { name: 'Charger & Kabel Data', placement: 'cabin' as PlacementType },
  { name: 'Obat Pribadi & Vitamin', placement: 'cabin' as PlacementType },
  { name: 'Pakaian Ganti (3 set)', placement: 'checkin' as PlacementType },
  { name: 'Peralatan Mandi', placement: 'checkin' as PlacementType },
  { name: 'Sepatu Tambahan', placement: 'checkin' as PlacementType },
];

export default function ChecklistPage() {
  const [lists, setLists] = useState<PackingList[]>([]);
  const [activeTab, setActiveTab] = useState<PlacementType>('cabin');
  const [newItemName, setNewItemName] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'unpacked' | 'packed'>('all');
  const [loaded, setLoaded] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    const stored = getLocalStorage<PackingList[]>(STORAGE_KEYS.PACKING_LISTS, []);
    // Check if stored data is the previous dummy test template
    const isOldDummy =
      stored.length === 1 &&
      stored[0].items.length === 4 &&
      stored[0].items.some(it => it.name === 'Paspor & Boarding Pass');

    if (stored.length === 0 || isOldDummy) {
      const emptyList: PackingList = {
        id: `list-${Date.now()}`,
        name: 'Daftar Packing Perjalanan Saya',
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLists([emptyList]);
      setLocalStorage(STORAGE_KEYS.PACKING_LISTS, [emptyList]);
    } else {
      setLists(stored);
    }
    setLoaded(true);
  }, []);

  const saveLists = (updated: PackingList[]) => {
    setLists(updated);
    setLocalStorage(STORAGE_KEYS.PACKING_LISTS, updated);
    window.dispatchEvent(new Event('checklist-updated'));
  };

  const currentList = lists[0];

  const totalItems = currentList?.items?.length || 0;
  const packedItems = currentList?.items?.filter(it => it.checked).length || 0;
  const progressPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  const currentTabItems = useMemo(() => {
    if (!currentList) return [];
    return currentList.items.filter(it => {
      const matchesTab = it.placement === activeTab;
      if (!matchesTab) return false;
      if (filterMode === 'unpacked') return !it.checked;
      if (filterMode === 'packed') return it.checked;
      return true;
    });
  }, [currentList, activeTab, filterMode]);

  const placementErrors = useMemo(() => {
    if (!currentList) return [];
    return currentList.items.filter(it => inspectItemWarning(it.name, it.placement));
  }, [currentList]);

  const addItem = (nameToAdd?: string, placementToAdd?: PlacementType) => {
    const name = (nameToAdd || newItemName).trim();
    if (!name || !currentList) return;

    const placement = placementToAdd || activeTab;
    const warning = inspectItemWarning(name, placement);

    const newItem: ChecklistItem = {
      id: `cl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      placement,
      checked: false,
      hasWarning: !!warning,
      warningMessage: warning,
    };

    const updated = [
      {
        ...currentList,
        items: [newItem, ...currentList.items],
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
    if (!nameToAdd) setNewItemName('');
  };

  const toggleItem = (id: string) => {
    if (!currentList) return;
    const updated = [
      {
        ...currentList,
        items: currentList.items.map(it => (it.id === id ? { ...it, checked: !it.checked } : it)),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
  };

  const removeItem = (id: string) => {
    if (!currentList) return;
    const updated = [
      {
        ...currentList,
        items: currentList.items.filter(it => it.id !== id),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
  };

  const switchPlacement = (id: string, targetPlacement: PlacementType) => {
    if (!currentList) return;
    const updated = [
      {
        ...currentList,
        items: currentList.items.map(it => {
          if (it.id === id) {
            const warning = inspectItemWarning(it.name, targetPlacement);
            return {
              ...it,
              placement: targetPlacement,
              hasWarning: !!warning,
              warningMessage: warning,
            };
          }
          return it;
        }),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
  };

  const resetAllChecks = () => {
    if (!currentList) return;
    const updated = [
      {
        ...currentList,
        items: currentList.items.map(it => ({ ...it, checked: false })),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
  };

  const handleConfirmClear = () => {
    if (!currentList) return;
    const updated = [
      {
        ...currentList,
        items: [],
        updatedAt: new Date().toISOString(),
      },
    ];
    saveLists(updated);
  };

  if (!loaded || !currentList) return null;

  return (
    <div className="pb-32 sm:pb-36 md:pb-20 bg-cyber-dotmatrix min-h-screen">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/15 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-3.5 sm:px-6 pt-26 sm:pt-28 md:pt-32 space-y-5 sm:space-y-6">
        {/* Top Header & Holographic Progress Card */}
        <section className="w-full rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_8px_32px_-4px_rgba(0,180,240,0.08)] border border-cyan-100/90 p-5 sm:p-7 md:p-8 ponytail-spring">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            {/* Left Content with Cheki Mascot */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 shrink-0">
                <img
                  src="/images/cheki-mascot.png"
                  alt="Cheki Mascot"
                  className="w-full h-full object-contain drop-shadow-[0_6px_16px_rgba(0,180,240,0.25)]"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-primary-container uppercase tracking-wider block">
                  Smart Packing Assistant
                </span>
                <h1 className="font-black text-xl sm:text-2xl md:text-3xl text-slate-900 tracking-tight mt-0.5">
                  Packing Checklist Cerdas
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
                  Kelola dan tandai barang di tas kabin dan koper kargo Anda. Sistem otomatis mendeteksi jika ada barang terlarang yang salah ditaruh di bagasi.
                </p>
              </div>
            </div>

            {/* Right Holographic Progress Gauge */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 shadow-sm shrink-0">
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary-container transition-all duration-500"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-xs text-slate-900">
                  {progressPercent}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-sm text-slate-900">
                  {packedItems} dari {totalItems} Siap
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {progressPercent === 100 ? '🎉 Siap Berangkat!' : 'Belum Selesai'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent Misplaced Dangerous Goods Alert */}
        {placementErrors.length > 0 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-300 shadow-sm space-y-3 ponytail-spring">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
              <AlertTriangle size={18} className="text-rose-600 animate-bounce shrink-0" />
              <span>DITEMUKAN {placementErrors.length} BARANG BERBAHAYA SALAH PENEMPATAN!</span>
            </div>
            <div className="space-y-2">
              {placementErrors.map(errItem => {
                const targetPlacement: PlacementType = errItem.placement === 'checkin' ? 'cabin' : 'checkin';
                return (
                  <div
                    key={errItem.id}
                    className="p-3 bg-white rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-black text-slate-900">{errItem.name}</span>
                      <p className="text-rose-700 mt-0.5 font-medium">{inspectItemWarning(errItem.name, errItem.placement)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => switchPlacement(errItem.id, targetPlacement)}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-sm tap-spring"
                    >
                      <ArrowLeftRight size={14} />
                      <span>Pindahkan ke {targetPlacement === 'cabin' ? 'Kabin' : 'Bagasi'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab & Add Items Card */}
        <section className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_-4px_rgba(0,180,240,0.08)] border border-cyan-100/90 space-y-5 ponytail-spring">
          {/* Bag Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 border border-slate-200/60">
            {BAG_TABS.map(tab => {
              const isSelected = activeTab === tab.key;
              const count = currentList.items.filter(it => it.placement === tab.key).length;
              const Icon = tab.Icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={clsx(
                    'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all tap-spring',
                    isSelected
                      ? 'bg-white text-primary-container shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Icon size={16} strokeWidth={2.3} className="shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span
                    className={clsx(
                      'text-[10px] font-bold px-1.5 sm:px-2 py-0.2 rounded-full',
                      isSelected ? 'bg-primary-container text-white' : 'bg-slate-200 text-slate-600'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Saran Cepat Packing:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PACKING_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addItem(preset.name, preset.placement)}
                  className="px-3 py-1 bg-slate-50 hover:bg-cyan-50 hover:text-primary-container text-slate-600 text-xs font-semibold rounded-xl border border-slate-200 transition-colors tap-spring"
                >
                  + {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Add Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder={`Tambah barang baru ke ${
                activeTab === 'cabin' ? 'Tas Kabin' : activeTab === 'checkin' ? 'Bagasi Kargo' : 'Kapal'
              }...`}
              className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:border-primary-container font-medium"
            />
            <button
              type="button"
              onClick={() => addItem()}
              className="px-4 sm:px-5 py-2.5 sm:py-3 bg-primary-container hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-1.5 transition-colors shadow-sm shrink-0 tap-spring"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Tambah</span>
            </button>
          </div>

          {/* Filter options */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <span className="text-slate-500 font-semibold">
              Menampilkan {currentTabItems.length} barang
            </span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={clsx(
                  'px-3 py-1 rounded-lg transition-all font-bold tap-spring',
                  filterMode === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                )}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('unpacked')}
                className={clsx(
                  'px-3 py-1 rounded-lg transition-all font-bold tap-spring',
                  filterMode === 'unpacked' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                )}
              >
                Belum
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('packed')}
                className={clsx(
                  'px-3 py-1 rounded-lg transition-all font-bold tap-spring',
                  filterMode === 'packed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                )}
              >
                Selesai
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {currentTabItems.length === 0 ? (
              <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-2">
                <Luggage size={36} className="mx-auto text-slate-300 stroke-1" />
                <p className="font-bold text-slate-700 text-sm">Belum ada barang di {activeTab === 'cabin' ? 'Tas Kabin' : activeTab === 'checkin' ? 'Bagasi Kargo' : 'Tas Kapal'}.</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Gunakan kolom input di atas, klik saran cepat packing, atau simpan hasil analisa dari AI Luggage Scanner.
                </p>
              </div>
            ) : (
              currentTabItems.map(item => {
                const warningMsg = inspectItemWarning(item.name, item.placement);
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      'p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ponytail-spring',
                      warningMsg
                        ? 'bg-rose-50/70 border-rose-300'
                        : item.checked
                        ? 'bg-slate-50/70 border-slate-200 opacity-60'
                        : 'bg-white/90 border-cyan-100/90 shadow-sm hover:border-cyan-300'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={clsx(
                          'shrink-0 transition-transform tap-spring',
                          item.checked ? 'text-primary-container' : 'text-slate-300 hover:text-slate-500'
                        )}
                      >
                        {item.checked ? (
                          <CheckCircle2 size={22} className="text-primary-container" strokeWidth={2.4} />
                        ) : (
                          <Circle size={22} strokeWidth={1.8} />
                        )}
                      </button>

                      <div className="min-w-0">
                        <span
                          className={clsx(
                            'text-sm font-bold block truncate',
                            item.checked ? 'line-through text-slate-400' : 'text-slate-900'
                          )}
                        >
                          {item.name}
                        </span>
                        {warningMsg && (
                          <span className="text-[11px] font-bold text-rose-600 block mt-0.5">
                            {warningMsg}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          switchPlacement(
                            item.id,
                            item.placement === 'cabin' ? 'checkin' : 'cabin'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:text-primary-container hover:bg-slate-100 rounded-lg transition-colors hidden sm:inline tap-spring"
                        title="Pindahkan tas"
                      >
                        Pindah ke {item.placement === 'cabin' ? 'Bagasi' : 'Kabin'}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors tap-spring"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Footer */}
          {totalItems > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={resetAllChecks}
                className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5 tap-spring"
              >
                <RotateCcw size={14} />
                <span>Reset Centang</span>
              </button>

              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="px-3 py-1.5 font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 tap-spring"
              >
                <Trash2 size={14} />
                <span>Kosongkan Checklist</span>
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Themed In-App Confirm Modal */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleConfirmClear}
        title="Kosongkan Daftar Checklist?"
        description="Semua barang bawaan yang tersimpan dalam daftar checklist perjalanan Anda akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus Semua"
        cancelText="Batal"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
