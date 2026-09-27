'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Search, Sparkles, X, Check, MapPin } from 'lucide-react';
import { POPULAR_COUNTRIES } from '@/data/countries';
import { DOMESTIC_LOCATIONS } from '@/data/domestic-locations';
import { useDebounce } from '@/hooks/useDebounce';
import clsx from 'clsx';

interface CountrySelectorProps {
  value: string;
  onChange: (locationName: string, isCustom: boolean) => void;
  placeholder?: string;
  label?: string;
  icon?: string;
  tripType?: 'international' | 'domestic';
  transportMode?: 'plane' | 'ship';
}

export default function CountrySelector({
  value,
  onChange,
  placeholder,
  label,
  icon,
  tripType = 'international',
  transportMode = 'plane',
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 120);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isDomestic = tripType === 'domestic';

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    } else {
      setSearch('');
    }
  }, [open]);

  // Filter international countries using debounced query
  const filteredCountries = POPULAR_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Filter domestic locations (prioritizing transport mode if ship/plane)
  const filteredDomestic = DOMESTIC_LOCATIONS.filter(loc => {
    const q = debouncedSearch.toLowerCase();
    const matchesQuery =
      loc.name.toLowerCase().includes(q) ||
      loc.code.toLowerCase().includes(q) ||
      loc.island.toLowerCase().includes(q);
    if (!matchesQuery) return false;

    if (transportMode === 'ship' && !debouncedSearch) {
      return loc.type === 'port' || loc.type === 'both';
    }
    return true;
  });

  const selectedCountry = !isDomestic
    ? POPULAR_COUNTRIES.find(c => c.name.toLowerCase() === value.toLowerCase())
    : null;

  const selectedDomestic = isDomestic
    ? DOMESTIC_LOCATIONS.find(
        loc =>
          loc.name.toLowerCase() === value.toLowerCase() ||
          loc.code.toLowerCase() === value.toLowerCase()
      )
    : null;

  function selectPreset(name: string) {
    setIsCustomMode(false);
    setSearch('');
    setOpen(false);
    onChange(name, false);
  }

  function enterCustomMode() {
    setIsCustomMode(true);
    setOpen(false);
    setSearch('');
    setCustomInput(value && !selectedCountry && !selectedDomestic ? value : '');
    onChange(customInput.trim(), true);
    setTimeout(() => inputRef.current?.focus(), 60);
  }

  function confirmCustom() {
    if (customInput.trim()) {
      onChange(customInput.trim(), true);
    }
  }

  function handleCustomKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmCustom();
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isDomestic) {
        if (filteredCountries.length > 0) {
          selectPreset(filteredCountries[0].name);
        } else if (search.trim()) {
          onChange(search.trim(), true);
          setOpen(false);
          setSearch('');
        }
      } else {
        if (filteredDomestic.length > 0) {
          selectPreset(filteredDomestic[0].name);
        } else if (search.trim()) {
          onChange(search.trim(), true);
          setOpen(false);
          setSearch('');
        }
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const isCustomConfirmed = isCustomMode || (!selectedCountry && !selectedDomestic && value.trim().length > 0);

  const defaultPlaceholder = isDomestic
    ? transportMode === 'ship'
      ? 'Pilih kota atau pelabuhan...'
      : 'Pilih kota atau bandara...'
    : 'Pilih negara tujuan...';

  return (
    <div className={clsx('relative w-full min-w-0', open && 'z-50')} ref={ref}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 truncate">
            {icon && <span>{icon}</span>}
            <span className="truncate">{label}</span>
          </label>
          {isCustomConfirmed && (
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1 border border-blue-200 shrink-0">
              <Sparkles size={10} /> AI Dynamic Check
            </span>
          )}
        </div>
      )}

      {/* Custom Mode Active Input */}
      {isCustomMode ? (
        <div className="space-y-1.5">
          <div className="relative flex items-center rounded-xl border-2 border-primary-container bg-cyan-50/50 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary-container/20">
            <div className="pl-3 text-primary-container shrink-0">
              {isDomestic ? <MapPin size={18} /> : <Globe size={18} />}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={e => {
                setCustomInput(e.target.value);
                onChange(e.target.value, true);
              }}
              onKeyDown={handleCustomKeyDown}
              placeholder={
                isDomestic
                  ? 'Ketik kota, pulau, atau pelabuhan di ID (e.g. Sabang, Morotai)...'
                  : 'Ketik nama negara (e.g. Islandia, Brazil, Turki)...'
              }
              className="w-full px-2.5 py-2.5 text-xs sm:text-sm bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium min-w-0"
            />
            {customInput && (
              <button
                type="button"
                onClick={() => {
                  setCustomInput('');
                  onChange('', true);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg shrink-0"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(false);
                setSearch('');
              }}
              className="px-2.5 py-1 mr-1.5 text-xs font-semibold bg-white text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 shrink-0"
            >
              Daftar
            </button>
          </div>
          <p className="text-[11px] text-primary-container font-medium pl-1 flex items-center gap-1">
            <Sparkles size={12} className="shrink-0" />
            <span>AI akan menganalisa aturan khusus lokasi ini secara dinamis.</span>
          </p>
        </div>
      ) : (
        /* Regular Selector Button */
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={clsx(
            'w-full flex items-center justify-between px-3 sm:px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-left transition-all duration-150 shadow-sm min-w-0',
            'bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container',
            open ? 'border-primary-container ring-2 ring-primary-container/20' : 'border-slate-200',
            !value && 'text-slate-400'
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
            {isDomestic ? (
              selectedDomestic ? (
                <>
                  <span className="text-base shrink-0">
                    {selectedDomestic.type === 'port' ? '🚢' : '✈️'}
                  </span>
                  <span className="font-semibold text-slate-900 truncate">
                    {selectedDomestic.name}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold shrink-0">
                    {selectedDomestic.code}
                  </span>
                </>
              ) : value ? (
                <>
                  <span className="text-base shrink-0">📍</span>
                  <span className="font-semibold text-slate-900 truncate">{value}</span>
                  <span className="text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-bold shrink-0">Domestik</span>
                </>
              ) : (
                <span className="text-slate-400 font-medium truncate">{placeholder || defaultPlaceholder}</span>
              )
            ) : (
              selectedCountry ? (
                <>
                  <span className="text-xl leading-none shrink-0">{selectedCountry.flag}</span>
                  <span className="font-semibold text-slate-900 truncate">{selectedCountry.name}</span>
                </>
              ) : value ? (
                <>
                  <span className="text-base shrink-0">🌍</span>
                  <span className="font-semibold text-slate-900 truncate">{value}</span>
                  <span className="text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-bold shrink-0">Kustom</span>
                </>
              ) : (
                <span className="text-slate-400 font-medium truncate">{placeholder || defaultPlaceholder}</span>
              )
            )}
          </div>
          <ChevronDown
            size={16}
            className={clsx('text-slate-400 shrink-0 transition-transform duration-200 ml-1.5', open && 'rotate-180 text-primary-container')}
          />
        </button>
      )}

      {/* Dropdown Menu - Positioned with high z-index and guaranteed visibility */}
      {open && (
        <div className="absolute left-0 right-0 sm:min-w-[320px] z-[100] mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)] overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Search Bar */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/90">
            <div className="relative flex items-center">
              <Search size={15} className="absolute left-3 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={
                  isDomestic
                    ? 'Cari kota, bandara, pelabuhan di ID...'
                    : 'Cari nama negara tujuan...'
                }
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container font-medium"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* List Content */}
          <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
            {isDomestic ? (
              /* Domestic locations list */
              <>
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Kota, Bandara &amp; Pelabuhan Indonesia</span>
                  <span>{filteredDomestic.length} Lokasi</span>
                </div>
                {filteredDomestic.map(loc => {
                  const isSelected = value.toLowerCase() === loc.name.toLowerCase() || value.toLowerCase() === loc.code.toLowerCase();
                  return (
                    <button
                      key={loc.code}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectPreset(loc.name);
                      }}
                      onClick={() => selectPreset(loc.name)}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left',
                        isSelected
                          ? 'bg-cyan-50 text-primary-container font-bold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate min-w-0">
                        <span className="text-base shrink-0">
                          {loc.type === 'port' ? '🚢' : '✈️'}
                        </span>
                        <div className="truncate min-w-0">
                          <span className="block truncate font-semibold">{loc.name}</span>
                          <span className="block text-[10px] text-slate-400 font-normal truncate">
                            Wilayah {loc.island}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {loc.code}
                        </span>
                        {isSelected && <Check size={16} className="text-primary-container" />}
                      </div>
                    </button>
                  );
                })}

                {filteredDomestic.length === 0 && search.trim() && (
                  <div className="p-2 space-y-2">
                    <p className="text-xs text-slate-500 px-2 py-1">
                      Kota &quot;{search}&quot; tidak ada dalam daftar utama.
                    </p>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onChange(search.trim(), true);
                        setOpen(false);
                        setSearch('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-primary-container text-xs font-bold transition-colors border border-cyan-200"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Sparkles size={14} className="shrink-0" />
                        <span className="truncate">Gunakan &quot;{search.trim()}&quot; (Analisa AI)</span>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                        Domestik
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* International countries list */
              <>
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Negara Populer</span>
                  <span>{filteredCountries.length} Negara</span>
                </div>
                {filteredCountries.map(c => {
                  const isSelected = value.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectPreset(c.name);
                      }}
                      onClick={() => selectPreset(c.name)}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left',
                        isSelected
                          ? 'bg-cyan-50 text-primary-container font-bold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate min-w-0">
                        <span className="text-xl leading-none shrink-0">{c.flag}</span>
                        <span className="truncate font-semibold text-slate-800">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                          {c.code}
                        </span>
                        {isSelected && <Check size={16} className="text-primary-container" />}
                      </div>
                    </button>
                  );
                })}

                {filteredCountries.length === 0 && search.trim() && (
                  <div className="p-2 space-y-2">
                    <p className="text-xs text-slate-500 px-2 py-1">
                      Negara &quot;{search}&quot; belum terdaftar di katalog reguler.
                    </p>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onChange(search.trim(), true);
                        setOpen(false);
                        setSearch('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-primary-container text-xs font-bold transition-colors border border-cyan-200"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Sparkles size={14} className="shrink-0" />
                        <span className="truncate">Gunakan &quot;{search.trim()}&quot; (Analisa AI)</span>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                        Kustom
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Custom Location Entry Button */}
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                enterCustomMode();
              }}
              onClick={enterCustomMode}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-primary-container bg-cyan-50 hover:bg-cyan-100 transition-colors border border-cyan-200"
            >
              {isDomestic ? <MapPin size={14} /> : <Globe size={14} />}
              <span>
                {isDomestic
                  ? '📍 Ketik Kota / Pelabuhan Lainnya'
                  : '🌍 Ketik Negara Lain (Analisa AI)'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
