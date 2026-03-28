import { useVisibility } from '@/context/VisibilityContext';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Bell, Save, Zap } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-surface-700 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${value ? 'text-brand-400' : 'text-surface-500'}`}>
          {value ? <Eye size={16} /> : <EyeOff size={16} />}
        </div>
        <div>
          <p className="text-sm font-body font-medium text-white">{label}</p>
          <p className="text-xs font-body text-surface-400 mt-0.5">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-brand-500' : 'bg-surface-600'}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

export default function AdminSettings() {
  const { config, updateConfig, updateNotifications } = useVisibility();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  // Bolt Fleet credentials
  const [boltClientId, setBoltClientId] = useState('');
  const [boltClientSecret, setBoltClientSecret] = useState('');
  const [boltSaving, setBoltSaving] = useState(false);
  const [boltStatus, setBoltStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const handleBoltSave = async () => {
    if (!boltClientId || !boltClientSecret) return;
    setBoltSaving(true);
    setBoltStatus('idle');
    try {
      await axios.post('/api/bolt/credentials', {
        tenantId: user?.tenantId,
        clientId: boltClientId,
        clientSecret: boltClientSecret,
      });
      setBoltStatus('saved');
      setTimeout(() => setBoltStatus('idle'), 3000);
    } catch {
      setBoltStatus('error');
    } finally {
      setBoltSaving(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const dp = config.driverPortal;
  const notif = config.notifications;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Driver portal visibility */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <Eye size={16} className="text-brand-400" />
          <h2 className="font-display text-base font-semibold text-white">Driver Portal Visibility</h2>
        </div>
        <p className="text-xs text-surface-400 font-body mb-4">
          Control exactly what your drivers can see in their portal. Changes take effect immediately.
        </p>

        <ToggleRow
          label="Car Details"
          description="Show vehicle specs, VIN, and fuel type to the driver"
          value={dp.showCarDetails}
          onChange={v => updateConfig({ showCarDetails: v })}
        />
        <ToggleRow
          label="Owner Contact Info"
          description="Allow drivers to see the car owner's name and contact details"
          value={dp.showOwnerContact}
          onChange={v => updateConfig({ showOwnerContact: v })}
        />
        <ToggleRow
          label="Payment History"
          description="Drivers can view their own payment records and upcoming dues"
          value={dp.showPaymentHistory}
          onChange={v => updateConfig({ showPaymentHistory: v })}
        />
        <ToggleRow
          label="Other Drivers"
          description="Show a list of other drivers in the fleet (names only)"
          value={dp.showOtherDrivers}
          onChange={v => updateConfig({ showOtherDrivers: v })}
        />
        <ToggleRow
          label="Fleet Statistics"
          description="Share high-level fleet metrics with drivers (total cars, avg ratings)"
          value={dp.showFleetStats}
          onChange={v => updateConfig({ showFleetStats: v })}
        />
        <ToggleRow
          label="Rental Terms"
          description="Display the full rental agreement and daily rate breakdown"
          value={dp.showRentalTerms}
          onChange={v => updateConfig({ showRentalTerms: v })}
        />
        <ToggleRow
          label="Maintenance Schedule"
          description="Notify drivers of upcoming vehicle maintenance dates"
          value={dp.showMaintenanceSchedule}
          onChange={v => updateConfig({ showMaintenanceSchedule: v })}
        />
      </div>

      {/* Notifications */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell size={16} className="text-brand-400" />
          <h2 className="font-display text-base font-semibold text-white">Driver Notifications</h2>
        </div>
        <p className="text-xs text-surface-400 font-body mb-4">
          Choose which automated messages drivers receive.
        </p>

        <ToggleRow
          label="Email on Payment Due"
          description="Send an email reminder 3 days before a payment is due"
          value={notif.emailOnPaymentDue}
          onChange={v => updateNotifications({ emailOnPaymentDue: v })}
        />
        <ToggleRow
          label="Email on Rental End"
          description="Notify driver 7 days before their rental period ends"
          value={notif.emailOnRentalEnd}
          onChange={v => updateNotifications({ emailOnRentalEnd: v })}
        />
        <ToggleRow
          label="SMS on Payment Due"
          description="Send an SMS reminder on the day a payment is due"
          value={notif.smsOnPaymentDue}
          onChange={v => updateNotifications({ smsOnPaymentDue: v })}
        />
      </div>

      {/* Bolt Fleet Integration */}
      <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-brand-400" />
          <h2 className="font-display text-base font-semibold text-white">Bolt Fleet Integration</h2>
        </div>
        <p className="text-xs text-surface-400 font-body mb-4">
          Connect your Bolt Fleet account to automatically fetch driver earnings (gross &amp; net).
          Get your credentials from{' '}
          <a href="https://fleets.bolt.eu" target="_blank" rel="noopener noreferrer" className="text-brand-400 underline">
            fleets.bolt.eu
          </a>.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-body text-surface-300 mb-1">Client ID</label>
            <input
              type="text"
              value={boltClientId}
              onChange={e => setBoltClientId(e.target.value)}
              placeholder="Enter Bolt Fleet Client ID"
              className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-sm font-body text-white placeholder-surface-500 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-body text-surface-300 mb-1">Client Secret</label>
            <input
              type="password"
              value={boltClientSecret}
              onChange={e => setBoltClientSecret(e.target.value)}
              placeholder="Enter Bolt Fleet Client Secret"
              className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-sm font-body text-white placeholder-surface-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleBoltSave}
            disabled={boltSaving || !boltClientId || !boltClientSecret}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-semibold bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Save size={14} />
            {boltSaving ? 'Saving...' : 'Connect Bolt Fleet'}
          </button>
          {boltStatus === 'saved' && (
            <span className="text-xs font-body text-emerald-400">Connected successfully!</span>
          )}
          {boltStatus === 'error' && (
            <span className="text-xs font-body text-red-400">Connection failed. Check your credentials.</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold transition ${
          saved ? 'bg-emerald-500 text-white' : 'bg-brand-500 hover:bg-brand-600 text-white'
        }`}
      >
        <Save size={15} />
        {saved ? 'Saved!' : 'Save Changes'}
      </button>

      <p className="text-xs text-surface-500 font-body">
        Last updated: {new Date(config.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
