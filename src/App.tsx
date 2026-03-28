import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { VisibilityProvider } from '@/context/VisibilityContext';
import { RequireAuth } from '@/components/auth/RequireAuth';

// Auth
import LoginPage from '@/pages/auth/LoginPage';

// SuperAdmin
import SuperAdminLayout from '@/pages/superadmin/SuperAdminLayout';
import SuperAdminDashboard from '@/pages/superadmin/SuperAdminDashboard';
import SuperAdminTenants from '@/pages/superadmin/SuperAdminTenants';

// Admin
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCars from '@/pages/admin/AdminCars';
import AdminDrivers from '@/pages/admin/AdminDrivers';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminSettings from '@/pages/admin/AdminSettings';

// User / Driver portal
import UserLayout from '@/pages/user/UserLayout';
import UserDashboard from '@/pages/user/UserDashboard';
import UserCar from '@/pages/user/UserCar';
import UserPayments from '@/pages/user/UserPayments';
import UserRental from '@/pages/user/UserRental';

export default function App() {
  return (
    <AuthProvider>
      <VisibilityProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* SuperAdmin */}
            <Route
              path="/superadmin"
              element={
                <RequireAuth allowedRoles={['superadmin']}>
                  <SuperAdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<SuperAdminDashboard />} />
              <Route path="tenants" element={<SuperAdminTenants />} />
              {/* Placeholder routes — easy to extend */}
              <Route path="users" element={<div className="text-surface-400 font-body p-4">Users management — coming soon</div>} />
              <Route path="billing" element={<div className="text-surface-400 font-body p-4">Billing — coming soon</div>} />
              <Route path="settings" element={<div className="text-surface-400 font-body p-4">Platform settings — coming soon</div>} />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Driver / User portal */}
            <Route
              path="/portal"
              element={
                <RequireAuth allowedRoles={['user']}>
                  <UserLayout />
                </RequireAuth>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="car" element={<UserCar />} />
              <Route path="payments" element={<UserPayments />} />
              <Route path="rental" element={<UserRental />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </VisibilityProvider>
    </AuthProvider>
  );
}
