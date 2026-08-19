import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRANSACTION_STATUS_LABELS } from '@/lib/constants';

export type StatusType = 'PENDING' | 'APPROVED' | 'REVIEW' | 'REJECTED';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { icon: React.ReactNode; colorClass: string }> = {
  PENDING: {
    icon: <Clock size={14} />,
    colorClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  APPROVED: {
    icon: <CheckCircle size={14} />,
    colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  REVIEW: {
    icon: <AlertCircle size={14} />,
    colorClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  },
  REJECTED: {
    icon: <XCircle size={14} />,
    colorClass: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const label = TRANSACTION_STATUS_LABELS[status] ?? status;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.colorClass,
        className
      )}
    >
      {config.icon}
      <span>{label}</span>
    </span>
  );
}
