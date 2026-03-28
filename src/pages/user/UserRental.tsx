import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_DRIVERS, MOCK_RENTALS, MOCK_CARS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { EyeOff, FileText } from 'lucide-react';

export default function UserRental() {
  const { user } = useAuth();
  const { config } = useVisibility();

  if (!config.driverPortal.showRentalTerms) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-surface-400">
        <EyeOff size={32} />
        <p className="font-body text-sm">Rental info is hidden. Contact your fleet admin.</p>
      </div>
    );
  }

  const driver = MOCK_DRIVERS.find(d => d.userId === user?.id) ?? MOCK_DRIVERS[0];
  const rentals = MOCK_RENTALS.filter(r => r.driverId === driver.id);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-2 text-brand-400">
        <FileText size={16} />
        <span className="font-body text-sm text-surface-400">All your rental agreements</span>
      </div>

      {rentals.length === 0 && (
        <p className="text-center text-surface-400 text-sm font-body py-10">No rental records found.</p>
      )}

      {rentals.map(rental => {
        const car = MOCK_CARS.find(c => c.id === rental.carId);
        return (
          <div key={rental.id} className="bg-surface-800 border border-surface-600 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-base font-semibold text-white">
                  {car ? `${car.year} ${car.make} ${car.model}` : 'Unknown Vehicle'}
                </p>
                <p className="font-mono text-xs text-surface-400 mt-0.5">{car?.licensePlate}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge variant={statusVariant(rental.status)}>{rental.status}</Badge>
                <Badge variant={statusVariant(rental.paymentStatus)}>{rental.paymentStatus}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-700 text-sm font-body">
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-widest mb-1">Start</p>
                <p className="text-white">{rental.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-widest mb-1">End</p>
                <p className="text-white">{rental.endDate ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-widest mb-1">Daily Rate</p>
                <p className="text-white">${rental.dailyRate}</p>
              </div>
              {rental.totalAmount && (
                <div>
                  <p className="text-xs text-surface-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-white font-semibold">${rental.totalAmount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
