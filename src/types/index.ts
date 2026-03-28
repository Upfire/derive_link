// ─── Roles ────────────────────────────────────────────────────────────────────
export type UserRole = 'superadmin' | 'admin' | 'user';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  tenantId?: string; // null for superadmin
}

// ─── Tenant (each "fleet company" is a tenant) ────────────────────────────────
export interface Tenant {
  id: string;
  name: string;
  logoUrl?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
  isActive: boolean;
  adminCount: number;
  driverCount: number;
  carCount: number;
}

// ─── Car ──────────────────────────────────────────────────────────────────────
export interface Car {
  id: string;
  tenantId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: 'available' | 'rented' | 'maintenance' | 'inactive';
  dailyRate: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  imageUrl?: string;
  ownerId: string; // references a user with role 'user' (owner)
  assignedDriverId?: string;
  createdAt: string;
}

// ─── Driver / User ────────────────────────────────────────────────────────────
export interface Driver {
  id: string;
  tenantId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  totalTrips: number;
  tripsBolt: number;
  tripsUber: number;
  currentCarId?: string;
  joinedAt: string;
}

// ─── Rental ───────────────────────────────────────────────────────────────────
export interface Rental {
  id: string;
  tenantId: string;
  carId: string;
  driverId: string;
  startDate: string;
  endDate?: string;
  dailyRate: number;
  totalAmount?: number;
  status: 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'overdue';
  notes?: string;
  createdAt: string;
}

// ─── Payment ──────────────────────────────────────────────────────────────────
export interface Payment {
  id: string;
  tenantId: string;
  rentalId: string;
  driverId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  boltAmount?: string;
  uberAmount?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  method?: 'card' | 'transfer' | 'cash';
  createdAt: string;
}

// ─── Admin Panel Visibility Config ────────────────────────────────────────────
// Admins configure exactly which data fields are visible to drivers (users)
export interface VisibilityConfig {
  tenantId: string;
  driverPortal: {
    showCarDetails: boolean;
    showOwnerContact: boolean;
    showPaymentHistory: boolean;
    showOtherDrivers: boolean;
    showFleetStats: boolean;
    showRentalTerms: boolean;
    showMaintenanceSchedule: boolean;
  };
  notifications: {
    emailOnPaymentDue: boolean;
    emailOnRentalEnd: boolean;
    smsOnPaymentDue: boolean;
  };
  updatedAt: string;
  updatedBy: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  totalRevenue: number;
  activeRentals: number;
  availableCars: number;
  totalDrivers: number;
  overduePayments: number;
  revenueChange: number; // percent vs last month
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  rentals: number;
}
