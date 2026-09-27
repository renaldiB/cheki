'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import clsx from 'clsx';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  icon?: 'trash' | 'warning';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'danger',
  icon = 'trash',
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in-50 duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Solid Opaque White Modal Card - Ultra High Contrast */}
      <div
        ref={modalRef}
        className="relative w-full max-w-sm sm:max-w-md bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.08)] space-y-5 ponytail-spring animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors tap-spring"
          aria-label="Tutup modal"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Top Header with Icon Badge */}
        <div className="flex items-start gap-4 pr-6">
          <div
            className={clsx(
              'w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md',
              variant === 'danger'
                ? 'bg-rose-100 text-rose-600 border-2 border-rose-200'
                : variant === 'warning'
                ? 'bg-amber-100 text-amber-700 border-2 border-amber-200'
                : 'bg-cyan-100 text-primary-container border-2 border-cyan-200'
            )}
          >
            {icon === 'trash' ? (
              <Trash2 size={26} strokeWidth={2.4} />
            ) : (
              <AlertTriangle size={26} strokeWidth={2.4} />
            )}
          </div>

          <div>
            <h3 className="font-black text-slate-950 text-lg sm:text-xl tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-semibold">
              {description}
            </p>
          </div>
        </div>

        {/* Highlighted Warning Callout Box for maximum clarity */}
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
          <span>Tindakan ini permanen. Semua barang di tas kabin dan koper kargo akan dihapus.</span>
        </div>

        {/* Action Buttons: Full-width tactile 50-50 grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 tap-spring text-center"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={clsx(
              'w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all tap-spring flex items-center justify-center gap-2 shadow-lg text-white',
              variant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-rose-600/30'
                : 'bg-primary-container hover:bg-cyan-600 shadow-cyan-500/30'
            )}
          >
            {icon === 'trash' && <Trash2 size={16} strokeWidth={2.5} />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
