'use client';

import { useState, useMemo } from 'react';
import { CUSTOMS_INFO } from '@/data/customs-info';
import { useDebounce } from '@/hooks/useDebounce';
import clsx from 'clsx';
import {
  Calculator,
  Check,
  AlertCircle,
  Luggage,
  Smartphone,
  Wine,
  Banknote,
  FileText,
  LucideIcon,
} from 'lucide-react';

const SECTION_ICONS: Record<string, LucideIcon> = {
  luggage: Luggage,
  smartphone: Smartphone,
  wine: Wine,
  banknote: Banknote,
  'file-text': FileText,
};

export default function CustomsPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | string>('calculator');
  const [goodsValue, setGoodsValue] = useState<number>(0);
  const [tariffRate, setTariffRate] = useState<number>(10);
  const [hasNpwp, setHasNpwp] = useState<boolean>(true);

  // Debounce rapid slider/number input to keep interactions ultra-smooth
  const debouncedGoodsValue = useDebounce(goodsValue, 80);

  // Live calculation based on PMK 203/2017
  const calculation = useMemo(() => {
    const val = Number(debouncedGoodsValue) || 0;
    const rate = Number(tariffRate) || 0;
    const exemption = 500; // USD 500 FOB exemption

    if (val <= exemption) {
      return {
        isFree: true,
        taxableUSD: 0,
        beaMasukUSD: 0,
        ppnUSD: 0,
        pphUSD: 0,
        totalUSD: 0,
        totalIDR: 0,
      };
    }

    const taxableUSD = val - exemption;
    const beaMasukUSD = taxableUSD * (rate / 100);
    const nilaiImporUSD = taxableUSD + beaMasukUSD;
    const ppnUSD = nilaiImporUSD * 0.11; // 11% PPN
    const pphRate = hasNpwp ? 0.1 : 0.2; // 10% with NPWP, 20% without
    const pphUSD = nilaiImporUSD * pphRate;
    const totalUSD = beaMasukUSD + ppnUSD + pphUSD;
    const totalIDR = totalUSD * 16250; // Current reference exchange rate

    return {
      isFree: false,
      taxableUSD,
      beaMasukUSD,
      ppnUSD,
      pphUSD,
      totalUSD,
      totalIDR,
    };
  }, [debouncedGoodsValue, tariffRate, hasNpwp]);

  const activeSectionData = CUSTOMS_INFO.sections.find(s => s.id === activeTab);

  return (
    <div className="pb-32 sm:pb-36 md:pb-20 bg-cyber-dotmatrix min-h-screen">
      <div className="relative z-10 max-w-[1280px] mx-auto px-3.5 sm:px-6 pt-26 sm:pt-28 md:pt-32 space-y-5 sm:space-y-6">
        {/* Top Header Card */}
        <section className="w-full rounded-3xl bg-white shadow-sm border border-slate-200 p-5 sm:p-7 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-mono text-[11px] font-semibold border border-sky-200">
                  PMK 203/PMK.04/2017 &amp; PERDIRJEN 2025
                </span>
                <span className="font-mono text-xs text-slate-400 font-medium">KURS: Rp 16.250 / USD</span>
              </div>
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 tracking-tight mt-1">
                Simulasi Pajak Bea Cukai &amp; Pabean Indonesia
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl font-normal">
                Hitung perkiraan bea masuk belanjaan luar negeri, pahami registrasi IMEI HP/gadget baru, serta kuota bebas cukai rokok dan alkohol di bandara internasional.
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm shrink-0 self-start lg:self-auto">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                $500
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">Pembebasan Resmi (FOB)</span>
                <span className="font-bold text-xs text-slate-900">Bebas Bea Hingga $500/Orang</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex gap-2 pt-5 overflow-x-auto no-scrollbar border-t border-slate-100 mt-5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all shadow-sm active:scale-[0.98] shrink-0',
                activeTab === 'calculator'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              <Calculator size={15} strokeWidth={2} />
              <span>Kalkulator Bea Masuk Live</span>
            </button>

            {CUSTOMS_INFO.sections.map(sec => {
              const isSelected = activeTab === sec.id;
              const SectionIcon = SECTION_ICONS[sec.icon] || FileText;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all active:scale-[0.98] shrink-0',
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  )}
                >
                  <SectionIcon size={15} strokeWidth={2} className="shrink-0" />
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 1: Live Duty Calculator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                    <Calculator size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">
                      Data Belanjaan Luar Negeri
                    </h2>
                    <p className="text-[11px] text-slate-400 font-normal">
                      Batas pembebasan resmi penumpang: USD 500 per orang
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Value Input & Slider */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Total Nilai Barang (USD)</span>
                  <span className="text-sky-600 font-bold text-base">${goodsValue} USD</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={goodsValue === 0 ? '' : goodsValue}
                    placeholder="Contoh: 750"
                    onChange={e => setGoodsValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                  />
                </div>

                {/* Range slider */}
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="25"
                  value={goodsValue}
                  onChange={e => setGoodsValue(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
                  {[350, 500, 750, 1000, 1500, 2000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setGoodsValue(val)}
                      className={clsx(
                        'px-3 py-1 rounded-xl font-semibold transition-all active:scale-[0.98]',
                        goodsValue === val
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Rate Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Kategori Barang &amp; Tarif Bea Masuk
                </label>
                <select
                  value={tariffRate}
                  onChange={e => setTariffRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-600"
                >
                  <option value={0}>0% — Buku, Alat Medis Tertentu</option>
                  <option value={5}>5% — Komputer, Laptop, Kamera Digital</option>
                  <option value={10}>10% — Smartphone Baru (IMEI), Elektronik Konsumen</option>
                  <option value={15}>15% — Pakaian Jadi, Tekstil, Mainan</option>
                  <option value={20}>20% — Tas Branded, Sepatu Mewah</option>
                  <option value={30}>30% — Jam Tangan Mewah, Barang Tertentu</option>
                </select>
              </div>

              {/* NPWP Status Toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Status NPWP / NIK Terdaftar</div>
                  <div className="text-[11px] text-slate-400 font-normal">PPh: 10% (Ada NPWP) vs 20% (Tanpa NPWP)</div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasNpwp(!hasNpwp)}
                  className={clsx(
                    'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98]',
                    hasNpwp
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  )}
                >
                  {hasNpwp ? '✓ Ada NPWP (10%)' : '✕ Tanpa NPWP (20%)'}
                </button>
              </div>
            </div>

            {/* Results Display Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Hasil Simulasi Estimasi Pajak
                </span>
                <span className="font-mono text-[11px] text-sky-700 font-semibold">
                  KURS: 1 USD = Rp 16.250
                </span>
              </div>

              {goodsValue === 0 ? (
                <div className="py-10 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center space-y-2">
                  <Calculator size={36} className="mx-auto text-slate-300 stroke-1" />
                  <h3 className="font-semibold text-slate-700 text-sm">Belum Ada Nilai Barang</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Ketik perkiraan nilai belanjaan Anda atau klik tombol preset di atas untuk menghitung perkiraan bea masuk &amp; pajak.
                  </p>
                </div>
              ) : calculation.isFree ? (
                <div className="p-6 rounded-2xl bg-[#E6FCF5] border border-[#A7F3D0] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto text-2xl shadow-sm">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#059669]">
                    BEBAS BEA MASUK &amp; PAJAK!
                  </h3>
                  <p className="text-xs text-[#059669] leading-relaxed max-w-sm mx-auto font-normal">
                    Total belanjaan Anda (${goodsValue} USD) berada di bawah batas pembebasan resmi <strong>USD 500</strong>. Anda tidak dikenakan pungutan bea masuk maupun pajak impor di bandara.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary Box */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Total Estimasi Tagihan Pajak
                    </span>
                    <div className="text-2xl sm:text-4xl font-bold text-emerald-400">
                      ≈ Rp {Math.round(calculation.totalIDR).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-slate-300 font-mono">
                      (atau sekitar ${calculation.totalUSD.toFixed(2)} USD)
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600 font-normal">
                      <span>Nilai Total Belanjaan:</span>
                      <span className="font-semibold text-slate-900">${goodsValue} USD</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-[#059669] font-normal">
                      <span>Pembebasan Resmi FOB:</span>
                      <span className="font-semibold">- $500 USD (Bebas)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-800 font-semibold">
                      <span>Nilai Pabean Kena Pajak (DPP):</span>
                      <span>${calculation.taxableUSD.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600 font-normal">
                      <span>Bea Masuk ({tariffRate}%):</span>
                      <span className="font-semibold">${calculation.beaMasukUSD.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600 font-normal">
                      <span>PPN (11%):</span>
                      <span className="font-semibold">${calculation.ppnUSD.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600 font-normal">
                      <span>PPh ({hasNpwp ? '10%' : '20%'}):</span>
                      <span className="font-semibold">${calculation.pphUSD.toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-normal">
                <AlertCircle size={13} className="inline mr-1 text-slate-400 shrink-0" />
                <strong>Catatan Resmi:</strong> Nilai ini merupakan simulasi berdasarkan PMK 203/2017. Kurs valas resmi ditetapkan berkala setiap minggu oleh Kementerian Keuangan Republik Indonesia.
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Info Cards */}
        {activeTab !== 'calculator' && activeSectionData && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              {(() => {
                const ActiveIcon = SECTION_ICONS[activeSectionData.icon] || FileText;
                return (
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                    <ActiveIcon size={22} strokeWidth={2} />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {activeSectionData.title}
                </h2>
                <p className="text-xs text-slate-500 font-normal">
                  Peraturan Resmi Direktorat Jenderal Bea dan Cukai Indonesia
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSectionData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-colors"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    {item.label}
                  </span>
                  <div className="text-base sm:text-lg font-bold text-sky-700">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
