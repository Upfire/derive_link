import { useState } from 'react';
import { Plus, Search, Car as CarIcon } from 'lucide-react';
import { MOCK_CARS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import type { Car } from '@/types';

export default function AdminCars() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Car['status'] | 'all'>('all');

  const filtered = MOCK_CARS.filter(c => {
    const matchSearch =
      `${c.make} ${c.model} ${c.licensePlate}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statuses: Array<Car['status'] | 'all'> = ['all', 'available', 'rented', 'maintenance', 'inactive'];

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium capitalize transition ${
                filterStatus === s
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-700 text-surface-300 hover:bg-surface-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search cars…"
              className="w-full bg-surface-700 border border-surface-500 text-white rounded-lg pl-8 pr-3 py-2 text-sm font-body placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-body font-medium transition">
            <Plus size={15} /> Add Car
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(car => (
          <div key={car.id} className="bg-surface-800 border border-surface-600 rounded-2xl p-5 hover:border-surface-500 transition group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-surface-700 rounded-xl flex items-center justify-center group-hover:bg-brand-500/10 transition">
                <CarIcon size={18} className="text-surface-400 group-hover:text-brand-400 transition" />
              </div>
              <Badge variant={statusVariant(car.status)}>{car.status}</Badge>
            </div>
            <h3 className="font-display text-base font-semibold text-white">{car.make} {car.model}</h3>
            <p className="text-surface-400 text-sm font-body mb-4">{car.year} · {car.licensePlate}</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-body">
              <div className="bg-surface-700 rounded-lg px-3 py-2">
                <p className="text-surface-500 uppercase tracking-wide mb-0.5">Daily Rate</p>
                <p className="text-white font-medium">${car.dailyRate}</p>
              </div>
              <div className="bg-surface-700 rounded-lg px-3 py-2">
                <p className="text-surface-500 uppercase tracking-wide mb-0.5">Mileage</p>
                <p className="text-white font-medium">{car.mileage.toLocaleString()} km</p>
              </div>
              <div className="bg-surface-700 rounded-lg px-3 py-2">
                <p className="text-surface-500 uppercase tracking-wide mb-0.5">Fuel</p>
                <p className="text-white font-medium capitalize">{car.fuelType}</p>
              </div>
              <div className="bg-surface-700 rounded-lg px-3 py-2">
                <p className="text-surface-500 uppercase tracking-wide mb-0.5">VIN</p>
                <p className="text-white font-mono text-[10px] truncate">{car.vin}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-surface-700 hover:bg-surface-600 text-surface-300 hover:text-white rounded-lg py-2 text-xs font-body font-medium transition">Edit</button>
              <button className="flex-1 bg-surface-700 hover:bg-surface-600 text-surface-300 hover:text-white rounded-lg py-2 text-xs font-body font-medium transition">Assign</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-surface-400 py-16 font-body">No cars match your filter.</div>
        )}
      </div>
    </div>
  );
}
