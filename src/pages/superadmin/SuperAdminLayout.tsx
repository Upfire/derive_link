import { LayoutDashboard, Building2, Users, Settings, CreditCard } from 'lucide-react';
import { DashLayout } from '@/components/layout/DashLayout';
import type { NavItem } from '@/components/layout/Sidebar';

const navItems: NavItem[] = [
  { label: 'Dashboard',  to: '/superadmin',          icon: LayoutDashboard },
  { label: 'Tenants',    to: '/superadmin/tenants',   icon: Building2 },
  { label: 'Users',      to: '/superadmin/users',     icon: Users },
  { label: 'Billing',    to: '/superadmin/billing',   icon: CreditCard },
  { label: 'Settings',   to: '/superadmin/settings',  icon: Settings },
];

const titleMap: Record<string, string> = {
  '/superadmin/tenants':  'Tenant Management',
  '/superadmin/users':    'All Users',
  '/superadmin/billing':  'Billing & Plans',
  '/superadmin/settings': 'Platform Settings',
  '/superadmin':          'Platform Overview',
};

export default function SuperAdminLayout() {
  return <DashLayout navItems={navItems} titleMap={titleMap} />;
}
