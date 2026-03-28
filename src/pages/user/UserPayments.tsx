import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PAYMENTS, MOCK_DRIVERS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { EyeOff, Zap, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface BoltEarnings {
  gross: number;
  net: number;
  currency: string;
  period: string;
}

export default function UserPayments() {
  const { user } = useAuth();
  const { config } = useVisibility();

  const [boltEarnings, setBoltEarnings] = useState<BoltEarnings | null>(null);
  const [boltLoading, setBoltLoading] = useState(false);
  const [boltError, setBoltError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.tenantId) return;

    let cancelled = false;
    (async () => {
      setBoltLoading(true);
      setBoltError(null);
      try {
        const now = new Date();
        const dateFrom = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
        const dateTo = now.toISOString().slice(0, 10);

        const resp = await axios.get('/api/bolt/earnings', {
          params: { tenantId: user.tenantId, dateFrom, dateTo },
        });

        if (!cancelled) {
          const data = resp.data;
          const from = data.period_from ?? dateFrom;
          const to = data.period_to ?? dateTo;
          setBoltEarnings({
            gross: data.gross_amount ?? data.gross ?? 0,
            net: data.net_amount ?? data.net ?? 0,
            currency: data.currency ?? 'PLN',
            period: `${from} — ${to}`,
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          if (err.response?.status === 400 && err.response?.data?.error?.includes('not configured')) {
            setBoltError('Bolt Fleet not connected. Ask your fleet admin to configure it in Settings.');
          } else {
            setBoltError('Could not load Bolt Fleet earnings.');
          }
        }
      } finally {
        if (!cancelled) setBoltLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [user?.tenantId]);

  if (!config.driverPortal.showPaymentHistory) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-surface-400">
        <EyeOff size={32} />
        <p className="font-body text-sm">Payment history is not visible. Contact your fleet admin.</p>
      </div>
    );
  }

  const driver = MOCK_DRIVERS.find(d => d.userId === user?.id) ?? MOCK_DRIVERS[0];
  const payments = MOCK_PAYMENTS.filter(p => p.driverId === driver.id);

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalOwed = payments.filter(p => p.status !== 'paid' && p.status !== 'cancelled').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Bolt Fleet Earnings */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-brand-400" />
          <h2 className="font-display text-base font-semibold text-white">Bolt Fleet Earnings</h2>
        </div>

        {boltLoading && (
          <div className="flex items-center gap-2 text-surface-400 py-4">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm font-body">Loading earnings from Bolt Fleet...</span>
          </div>
        )}

        {boltError && (
          <p className="text-sm font-body text-surface-400 py-2">{boltError}</p>
        )}

        {boltEarnings && (
          <>
            <p className="text-xs text-surface-400 font-body mb-3">
              Period: {boltEarnings.period}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-900 border border-surface-700 rounded-xl p-4">
                <p className="text-xs text-surface-400 font-body uppercase tracking-widest mb-1">Zarobki Brutto</p>
                <p className="font-display text-2xl font-bold text-white">
                  {boltEarnings.gross.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} {boltEarnings.currency}
                </p>
              </div>
              <div className="bg-surface-900 border border-surface-700 rounded-xl p-4">
                <p className="text-xs text-surface-400 font-body uppercase tracking-widest mb-1">Zarobki Netto</p>
                <p className="font-display text-2xl font-bold text-emerald-400">
                  {boltEarnings.net.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} {boltEarnings.currency}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xs text-emerald-300 font-body uppercase tracking-widest mb-1">Total Paid</p>
          <p className="font-display text-2xl font-bold text-white">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-xs text-red-300 font-body uppercase tracking-widest mb-1">Outstanding</p>
          <p className="font-display text-2xl font-bold text-white">${totalOwed.toLocaleString()}</p>
        </div>
      </div>

      {/* Payment list */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-600">
          <h2 className="font-display text-base font-semibold text-white">Payment History</h2>
        </div>
        <div className="divide-y divide-surface-700">
          {payments.length === 0 && (
            <p className="text-center text-surface-400 text-sm font-body py-10">No payments yet.</p>
          )}
          {payments.map(payment => (
            <div key={payment.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-body font-medium text-white">${payment.amount.toLocaleString()}</p>
                <p className="text-xs text-surface-400 font-body mt-0.5">
                  Due: {payment.dueDate}
                  {payment.paidDate && ` · Paid: ${payment.paidDate}`}
                  {payment.method && ` · via ${payment.method}`}
                </p>
              </div>
              <Badge variant={statusVariant(payment.status)}>{payment.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
