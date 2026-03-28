import type {
  AuthUser, Tenant, Car, Driver, Rental, Payment,
  VisibilityConfig, DashboardStats, ChartDataPoint
} from '@/types';

// ─── Users ────────────────────────────────────────────────────────────────────
export const MOCK_USERS: AuthUser[] = [
  {
    id: 'sa-1',
    email: 'superadmin@drivelink.io',
    name: 'Alex Superadmin',
    role: 'superadmin',
  },
  {
    id: 'adm-1',
    email: 'admin@fastfleet.com',
    name: 'Maria Kowalska',
    role: 'admin',
    tenantId: 'tenant-1',
  },
  {
    id: 'adm-2',
    email: 'admin@citydrive.pl',
    name: 'Piotr Nowak',
    role: 'admin',
    tenantId: 'tenant-2',
  },
  {
    id: 'usr-1',
    email: 'driver@fastfleet.com',
    name: 'Jakub Wiśniewski',
    role: 'user',
    tenantId: 'tenant-1',
  },
];

// Quick login map (email → password for demo)
export const DEMO_CREDENTIALS: Record<string, string> = {
  'superadmin@drivelink.io': 'super123',
  'admin@fastfleet.com': 'admin123',
  'admin@citydrive.pl': 'admin123',
  'driver@fastfleet.com': 'driver123',
};

// ─── Tenants ──────────────────────────────────────────────────────────────────
export const MOCK_TENANTS: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'FastFleet Warsaw',
    plan: 'pro',
    createdAt: '2024-01-15',
    isActive: true,
    adminCount: 2,
    driverCount: 18,
    carCount: 22,
  },
  {
    id: 'tenant-2',
    name: 'CityDrive Gdańsk',
    plan: 'starter',
    createdAt: '2024-03-02',
    isActive: true,
    adminCount: 1,
    driverCount: 7,
    carCount: 9,
  },
  {
    id: 'tenant-3',
    name: 'UrbanWheels Kraków',
    plan: 'enterprise',
    createdAt: '2023-11-10',
    isActive: true,
    adminCount: 4,
    driverCount: 45,
    carCount: 60,
  },
];

// ─── Cars ─────────────────────────────────────────────────────────────────────
export const MOCK_CARS: Car[] = [
  {
    id: 'car-1', tenantId: 'tenant-1', make: 'Toyota', model: 'Camry',
    year: 2022, licensePlate: 'WA 12345', vin: '1HGCM82633A004352',
    status: 'rented', dailyRate: 120, mileage: 45200, fuelType: 'hybrid',
    inspectionDate: '20.05.2027', insuranceDate: '09.09.2026',
    ownerId: 'own-1', assignedDriverId: 'usr-1', createdAt: '2024-01-20',
  }
];

// ─── Drivers ──────────────────────────────────────────────────────────────────
export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'drv-1', tenantId: 'tenant-1', userId: 'usr-1',
    name: 'Jakub Wiśniewski', email: 'driver@fastfleet.com',
    phone: '+48 600 100 200', licenseNumber: 'PL/123456/2019',
    licenseExpiry: '2027-06-30', status: 'active',
    rating: 4.8, totalTrips: 342, tripsBolt: 10, tripsUber: 1, fuel: 10,currentCarId: 'car-1',
    joinedAt: '2024-01-25',
  }
];

// ─── Rentals ──────────────────────────────────────────────────────────────────
export const MOCK_RENTALS: Rental[] = [
  {
    id: 'rent-1', tenantId: 'tenant-1', carId: 'car-1', driverId: 'drv-1',
    startDate: '2025-02-01', dailyRate: 120,
    status: 'active', paymentStatus: 'pending', createdAt: '2025-02-01',
  },
  {
    id: 'rent-2', tenantId: 'tenant-1', carId: 'car-2', driverId: 'drv-2',
    startDate: '2025-01-10', endDate: '2025-01-31',
    dailyRate: 100, totalAmount: 2100,
    status: 'completed', paymentStatus: 'paid', createdAt: '2025-01-10',
  },
];

// ─── Payments ─────────────────────────────────────────────────────────────────
export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1', tenantId: 'tenant-1', rentalId: 'rent-1',
    driverId: 'drv-1', amount: 1000, dueDate: '2025-03-01',
    status: 'pending', createdAt: '2025-02-01',
  },
  {
    id: 'pay-2', tenantId: 'tenant-1', rentalId: 'rent-2',
    driverId: 'drv-2', amount: 2100, dueDate: '2025-02-05',
    paidDate: '2025-02-04', status: 'paid', method: 'transfer',
    createdAt: '2025-01-10',
  },
];

// ─── Visibility Config ────────────────────────────────────────────────────────
export const MOCK_VISIBILITY_CONFIG: VisibilityConfig = {
  tenantId: 'tenant-1',
  driverPortal: {
    showCarDetails: true,
    showOwnerContact: false,
    showPaymentHistory: true,
    showOtherDrivers: false,
    showFleetStats: false,
    showRentalTerms: true,
    showMaintenanceSchedule: true,
  },
  notifications: {
    emailOnPaymentDue: true,
    emailOnRentalEnd: true,
    smsOnPaymentDue: false,
  },
  updatedAt: '2025-03-01T10:00:00Z',
  updatedBy: 'adm-1',
};

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const MOCK_STATS: DashboardStats = {
  totalRevenue: 48200,
  activeRentals: 14,
  availableCars: 6,
  totalDrivers: 18,
  overduePayments: 3,
  revenueChange: 12.4,
};

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { month: 'Oct', revenue: 31000, rentals: 9 },
  { month: 'Nov', revenue: 36500, rentals: 11 },
  { month: 'Dec', revenue: 29000, rentals: 8 },
  { month: 'Jan', revenue: 41200, rentals: 13 },
  { month: 'Feb', revenue: 44800, rentals: 15 },
  { month: 'Mar', revenue: 48200, rentals: 14 },
];
