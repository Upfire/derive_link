import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Car, LogOut, X } from 'lucide-react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: NavItem[];
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ items, mobileOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleColors: Record<string, string> = {
    superadmin: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    admin: 'text-brand-400 bg-brand-500/10 border-brand-500/30',
    user: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-surface-600">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Car size={16} className="text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">DriveLink</span>
        </div>
        <button onClick={onClose} className="lg:hidden text-surface-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* User chip */}
      <div className="px-4 py-4 border-b border-surface-600">
        <div className="flex items-center gap-3 bg-surface-700 rounded-xl p-3">
          <div className="w-8 h-8 rounded-lg bg-surface-600 flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-body font-medium text-white truncate">{user?.name}</p>
            <span className={clsx('text-xs font-mono px-1.5 py-0.5 rounded border capitalize', roleColors[user?.role ?? 'user'])}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to.split('/').length <= 2}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition',
                isActive
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                  : 'text-surface-300 hover:bg-surface-700 hover:text-white'
              )
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-surface-600 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-surface-400 hover:text-red-400 hover:bg-red-500/10 w-full transition"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-surface-800 border-r border-surface-600 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative w-60 bg-surface-800 border-r border-surface-600 h-full flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
