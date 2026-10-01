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
  Backpack,
  Luggage,
  FileText,
  Lightbulb,
  ShieldCheck,
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
    : 'bg-emerald-500';

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
    <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 flex flex-col justify-between overflow-hidden transition-all duration-150 hover:border-slate-300 hover:shadow-md">
      {/* Left Color Spine */}
      <div className={clsx('absolute left-0 top-0 bottom-0 w-1', spineColor)}></div>

      <div className="space-y-3 pl-1.5">
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-normal text-slate-400">
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
              className="text-xs font-medium text-slate-500 hover:text-sky-700 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200/60 transition-colors flex items-center gap-1.5 shrink-0 active:scale-[0.98]"
              title="Ganti penempatan tas"
            >
              <ArrowLeftRight size={13} strokeWidth={2} />
              <span>Tukar Tas</span>
            </button>
          )}
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border',
              hasWarning
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : result.status === 'forbidden'
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : result.status === 'conditional'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            )}
          >
            {hasWarning ? (
              <BatteryWarning size={20} strokeWidth={2} />
            ) : result.status === 'forbidden' ? (
              <Ban size={20} strokeWidth={2} />
            ) : result.status === 'conditional' ? (
              <HelpCircle size={20} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={20} strokeWidth={2} />
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
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700">
              <AlertTriangle size={15} className="shrink-0 text-rose-600" />
              <span>Peringatan Penempatan Barang</span>
            </div>
            <p className="text-xs leading-relaxed font-normal">{result.placementWarning}</p>
          </div>
        )}

        {/* Mandated Location Assignment Pill */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100">
          <span className="text-slate-500 font-medium">Penempatan Wajib:</span>
          <span
            className={clsx(
              'px-2.5 py-0.5 rounded-full font-semibold text-xs inline-flex items-center gap-1 whitespace-nowrap',
              isCabin
                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                : isCheckin
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            )}
          >
            {isCabin ? (
              <>
                <Backpack size={13} strokeWidth={2} />
                <span>Wajib Kabin</span>
              </>
            ) : isCheckin ? (
              <>
                <Luggage size={13} strokeWidth={2} />
                <span>Wajib Bagasi Kargo</span>
              </>
            ) : (
              <>
                <Check size={13} strokeWidth={2} />
                <span>Bebas Kabin / Kargo</span>
              </>
            )}
          </span>
        </div>

        {/* Quick summary snippet if collapsed */}
        {!drawerOpen && result.reasons && result.reasons.length > 0 && !hasWarning && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {result.reasons[0]}
          </p>
        )}
      </div>

      {/* Expandable Action Drawer */}
      <div className="mt-3 pt-2.5 pl-1.5 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="w-full py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors active:scale-[0.98]"
        >
          <span>{drawerOpen ? 'Tutup Detail Regulasi' : 'Buka Regulasi & Tips Aman'}</span>
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={clsx(
              'transition-transform duration-200',
              drawerOpen && 'rotate-180 text-sky-600'
            )}
          />
        </button>

        {drawerOpen && (
          <div className="pt-2 text-xs space-y-3">
            {/* Reasons */}
            {result.reasons && result.reasons.length > 0 && (
              <div className="space-y-1.5">
                <span className="font-semibold text-slate-700 text-xs flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" strokeWidth={2} />
                  <span>Alasan &amp; Ketentuan ICAO/IMO:</span>
                </span>
                <ul className="space-y-1 text-slate-600 pl-5 list-disc font-normal">
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
              <div className="space-y-1.5">
                <span className="font-semibold text-emerald-800 text-xs flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-emerald-600" strokeWidth={2} />
                  <span>Tips Pengepakan Aman:</span>
                </span>
                <ul className="space-y-1 text-slate-600 pl-5 list-disc font-normal">
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
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <span className="font-semibold text-xs flex items-center gap-1.5 text-amber-800">
                  <ShieldCheck size={14} className="text-amber-600" strokeWidth={2} />
                  <span>Catatan Bea Cukai:</span>
                </span>
                <p className="leading-relaxed text-xs font-normal">{result.customsNote}</p>
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
              'w-full py-2 px-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all mt-2 active:scale-[0.98]',
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-sky-50 text-slate-800 border border-slate-200 hover:border-sky-300'
            )}
          >
            {added ? (
              <>
                <Check size={15} strokeWidth={2.2} />
                <span>Tersimpan di Packing Checklist!</span>
              </>
            ) : (
              <>
                <PlusCircle size={15} strokeWidth={2} />
                <span>Tambahkan ke Packing Checklist</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
