import { Car, Users, DollarSign, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { MOCK_STATS, MOCK_CHART_DATA, MOCK_RENTALS, MOCK_CARS, MOCK_DRIVERS } from '@/utils/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const s = MOCK_STATS;

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="Total Revenue" value={`$${s.totalRevenue.toLocaleString()}`} icon={DollarSign} change={s.revenueChange} accent="brand" />
        <StatCard label="Active Rentals" value={s.activeRentals} icon={Car} accent="emerald" />
        <StatCard label="Available Cars" value={s.availableCars} icon={TrendingUp} accent="purple" />
        <StatCard label="Total Drivers" value={s.totalDrivers} icon={Users} accent="brand" />
        <StatCard label="Overdue Payments" value={s.overduePayments} icon={AlertTriangle} accent="red" />
        <StatCard label="Avg Rental Days" value="18.4" icon={Clock} accent="purple" />
      </div>

      {/* Revenue chart */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-white mb-6">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MOCK_CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#252535" />
            <XAxis dataKey="month" tick={{ fill: '#4a4a6a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#4a4a6a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1a1a26', border: '1px solid #252535', borderRadius: 8, color: '#fff' }}
              labelStyle={{ color: '#f97316' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent rentals */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-white mb-5">Recent Rentals</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-surface-400 text-xs uppercase tracking-widest border-b border-surface-600">
                <th className="text-left pb-3 font-medium">Driver</th>
                <th className="text-left pb-3 font-medium">Car</th>
                <th className="text-left pb-3 font-medium">Start</th>
                <th className="text-left pb-3 font-medium">Rate/day</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {MOCK_RENTALS.map(rental => {
                const driver = MOCK_DRIVERS.find(d => d.id === rental.driverId);
                const car = MOCK_CARS.find(c => c.id === rental.carId);
                return (
                  <tr key={rental.id} className="hover:bg-surface-700/40 transition">
                    <td className="py-3 text-white font-medium">{driver?.name ?? '—'}</td>
                    <td className="py-3 text-surface-300">{car ? `${car.make} ${car.model}` : '—'}</td>
                    <td className="py-3 text-surface-400">{rental.startDate}</td>
                    <td className="py-3 text-surface-300">${rental.dailyRate}</td>
                    <td className="py-3"><Badge variant={statusVariant(rental.status)}>{rental.status}</Badge></td>
                    <td className="py-3"><Badge variant={statusVariant(rental.paymentStatus)}>{rental.paymentStatus}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
