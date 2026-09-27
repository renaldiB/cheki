import clsx from 'clsx';
import { ItemStatus } from '@/types/luggage';
import { CheckCircle2, AlertTriangle, Ban } from 'lucide-react';

interface StatusBadgeProps {
  status: ItemStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const CONFIG = {
  allowed: {
    label: 'Aman (Boleh Dibawa)',
    shortLabel: 'Aman',
    Icon: CheckCircle2,
    badgeClass: 'bg-[#E6FCF5] text-[#059669] border-[#A7F3D0] shadow-sm',
    dotClass: 'bg-[#10B981]',
  },
  conditional: {
    label: 'Boleh Bersyarat',
    shortLabel: 'Bersyarat',
    Icon: AlertTriangle,
    badgeClass: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A] shadow-sm',
    dotClass: 'bg-[#F59E0B]',
  },
  forbidden: {
    label: 'Dilarang Keras',
    shortLabel: 'Dilarang',
    Icon: Ban,
    badgeClass: 'bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3] shadow-sm',
    dotClass: 'bg-[#EF4444]',
  },
};

export default function StatusBadge({ status, size = 'md', showLabel = true }: StatusBadgeProps) {
  const cfg = CONFIG[status] || CONFIG.conditional;
  const Icon = cfg.Icon;

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] gap-1',
    sm: 'px-2.5 py-0.5 text-xs gap-1.5',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  };

  const iconSizes = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center border rounded-full font-bold tracking-tight select-none ponytail-spring',
        cfg.badgeClass,
        sizeClasses[size]
      )}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dotClass)}></span>
      <Icon size={iconSizes[size]} strokeWidth={2.4} className="shrink-0" />
      {showLabel && (
        <span className="font-sans whitespace-nowrap">{size === 'xs' ? cfg.shortLabel : cfg.label}</span>
      )}
    </span>
  );
}
