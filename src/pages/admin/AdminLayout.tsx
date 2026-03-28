import { LayoutDashboard, Car, Users, DollarSign, Settings } from 'lucide-react';
import { DashLayout } from '@/components/layout/DashLayout';
import type { NavItem } from '@/components/layout/Sidebar';

const navItems: NavItem[] = [
  { label: 'Dashboard',  to: '/admin',           icon: LayoutDashboard },
  { label: 'Cars',       to: '/admin/cars',       icon: Car },
  { label: 'Drivers',    to: '/admin/drivers',    icon: Users },
  { label: 'Payments',   to: '/admin/payments',   icon: DollarSign },
  { label: 'Settings',   to: '/admin/settings',   icon: Settings },
];

const titleMap: Record<string, string> = {
  '/admin/cars':     'Fleet — Cars',
  '/admin/drivers':  'Fleet — Drivers',
  '/admin/payments': 'Payments',
  '/admin/settings': 'Portal Settings',
  '/admin':          'Dashboard',
};

export default function AdminLayout() {
  return <DashLayout navItems={navItems} titleMap={titleMap} />;
}
