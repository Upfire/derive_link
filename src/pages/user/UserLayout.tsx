import { LayoutDashboard, Car, DollarSign, FileText } from 'lucide-react';
import { DashLayout } from '@/components/layout/DashLayout';
import type { NavItem } from '@/components/layout/Sidebar';

const navItems: NavItem[] = [
  { label: 'My Dashboard', to: '/portal',          icon: LayoutDashboard },
  { label: 'Payments',     to: '/portal/payments',  icon: DollarSign }
];

const titleMap: Record<string, string> = {
  '/portal/car':      'My Vehicle',
  '/portal/payments': 'My Payments',
  '/portal/rental':   'Rental Information',
  '/portal':          'My Dashboard',
};

export default function UserLayout() {
  return <DashLayout navItems={navItems} titleMap={titleMap} />;
}
