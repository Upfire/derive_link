import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PAYMENTS, MOCK_DRIVERS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { EyeOff } from 'lucide-react';

export default function UserPayments() {
  const { user } = useAuth();
  const { config } = useVisibility();

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
