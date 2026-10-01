'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

export interface DropdownOption<T extends string | number> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps<T extends string | number> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
  size?: 'sm' | 'md';
}

export default function CustomDropdown<T extends string | number>({
  value,
  options,
  onChange,
  placeholder = 'Pilih...',
  className,
  menuClassName,
  size = 'md',
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className={clsx('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'w-full flex items-center justify-between gap-2 border transition-all duration-150 active:scale-[0.98]',
          size === 'sm'
            ? 'px-3 py-1.5 text-xs rounded-xl'
            : 'px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-2xl',
          'bg-white text-slate-800 font-semibold shadow-sm',
          open
            ? 'border-sky-600 ring-2 ring-sky-500/20'
            : 'border-slate-200 hover:border-slate-300'
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selected?.icon && <span className="shrink-0">{selected.icon}</span>}
          <span className="truncate">{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown
          size={size === 'sm' ? 14 : 16}
          className={clsx(
            'text-slate-400 shrink-0 transition-transform duration-200',
            open && 'rotate-180 text-sky-600'
          )}
        />
      </button>

      {open && (
        <div
          className={clsx(
            'absolute right-0 z-[120] mt-1.5 min-w-[220px] w-full rounded-2xl bg-white border border-slate-200 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.15)] p-1.5 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150',
            menuClassName
          )}
        >
          {options.map(option => {
            const isSelected = option.value === value;
            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-left transition-all active:scale-[0.98]',
                  size === 'sm' ? 'text-xs' : 'text-xs sm:text-sm',
                  isSelected
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200/70'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  <div className="truncate">
                    <span className="block truncate">{option.label}</span>
                    {option.sublabel && (
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {option.sublabel}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <Check size={14} className="text-sky-600 shrink-0" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
