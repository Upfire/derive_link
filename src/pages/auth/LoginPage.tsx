import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Car, Zap } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Super Admin', email: 'superadmin@drivelink.io', password: 'super123', color: 'from-purple-500 to-purple-700' },
  { label: 'Fleet Admin', email: 'admin@fastfleet.com', password: 'admin123', color: 'from-brand-500 to-brand-700' },
  { label: 'Driver', email: 'driver@fastfleet.com', password: 'driver123', color: 'from-emerald-500 to-emerald-700' },
];

export default function LoginPage() {
  const { user, login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    const map: Record<string, string> = { superadmin: '/superadmin', admin: '/admin', user: '/portal' };
    return <Navigate to={map[user.role] ?? '/'} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  return (
    <div className="min-h-screen bg-surface-900 bg-grid-pattern flex items-center justify-center p-4">
      {/* Glow blobs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
            <Car size={20} className="text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">DriveLink</span>
        </div>

        <div className="bg-surface-800 border border-surface-600 rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-surface-400 font-body text-sm mb-8">Sign in to your fleet dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-surface-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-surface-700 border border-surface-500 text-white rounded-lg px-4 py-2.5 text-sm font-body placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-surface-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-surface-700 border border-surface-500 text-white rounded-lg px-4 py-2.5 text-sm font-body placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-red-400 text-sm font-body">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-display font-semibold py-2.5 rounded-lg transition text-sm tracking-wide"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={12} className="text-surface-400" />
              <span className="text-xs text-surface-400 font-body uppercase tracking-widest">Demo accounts</span>
            </div>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.email}
                  onClick={() => fillDemo(acc)}
                  className="w-full flex items-center gap-3 bg-surface-700 hover:bg-surface-600 border border-surface-600 rounded-lg px-3 py-2 transition group"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${acc.color} flex-shrink-0`} />
                  <span className="font-body text-sm text-surface-300 group-hover:text-white transition">{acc.label}</span>
                  <span className="ml-auto font-mono text-xs text-surface-500">{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
