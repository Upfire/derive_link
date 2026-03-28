import { MOCK_PAYMENTS, MOCK_DRIVERS, MOCK_RENTALS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { DollarSign } from 'lucide-react';

export default function AdminPayments() {
  const total = MOCK_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const overdue = MOCK_PAYMENTS.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Expected', value: `$${total.toLocaleString()}`, accent: 'text-white' },
          { label: 'Overdue', value: `$${overdue.toLocaleString()}`, accent: 'text-red-400' },
          { label: 'Collected', value: `$${(total - overdue).toLocaleString()}`, accent: 'text-emerald-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-800 border border-surface-600 rounded-2xl p-5 flex items-center gap-4">
            <DollarSign size={18} className="text-surface-400" />
            <div>
              <p className="text-surface-400 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`font-display text-xl font-bold ${stat.accent}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-surface-400 text-xs uppercase tracking-widest border-b border-surface-600 bg-surface-700/30">
              {['Driver', 'Rental', 'Amount', 'Due Date', 'Paid Date', 'Method', 'Status', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {MOCK_PAYMENTS.map(payment => {
              const driver = MOCK_DRIVERS.find(d => d.id === payment.driverId);
              return (
                <tr key={payment.id} className="hover:bg-surface-700/30 transition">
                  <td className="px-5 py-4 text-white font-medium">{driver?.name ?? '—'}</td>
                  <td className="px-5 py-4 text-surface-400 font-mono text-xs">{payment.rentalId}</td>
                  <td className="px-5 py-4 text-white font-display font-semibold">${payment.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-surface-300">{payment.dueDate}</td>
                  <td className="px-5 py-4 text-surface-300">{payment.paidDate ?? <span className="text-surface-500">—</span>}</td>
                  <td className="px-5 py-4 text-surface-400 capitalize">{payment.method ?? '—'}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant(payment.status)}>{payment.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    {payment.status !== 'paid' && (
                      <button className="text-xs text-emerald-400 hover:text-emerald-300 font-body font-medium transition">Mark Paid</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
