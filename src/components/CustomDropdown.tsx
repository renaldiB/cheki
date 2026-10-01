'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    width?: number;
    minWidth?: number;
    maxWidth?: string;
  }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position when open
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();

      // If trigger button scrolled out of viewport, auto-close
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        return;
      }

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Flip upwards if less than 200px below and more space above
      const openAbove = spaceBelow < 200 && spaceAbove > spaceBelow;

      if (size === 'md') {
        const left = Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8));
        setCoords({
          top: openAbove ? undefined : rect.bottom + 6,
          bottom: openAbove ? window.innerHeight - rect.top + 6 : undefined,
          left,
          width: Math.min(rect.width, window.innerWidth - 16),
        });
      } else {
        const right = Math.max(8, window.innerWidth - rect.right);
        setCoords({
          top: openAbove ? undefined : rect.bottom + 6,
          bottom: openAbove ? window.innerHeight - rect.top + 6 : undefined,
          right,
          minWidth: 220,
          maxWidth: 'calc(100vw - 16px)',
        });
      }
    };

    updatePosition();

    // Listen to resize and scroll (capture phase catches container scrolling)
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, size]);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
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
  }, [open]);

  const selected = options.find(o => o.value === value);

  return (
    <div className={clsx('relative inline-block text-left', className)}>
      <button
        ref={triggerRef}
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

      {open && mounted && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            zIndex: 99999,
            top: coords.top !== undefined ? `${coords.top}px` : undefined,
            bottom: coords.bottom !== undefined ? `${coords.bottom}px` : undefined,
            left: coords.left !== undefined ? `${coords.left}px` : undefined,
            right: coords.right !== undefined ? `${coords.right}px` : undefined,
            width: coords.width !== undefined ? `${coords.width}px` : undefined,
            minWidth: coords.minWidth !== undefined ? `${coords.minWidth}px` : undefined,
            maxWidth: coords.maxWidth,
            maxHeight: 'min(320px, calc(100vh - 24px))',
            overflowY: 'auto',
          }}
          className={clsx(
            'rounded-2xl bg-white border border-slate-200 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)] p-1.5 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150',
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
        </div>,
        document.body
      )}
    </div>
  );
}
