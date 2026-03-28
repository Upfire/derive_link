import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_DRIVERS, MOCK_CARS, MOCK_USERS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { EyeOff, Phone, Mail } from 'lucide-react';

export default function UserCar() {
  const { user } = useAuth();
  const { config } = useVisibility();
  const dp = config.driverPortal;

  const driver = MOCK_DRIVERS.find(d => d.userId === user?.id) ?? MOCK_DRIVERS[0];
  const car = MOCK_CARS.find(c => c.id === driver.currentCarId);

  if (!dp.showCarDetails) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-surface-400">
        <EyeOff size={32} />
        <p className="font-body text-sm">Vehicle details are hidden. Contact your fleet admin.</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-surface-400">
        <p className="font-body text-sm">No vehicle assigned to your account yet.</p>
      </div>
    );
  }

  const owner = MOCK_USERS.find(u => u.id === car.ownerId);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Car hero */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {car.year} {car.make} {car.model}
            </h2>
            <p className="font-mono text-surface-400 text-sm mt-1">{car.licensePlate}</p>
          </div>
          <Badge variant={statusVariant(car.status)}>{car.status}</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-surface-600">
          {[
            { label: 'Year', value: car.year },
            { label: 'Fuel', value: car.fuelType },
            { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
            { label: 'Daily Rate', value: `$${car.dailyRate}` },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs text-surface-400 font-body uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-white font-body capitalize font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VIN */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex items-center justify-between">
        <p className="text-xs text-surface-400 font-body uppercase tracking-widest">VIN</p>
        <p className="font-mono text-sm text-surface-300">{car.vin}</p>
      </div>

      {/* Owner info — conditionally visible */}
      {dp.showOwnerContact ? (
        owner && (
          <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
            <h3 className="font-display text-base font-semibold text-white mb-4">Car Owner</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-600 flex items-center justify-center text-white font-display font-bold">
                {owner.name.charAt(0)}
              </div>
              <div>
                <p className="font-body font-medium text-white">{owner.name}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-surface-400 font-body">
                  <span className="flex items-center gap-1.5"><Mail size={12} />{owner.email}</span>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="bg-surface-800 border border-dashed border-surface-600 rounded-2xl p-5 flex items-center justify-center gap-2 text-surface-500 text-sm font-body">
          <EyeOff size={14} /> Owner contact info — hidden by your fleet admin
        </div>
      )}

      {/* Maintenance */}
      {dp.showMaintenanceSchedule && (
        <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
          <h3 className="font-display text-base font-semibold text-white mb-3">Maintenance</h3>
          <p className="text-sm font-body text-surface-400">Next scheduled service: <span className="text-white">2025-06-01</span></p>
          <p className="text-sm font-body text-surface-400 mt-1">Last oil change: <span className="text-white">2024-12-15</span></p>
        </div>
      )}
    </div>
  );
}
