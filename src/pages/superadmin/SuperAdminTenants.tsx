import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { MOCK_TENANTS } from '@/utils/mockData';
import { Badge } from '@/components/shared/Badge';

const planColors: Record<string, string> = {
  starter:    'bg-surface-600 text-surface-300 border-surface-500',
  pro:        'bg-brand-500/10 text-brand-400 border-brand-500/20',
  enterprise: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function SuperAdminTenants() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_TENANTS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tenants…"
            className="w-full bg-surface-700 border border-surface-600 text-white rounded-lg pl-9 pr-3 py-2 text-sm font-body placeholder:text-surface-400 focus:outline-none focus:border-brand-500 transition"
          />
        </div>
        <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 py-2 text-sm font-body font-semibold transition flex-shrink-0">
          <Plus size={15} /> Add Tenant
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-surface-400 text-xs uppercase tracking-widest border-b border-surface-600 bg-surface-700/30">
              {['Company', 'Plan', 'Admins', 'Drivers', 'Cars', 'Created', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {filtered.map(tenant => (
              <tr key={tenant.id} className="hover:bg-surface-700/30 transition">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-600 flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
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
                  <button className="text-xs text-brand-400 hover:text-brand-300 font-medium transition">Manage</button>
                  <button className="text-xs text-red-400 hover:text-red-300 font-medium transition">
                    {tenant.isActive ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-surface-400 text-sm font-body py-10">No tenants match your search.</p>
        )}
      </div>
    </div>
  );
}
