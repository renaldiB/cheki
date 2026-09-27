'use client';

import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { AnalysisResult, PlacementType } from '@/types/luggage';
import clsx from 'clsx';
import {
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle2,
  Ban,
  HelpCircle,
  ChevronDown,
  Check,
  PlusCircle,
  BatteryWarning,
} from 'lucide-react';

interface LuggageCardProps {
  result: AnalysisResult;
  index: number;
  onAddToChecklist?: (result: AnalysisResult) => void;
  onSwitchPlacement?: (item: string, newPlacement: PlacementType) => void;
}

export default function LuggageCard({
  result,
  index,
  onAddToChecklist,
  onSwitchPlacement,
}: LuggageCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const hasWarning = !!result.placementWarning;

  const spineColor = hasWarning
    ? 'bg-rose-500'
    : result.status === 'forbidden'
    ? 'bg-rose-500'
    : result.status === 'conditional'
    ? 'bg-amber-400'
    : 'bg-[#00E599]';

  const isCabin = result.placement === 'cabin';
  const isCheckin = result.placement === 'checkin';

  const handleAdd = () => {
    if (onAddToChecklist) {
      onAddToChecklist(result);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_24px_-4px_rgba(0,180,240,0.1)] border border-cyan-100/90 flex flex-col justify-between overflow-hidden ponytail-spring hover:shadow-[0_12px_36px_-6px_rgba(0,180,240,0.15)] hover:-translate-y-0.5">
      {/* Left Color Spine */}
      <div className={clsx('absolute left-0 top-0 bottom-0 w-1.5', spineColor)}></div>

      <div className="space-y-3 pl-1.5">
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">
              #{String(index + 1).padStart(2, '0')}
            </span>
            <StatusBadge status={result.status} size="sm" />
          </div>

          {onSwitchPlacement && (
            <button
              type="button"
              onClick={() =>
                onSwitchPlacement(
                  result.item,
                  result.placement === 'cabin' ? 'checkin' : 'cabin'
                )
              }
              className="text-[11px] font-bold text-slate-500 hover:text-primary-container px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 transition-colors flex items-center gap-1.5 shrink-0 tap-spring"
              title="Ganti penempatan tas"
            >
              <ArrowLeftRight size={13} strokeWidth={2.2} />
              <span>Tukar Tas</span>
            </button>
          )}
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ponytail-spring',
              hasWarning
                ? 'bg-rose-100 text-rose-600'
                : result.status === 'forbidden'
                ? 'bg-rose-50 text-rose-600'
                : result.status === 'conditional'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            )}
          >
            {hasWarning ? (
              <BatteryWarning size={22} strokeWidth={2.2} />
            ) : result.status === 'forbidden' ? (
              <Ban size={22} strokeWidth={2.2} />
            ) : result.status === 'conditional' ? (
              <HelpCircle size={22} strokeWidth={2.2} />
            ) : (
              <CheckCircle2 size={22} strokeWidth={2.2} />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-base text-slate-900 tracking-tight truncate capitalize">
              {result.item}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Rencana: {isCabin ? 'Tas Kabin' : isCheckin ? 'Bagasi Kargo' : 'Bebas Pilih'}
            </span>
          </div>
        </div>

        {/* High Impact Warning Banner if Placement Wrong */}
        {hasWarning && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1 ponytail-spring">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <AlertTriangle size={15} className="shrink-0 animate-bounce text-rose-600" />
              <span>PERINGATAN BAHAYA PENEMPATAN!</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">{result.placementWarning}</p>
          </div>
        )}

        {/* Mandated Location Assignment Pill */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100">
          <span className="text-slate-500 font-medium">Penempatan Wajib:</span>
          <span
            className={clsx(
              'px-2.5 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap',
              isCabin
                ? 'bg-primary-container text-white'
                : isCheckin
                ? 'bg-[#3ffdae] text-[#007149]'
                : 'bg-slate-200 text-slate-700'
            )}
          >
            {isCabin
              ? '🎒 Wajib Kabin'
              : isCheckin
              ? '🧳 Wajib Bagasi Kargo'
              : '🎒/🧳 Bebas Kabin & Bagasi'}
          </span>
        </div>

        {/* Quick summary snippet if collapsed */}
        {!drawerOpen && result.reasons && result.reasons.length > 0 && !hasWarning && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {result.reasons[0]}
          </p>
        )}
      </div>

      {/* Expandable Action Drawer */}
      <div className="mt-3 pt-2.5 pl-1.5 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-between transition-colors tap-spring"
        >
          <span>{drawerOpen ? 'Tutup Detail Regulasi' : 'Buka Regulasi & Tips Aman'}</span>
          <ChevronDown
            size={16}
            className={clsx(
              'transition-transform duration-250',
              drawerOpen && 'rotate-180 text-primary-container'
            )}
          />
        </button>

        {drawerOpen && (
          <div className="pt-2 text-xs space-y-3 animate-in fade-in-50 duration-200">
            {/* Reasons */}
            {result.reasons && result.reasons.length > 0 && (
              <div className="space-y-1">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  📋 Alasan &amp; Ketentuan ICAO/IMO:
                </span>
                <ul className="space-y-1 text-slate-600 pl-3 list-disc">
                  {result.reasons.map((r, i) => (
                    <li key={i} className="leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {result.tips && result.tips.length > 0 && (
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                  💡 Tips Pengepakan Aman:
                </span>
                <ul className="space-y-1 text-slate-600 pl-3 list-disc">
                  {result.tips.map((t, i) => (
                    <li key={i} className="leading-relaxed">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customs Note */}
            {result.customsNote && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-bold block text-[11px] mb-0.5">🛄 Catatan Bea Cukai:</span>
                <p className="leading-relaxed">{result.customsNote}</p>
              </div>
            )}
          </div>
        )}

        {/* 1-Click Add to Packing Checklist */}
        {onAddToChecklist && (
          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={clsx(
              'w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm mt-2 tap-spring',
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-cyan-50 text-slate-800 border border-slate-200 hover:border-cyan-300'
            )}
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                <span>Tersimpan di Packing Checklist!</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} strokeWidth={2.2} />
                <span>Tambahkan ke Packing Checklist</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
