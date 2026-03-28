import { Menu, Bell } from 'lucide-react';

interface HeaderBarProps {
  title: string;
  onMenuClick: () => void;
}

export function HeaderBar({ title, onMenuClick }: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface-900/80 backdrop-blur border-b border-surface-600 px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-surface-400 hover:text-white p-1"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display text-lg font-semibold text-white">{title}</h1>
      </div>
      <button className="relative text-surface-400 hover:text-white p-1">
        <Bell size={18} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-brand-500 rounded-full" />
      </button>
    </header>
  );
}
