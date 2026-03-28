import { Building2, Users, Car, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/shared/Badge';
import { MOCK_TENANTS } from '@/utils/mockData';

const planColors: Record<string, string> = {
  starter: 'bg-surface-600 text-surface-300 border-surface-500',
  pro: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  enterprise: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function SuperAdminDashboard() {
  const totalDrivers = MOCK_TENANTS.reduce((s, t) => s + t.driverCount, 0);
  const totalCars = MOCK_TENANTS.reduce((s, t) => s + t.carCount, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Tenants" value={MOCK_TENANTS.length} icon={Building2} accent="purple" />
        <StatCard label="Total Drivers" value={totalDrivers} icon={Users} accent="brand" />
        <StatCard label="Total Cars" value={totalCars} icon={Car} accent="emerald" />
        <StatCard label="MRR" value="$12,400" icon={TrendingUp} change={8.2} accent="brand" />
      </div>

      <div className="bg-surface-800 border border-surface-600 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-surface-600">
          <h2 className="font-display text-base font-semibold text-white">All Tenants</h2>
        </div>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-surface-400 text-xs uppercase tracking-widest border-b border-surface-600 bg-surface-700/30">
              {['Company', 'Plan', 'Admins', 'Drivers', 'Cars', 'Created', 'Status', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {MOCK_TENANTS.map(tenant => (
              <tr key={tenant.id} className="hover:bg-surface-700/30 transition">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-600 flex items-center justify-center text-white font-display font-bold text-sm">
                      {tenant.name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{tenant.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border capitalize ${planColors[tenant.plan]}`}>
                    {tenant.plan}
                  </span>
                </td>
                <td className="px-5 py-4 text-surface-300">{tenant.adminCount}</td>
                <td className="px-5 py-4 text-surface-300">{tenant.driverCount}</td>
                <td className="px-5 py-4 text-surface-300">{tenant.carCount}</td>
                <td className="px-5 py-4 text-surface-400">{tenant.createdAt}</td>
                <td className="px-5 py-4">
                  <Badge variant={tenant.isActive ? 'success' : 'danger'}>
                    {tenant.isActive ? 'active' : 'suspended'}
                  </Badge>
                </td>
                <td className="px-5 py-4 space-x-3">
                  <button className="text-xs text-brand-400 hover:text-brand-300 font-body font-medium transition">Manage</button>
                  <button className="text-xs text-red-400 hover:text-red-300 font-body font-medium transition">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
