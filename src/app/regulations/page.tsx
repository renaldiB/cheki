'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COUNTRY_REGULATIONS } from '@/data/country-regulations';
import StatusBadge from '@/components/StatusBadge';
import { useDebounce } from '@/hooks/useDebounce';
import clsx from 'clsx';
import {
  Search,
  Plane,
  Ship,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
  Globe,
  Luggage,
  AlertTriangle,
} from 'lucide-react';

type TabTransport = 'all' | 'plane' | 'ship';
type TabSection = 'rules' | 'customs' | 'quarantine';
type TabRegion = 'all' | 'asia' | 'europe' | 'other';

export default function RegulationsPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 180);
  const [selectedCode, setSelectedCode] = useState('ID');
  const [transport, setTransport] = useState<TabTransport>('all');
  const [section, setSection] = useState<TabSection>('rules');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState<TabRegion>('all');

  const country = COUNTRY_REGULATIONS.find(c => c.countryCode === selectedCode);
  
  const rawPlaneRules = country?.planeRules ?? [];
  const rawShipRules = country?.shipRules ?? [];

  const rawRules =
    transport === 'plane'
      ? rawPlaneRules
      : transport === 'ship'
      ? rawShipRules
      : [...rawPlaneRules, ...rawShipRules];

  const categories = Array.from(new Set(rawRules.map(r => r.category)));

  const filteredRules = rawRules.filter(r => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      return (
        r.item.toLowerCase().includes(q) ||
        r.details.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const countAll = COUNTRY_REGULATIONS.length;
  const countAsia = COUNTRY_REGULATIONS.filter(c => c.region === 'asia').length;
  const countEurope = COUNTRY_REGULATIONS.filter(c => c.region === 'europe').length;

  const filteredCountries = COUNTRY_REGULATIONS.filter(c => {
    if (regionFilter !== 'all' && c.region !== regionFilter) return false;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      return (
        c.countryName.toLowerCase().includes(q) ||
        c.countryCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pb-32 sm:pb-36 md:pb-20 bg-cyber-dotmatrix min-h-screen">
      <div className="relative z-10 max-w-[1280px] mx-auto px-3.5 sm:px-6 pt-26 sm:pt-28 md:pt-32 space-y-5 sm:space-y-6">
        {/* Top HUD & Telemetry Banner */}
        <section className="relative w-full rounded-3xl bg-white shadow-sm border border-slate-200 p-5 sm:p-7 md:p-8">
          <div className="flex flex-col gap-5">
            {/* Live Ticker Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 font-mono text-[11px] font-semibold border border-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
                <span>ICAO ANNEX 18 &amp; IMO IMDG LIVE TELEMETRY</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-500 font-mono text-[11px]">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 38 Provinsi Sinkron
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span> 195 Border Feeds
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Biosecurity Active
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-3xl">
                <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider block">
                  Direktori Kepatuhan Internasional &amp; Domestik
                </span>
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 tracking-tight mt-1">
                  Direktori Regulasi Bandara, Pelabuhan &amp; Bea Cukai
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-normal">
                  Verifikasi aturan kepatuhan lintas batas untuk penerbangan (ICAO), pelayaran antar pulau Pelni (IMO), serta batas karantina pangan dan hewan sebelum keberangkatan.
                </p>
              </div>

              {/* Quick Compliance Capsule */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm shrink-0 self-start lg:self-auto">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck size={22} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Compliance Engine</span>
                  <span className="font-bold text-xs text-slate-900">Zero-Confiscation Protocol</span>
                </div>
              </div>
            </div>

            {/* Search & Quick Hub Pills */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari regulasi barang, kode hub (CGK, SIN, HND, IDTPE), atau negara..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-9 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-all"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Transit Mode Filters */}
                <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 w-full sm:w-auto shrink-0 justify-center">
                  <button
                    type="button"
                    onClick={() => setTransport('all')}
                    className={clsx(
                      'px-3 sm:px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-[0.98] text-center',
                      transport === 'all'
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransport('plane')}
                    className={clsx(
                      'px-3 sm:px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]',
                      transport === 'plane'
                        ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-200'
                        : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    <Plane size={14} strokeWidth={2} />
                    <span>Pesawat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransport('ship')}
                    className={clsx(
                      'px-3 sm:px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]',
                      transport === 'ship'
                        ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                        : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    <Ship size={14} strokeWidth={2} />
                    <span>Kapal Laut</span>
                  </button>
                </div>
              </div>

              {/* Quick Route Hubs */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold px-1 uppercase tracking-wider">HUB CEPAT:</span>
                {[
                  { label: '[CGK] Jakarta (ID)', code: 'ID', region: 'asia' },
                  { label: '[KUL] Kuala Lumpur (MY)', code: 'MY', region: 'asia' },
                  { label: '[SIN] Changi (SG)', code: 'SG', region: 'asia' },
                  { label: '[BKK] Bangkok (TH)', code: 'TH', region: 'asia' },
                  { label: '[HND] Tokyo (JP)', code: 'JP', region: 'asia' },
                  { label: '[ICN] Seoul (KR)', code: 'KR', region: 'asia' },
                  { label: '[JED] Jeddah (SA)', code: 'SA', region: 'asia' },
                  { label: '[DXB] Dubai (AE)', code: 'AE', region: 'asia' },
                  { label: '[AMS] Amsterdam (NL)', code: 'NL', region: 'europe' },
                  { label: '[CDG] Paris (FR)', code: 'FR', region: 'europe' },
                  { label: '[FRA] Frankfurt (DE)', code: 'DE', region: 'europe' },
                  { label: '[ZRH] Zurich (CH)', code: 'CH', region: 'europe' },
                  { label: '[LHR] London (GB)', code: 'GB', region: 'europe' },
                  { label: '[SYD] Sydney (AU)', code: 'AU', region: 'other' },
                ].map(hub => (
                  <button
                    key={hub.code}
                    type="button"
                    onClick={() => {
                      setSelectedCode(hub.code);
                      setCategoryFilter('all');
                      if (regionFilter !== 'all' && regionFilter !== hub.region) {
                        setRegionFilter('all');
                      }
                    }}
                    className={clsx(
                      'px-2.5 py-1 rounded-full border transition-all active:scale-[0.98] font-medium',
                      selectedCode === hub.code
                        ? 'bg-sky-600 text-white border-sky-600 font-semibold shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    )}
                  >
                    {hub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Split: Country List Sidebar & Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Daftar Jurisdiksi ({filteredCountries.length}/{COUNTRY_REGULATIONS.length})
              </span>
            </div>

            {/* Region Filter Buttons */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setRegionFilter('all')}
                className={clsx(
                  'py-1.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] text-center',
                  regionFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                Semua ({countAll})
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('asia')}
                className={clsx(
                  'py-1.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] text-center',
                  regionFilter === 'asia'
                    ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-200'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                Asia ({countAsia})
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('europe')}
                className={clsx(
                  'py-1.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] text-center',
                  regionFilter === 'europe'
                    ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-200'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                Eropa ({countEurope})
              </button>
            </div>

            <div className="space-y-1 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto pr-1">
              {filteredCountries.map(c => {
                const isSelected = selectedCode === c.countryCode;
                return (
                  <button
                    key={c.countryCode}
                    type="button"
                    onClick={() => {
                      setSelectedCode(c.countryCode);
                      setCategoryFilter('all');
                    }}
                    className={clsx(
                      'w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all active:scale-[0.98]',
                      isSelected
                        ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-200 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{c.flag}</span>
                      <div className="truncate">
                        <span className="block truncate font-bold text-sm text-slate-900">
                          {c.countryName}
                        </span>
                        <span className="block text-[11px] font-mono text-slate-400">
                          Update: {c.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold bg-white px-2 py-0.5 rounded-lg border border-slate-200 text-slate-600">
                      {c.countryCode}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Country CTA */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Globe size={15} className="text-sky-600 shrink-0" />
                <span>Negara Lain di Seluruh Dunia?</span>
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px] font-normal">
                Negara tujuanmu belum ada di katalog? Gunakan scanner AI untuk memeriksa aturan negara mana pun di dunia secara dinamis.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-800 text-[11px] pt-1 active:scale-[0.98] transition-all"
              >
                <span>Buka AI Luggage Scanner</span>
                <ArrowRight size={13} strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* Right Details Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {country ? (
              <>
                {/* Header Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl leading-none drop-shadow-sm">{country.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                            {country.countryName}
                          </h2>
                          <span className="px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 font-mono text-xs font-semibold rounded-lg">
                            {country.countryCode}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-slate-400 mt-0.5">
                          Sinkronisasi Regulasi: {country.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* General Notes */}
                  {country.generalNotes.length > 0 && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <span className="font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <Info size={14} className="text-sky-600 shrink-0" />
                        <span>Poin Kepatuhan Penumpang:</span>
                      </span>
                      <ul className="space-y-1 pl-4 list-disc text-slate-600 font-normal">
                        {country.generalNotes.map((note, i) => (
                          <li key={i} className="leading-relaxed">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Section Switcher Tabs */}
                  <div className="flex border-b border-slate-100 gap-4 pt-1 text-xs font-semibold overflow-x-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setSection('rules')}
                      className={clsx(
                        'pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]',
                        section === 'rules'
                          ? 'border-sky-600 text-sky-700 font-bold'
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      )}
                    >
                      <CheckCircle2 size={15} strokeWidth={2} />
                      <span>Aturan Barang ({rawRules.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection('customs')}
                      className={clsx(
                        'pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]',
                        section === 'customs'
                          ? 'border-sky-600 text-sky-700 font-bold'
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      )}
                    >
                      <Luggage size={15} strokeWidth={2} />
                      <span>Bea Cukai ({country.customsLimits.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection('quarantine')}
                      className={clsx(
                        'pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]',
                        section === 'quarantine'
                          ? 'border-sky-600 text-sky-700 font-bold'
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      )}
                    >
                      <ShieldCheck size={15} strokeWidth={2} />
                      <span>Karantina &amp; Pangan ({country.quarantineInfo.length})</span>
                    </button>
                  </div>
                </div>

                {/* Section 1: Item Rules */}
                {section === 'rules' && (
                  <div className="space-y-3">
                    {/* Category Filter Pills */}
                    {categories.length > 0 && (
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setCategoryFilter('all')}
                          className={clsx(
                            'px-3 py-1 rounded-full whitespace-nowrap transition-colors font-semibold active:scale-[0.98]',
                            categoryFilter === 'all'
                              ? 'bg-slate-900 text-white shadow-sm'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          )}
                        >
                          Semua ({rawRules.length})
                        </button>
                        {categories.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategoryFilter(cat)}
                            className={clsx(
                              'px-3 py-1 rounded-full whitespace-nowrap transition-colors font-semibold active:scale-[0.98]',
                              categoryFilter === cat
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}

                    {filteredRules.length === 0 ? (
                      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                        <Search size={28} className="mx-auto text-slate-300 stroke-1" />
                        <p className="font-semibold text-slate-700 text-sm">Tidak ada aturan yang cocok</p>
                        <p className="text-xs text-slate-400">Coba ubah kata kunci atau bersihkan filter pencarian.</p>
                        {search && (
                          <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="mt-2 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors"
                          >
                            Reset Pencarian
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredRules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                  {rule.category}
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">
                                  {rule.item}
                                </h3>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                {rule.details}
                              </p>
                              {rule.conditions && (
                                <p className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg mt-2 inline-block border border-sky-200">
                                  Syarat Wajib: {rule.conditions}
                                </p>
                              )}
                            </div>
                            <StatusBadge status={rule.status} size="sm" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Section 2: Customs Limits */}
                {section === 'customs' && (
                  <div className="space-y-3">
                    {country.customsLimits.length === 0 ? (
                      <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
                        Data pembebasan pabean belum tercatat.
                      </div>
                    ) : (
                      country.customsLimits.map((limit, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              {limit.category}
                            </span>
                            <span className="text-base font-bold text-emerald-700">
                              {limit.limit}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {limit.details}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Section 3: Quarantine */}
                {section === 'quarantine' && (
                  <div className="space-y-3">
                    {country.quarantineInfo.length === 0 ? (
                      <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
                        Data aturan karantina hayati belum tercatat.
                      </div>
                    ) : (
                      country.quarantineInfo.map((info, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 bg-white rounded-2xl border border-amber-200 shadow-sm flex items-start gap-3 bg-amber-50/20"
                        >
                          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-sm">
                            <AlertTriangle size={16} className="text-amber-700" />
                          </div>
                          <p className="text-xs text-slate-700 font-normal leading-relaxed mt-1">
                            {info}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
