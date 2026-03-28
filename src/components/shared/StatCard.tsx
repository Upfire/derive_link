import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  accent?: 'brand' | 'purple' | 'emerald' | 'red';
}

const accentMap = {
  brand:   { icon: 'bg-brand-500/10 text-brand-400',   border: 'border-brand-500/20' },
  purple:  { icon: 'bg-purple-500/10 text-purple-400',  border: 'border-purple-500/20' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' },
  red:     { icon: 'bg-red-500/10 text-red-400',        border: 'border-red-500/20' },
};

export function StatCard({ label, value, icon: Icon, change, accent = 'brand' }: StatCardProps) {
  const a = accentMap[accent];
  return (
    <div className={clsx('bg-surface-800 border rounded-2xl p-5 flex items-start gap-4', a.border)}>
      <div className={clsx('p-2.5 rounded-xl flex-shrink-0', a.icon)}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-surface-400 text-xs font-body uppercase tracking-widest mb-1">{label}</p>
        <p className="font-display text-2xl font-bold text-white">{value}</p>
        {change !== undefined && (
          <p className={clsx('text-xs font-body mt-1', change >= 0 ? 'text-emerald-400' : 'text-red-400')}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change)}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}
