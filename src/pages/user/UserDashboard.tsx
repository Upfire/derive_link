import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_DRIVERS, MOCK_CARS, MOCK_RENTALS, MOCK_PAYMENTS } from '@/utils/mockData';
import { Badge, statusVariant } from '@/components/shared/Badge';
import { Car, DollarSign, Star, Calendar, EyeOff } from 'lucide-react';

function HiddenBlock({ label }: { label: string }) {
  return (
    <div className="bg-surface-800 border border-dashed border-surface-600 rounded-2xl p-6 flex items-center justify-center gap-2 text-surface-500 text-sm font-body">
      <EyeOff size={14} />
      <span>{label} — hidden by your fleet admin</span>
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { config } = useVisibility();
  const dp = config.driverPortal;

  // Find this driver's data
  const driver = MOCK_DRIVERS.find(d => d.userId === user?.id) ?? MOCK_DRIVERS[0];
  const car = MOCK_CARS.find(c => c.id === driver.currentCarId);
  const rental = MOCK_RENTALS.find(r => r.driverId === driver.id && r.status === 'active');
  const payments = MOCK_PAYMENTS.filter(p => p.driverId === driver.id);
  const nextPayment = payments.find(p => p.status === 'pending' || p.status === 'overdue');
  const boltPayment = payments.find(p => p.boltAmount === '1000$')

  return (
    <div className="space-y-6">
     

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
  <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex flex-col">
    <p className="text-xs text-surface-400 uppercase tracking-widest font-body mb-1">Name, Surname</p>
    <p className="font-display text-2xl font-bold text-white">{driver.name}</p>
  </div>
  <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex flex-col items-center justify-center">
    <p className="text-xs text-surface-400 uppercase tracking-widest font-body mb-1">Trip Count</p>
    <p className="font-display text-2xl font-bold text-white">{driver.totalTrips}</p>
  </div>
  <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex flex-col items-center justify-center">
    <p className="text-xs text-surface-400 uppercase tracking-widest font-body mb-1">Bolt Count</p>
    <p className="font-display text-2xl font-bold text-white">{driver.tripsBolt}</p>
  </div>
  <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex flex-col items-center justify-center">
    <p className="text-xs text-surface-400 uppercase tracking-widest font-body mb-1">Uber Count</p>
    <p className="font-display text-2xl font-bold text-white">{driver.tripsUber}</p>
  </div>
  <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 flex flex-col items-center justify-center">
    <p className="text-xs text-surface-400 uppercase tracking-widest font-body mb-1">Fuel cost</p>
    <div className="flex items-center justify-center gap-1">
      <p className="font-display text-2xl font-bold text-white">{driver.fuel}</p>
      <DollarSign size={18} className="text-white" />
    </div>
  </div>
</div>
 {/* Next payment */}
      {dp.showPaymentHistory ? (
        nextPayment && (
          <div className={`border rounded-2xl p-5 flex items-start gap-4 ${
            nextPayment.status === 'overdue'
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-surface-800 border-surface-600'
          }`}>
            <DollarSign size={18} className={nextPayment.status === 'overdue' ? 'text-red-400' : 'text-brand-400'} />
            <div>
              <p className="font-body font-semibold text-white">
                {nextPayment.status === 'overdue' ? 'Overdue Payment' : 'Upcoming Payment'}
              </p>
              <p className="text-2xl font-display font-bold text-white mt-0.5">${nextPayment.amount}</p>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-body text-surface-400">
                <Calendar size={12} />
                Due: {nextPayment.dueDate}
              </div>
            </div>
            <Badge variant={statusVariant(nextPayment.status)} className="ml-auto">{nextPayment.status}</Badge>
          </div>
        )
      ) : (
        <HiddenBlock label="Payment history" />
      )}
      {/* Current car */}
      {dp.showCarDetails ? (
        car ? (
          <div className="bg-surface-800 grid grid-cols-3 gap-3 border border-surface-600 rounded-2xl p-6">
              <div>
                <p className="text-surface-400 text-xs">Car</p>
                <p className="font-display text-xl font-bold text-white">
                  {car.make} {car.model} {car.year}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs">Plate</p>
                <p className="font-display text-xl font-bold text-white">
                {car.licensePlate}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs">VIN</p>
                <p className="font-display text-xl font-bold text-white">
                {car.vin}
                </p>
              </div>
          <div className="col-span-3 grid grid-cols-4 gap-3 border-t border-surface-600 pt-3">
                <div>
                  <p className="text-surface-400 text-xs">Fuel</p>
                {car.fuelType}
                </div>
                <div>
                  <p className="text-surface-400 text-xs">Mileage</p>
                  <p className="text-white">{car.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-surface-400 text-xs">Inspection</p>
                  <p className="text-white">{car.inspectionDate}</p>
                </div>
                <div>
                  <p className="text-surface-400 text-xs">Insurance</p>
                    <p className="text-white">{car.inspectionDate}</p>
                </div>
         
            </div>
          </div>
        ) : (
          <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6 text-center text-surface-400 text-sm font-body">
            No vehicle assigned yet.
          </div>
        )
      ) : (
        <HiddenBlock label="Car details" />
      )}

     

      {/* Rental info */}
      
    </div>
  );
}
