import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, type NavItem } from './Sidebar';
import { HeaderBar } from './HeaderBar';

interface DashLayoutProps {
  navItems: NavItem[];
  titleMap: Record<string, string>;
  defaultTitle?: string;
}

export function DashLayout({ navItems, titleMap, defaultTitle = 'Dashboard' }: DashLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Find best matching title
  const title = Object.entries(titleMap)
    .filter(([path]) => pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? defaultTitle;

  return (
    <div className="flex min-h-screen bg-surface-900 text-white font-body">
      <Sidebar items={navItems} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
