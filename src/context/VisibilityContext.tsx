import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { VisibilityConfig } from '@/types';
import { MOCK_VISIBILITY_CONFIG } from '@/utils/mockData';

interface VisibilityContextValue {
  config: VisibilityConfig;
  updateConfig: (updates: Partial<VisibilityConfig['driverPortal']>) => void;
  updateNotifications: (updates: Partial<VisibilityConfig['notifications']>) => void;
}

const VisibilityContext = createContext<VisibilityContextValue | null>(null);

export function VisibilityProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<VisibilityConfig>(MOCK_VISIBILITY_CONFIG);

  const updateConfig = useCallback((updates: Partial<VisibilityConfig['driverPortal']>) => {
    setConfig(prev => ({
      ...prev,
      driverPortal: { ...prev.driverPortal, ...updates },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateNotifications = useCallback((updates: Partial<VisibilityConfig['notifications']>) => {
    setConfig(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  return (
    <VisibilityContext.Provider value={{ config, updateConfig, updateNotifications }}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const ctx = useContext(VisibilityContext);
  if (!ctx) throw new Error('useVisibility must be used within VisibilityProvider');
  return ctx;
}
