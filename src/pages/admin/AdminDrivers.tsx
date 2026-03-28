import { useState } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { MOCK_DRIVERS, MOCK_CARS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';

export default function AdminDrivers() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_DRIVERS.filter(d =>
    `${d.name} ${d.email} ${d.phone}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-center justify-between">
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search drivers…"
            className="w-full bg-surface-700 border border-surface-500 text-white rounded-lg pl-8 pr-3 py-2 text-sm font-body placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-body font-medium transition">
          <Plus size={15} /> Add Driver
        </button>
      </div>

      <div className="bg-surface-800 border border-surface-600 rounded-2xl overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-surface-400 text-xs uppercase tracking-widest border-b border-surface-600 bg-surface-700/30">
              {['Driver', 'Contact', 'License', 'Current Car', 'Rating', 'Trips', 'Status', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {filtered.map(driver => {
              const car = MOCK_CARS.find(c => c.id === driver.currentCarId);
              return (
                <tr key={driver.id} className="hover:bg-surface-700/30 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-600 flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                        {driver.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{driver.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-surface-300">{driver.email}</p>
                    <p className="text-surface-500 text-xs">{driver.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-mono text-xs text-surface-300">{driver.licenseNumber}</p>
                    <p className="text-surface-500 text-xs">Exp: {driver.licenseExpiry}</p>
                  </td>
                  <td className="px-5 py-4 text-surface-300">
                    {car ? `${car.make} ${car.model}` : <span className="text-surface-500">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-white text-xs font-mono">{driver.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-surface-300 font-mono">{driver.totalTrips}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant(driver.status)}>{driver.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs text-brand-400 hover:text-brand-300 font-body font-medium transition">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-surface-400 py-12 font-body">No drivers found.</p>
        )}
      </div>
    </div>
  );
}
