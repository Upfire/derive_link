import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser } from '@/types';
import { MOCK_USERS, DEMO_CREDENTIALS } from '@/utils/mockData';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('drivelink_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    const expectedPwd = DEMO_CREDENTIALS[email];
    if (!expectedPwd || expectedPwd !== password) {
      setIsLoading(false);
      setError('Invalid email or password.');
      return;
    }
    const found = MOCK_USERS.find(u => u.email === email);
    if (!found) {
      setIsLoading(false);
      setError('User not found.');
      return;
    }
    setUser(found);
    localStorage.setItem('drivelink_user', JSON.stringify(found));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('drivelink_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
