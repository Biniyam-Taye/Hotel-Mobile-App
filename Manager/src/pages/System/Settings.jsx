import React, { useState } from 'react';
import {
  User, Bell, Shield, Globe, CreditCard, Palette,
  Moon, Sun, Monitor, Save, Camera, ChevronRight,
  Mail, Phone, MapPin, Building, Lock, Eye, EyeOff,
  ToggleLeft, ToggleRight
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none',
        background: checked ? '#3b82f6' : '#e5e7eb',
        cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        display: 'block'
      }} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifSettings, setNotifSettings] = useState({
    newBookings: true,
    checkouts: true,
    reviews: true,
    maintenance: false,
    payments: true,
    emailSummary: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{title}</h3>
      {children}
    </div>
  );

  const FormRow = ({ label, hint, children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', padding: '0.75rem 0', borderBottom: '1px solid #f9fafb' }}>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827', margin: 0 }}>{label}</p>
        {hint && <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.2rem 0 0' }}>{hint}</p>}
      </div>
      {children}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', borderRadius: '1rem', marginBottom: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                  alt="Profile"
                  style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                />
                <button style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: '#3b82f6', border: '2px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={12} color="white" />
                </button>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Sarah Jenkins</h2>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#4b5563' }}>General Manager · Villa Alpha International Hotel</p>
              </div>
            </div>

            <Section title="Personal Information">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'First Name', value: 'Sarah' },
                  { label: 'Last Name', value: 'Jenkins' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.4rem', display: 'block' }}>{f.label}</label>
                    <input defaultValue={f.value} style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#111827', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                ))}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.4rem', display: 'block' }}>Job Title</label>
                  <input defaultValue="General Manager" style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#111827', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
            </Section>

            <Section title="Contact Information">
              {[
                { label: 'Email Address', icon: Mail, value: 'sarah.jenkins@villaalpha.com', type: 'email' },
                { label: 'Phone Number', icon: Phone, value: '+251 91 234 5678', type: 'tel' },
                { label: 'Location / Branch', icon: MapPin, value: 'Addis Ababa, Ethiopia', type: 'text' },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} style={{ marginBottom: '0.875rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.4rem', display: 'block' }}>{f.label}</label>
                    <div style={{ position: 'relative' }}>
                      <Icon size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input defaultValue={f.value} type={f.type} style={{ width: '100%', padding: '0.6rem 0.875rem 0.6rem 2.5rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#111827', outline: 'none', fontFamily: 'inherit' }} />
                    </div>
                  </div>
                );
              })}
            </Section>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <Section title="In-App Alerts">
              {[
                { key: 'newBookings', label: 'New Bookings', hint: 'Alert when a new reservation is created' },
                { key: 'checkouts', label: 'Checkout Reminders', hint: 'Remind before room checkouts' },
                { key: 'reviews', label: 'Guest Reviews', hint: 'Notify on new guest reviews' },
                { key: 'maintenance', label: 'Maintenance Requests', hint: 'Notify on facility maintenance tickets' },
                { key: 'payments', label: 'Payment Updates', hint: 'Alerts for incoming payments & refunds' },
              ].map(s => (
                <FormRow key={s.key} label={s.label} hint={s.hint}>
                  <Toggle checked={notifSettings[s.key]} onChange={(v) => setNotifSettings(prev => ({ ...prev, [s.key]: v }))} />
                </FormRow>
              ))}
            </Section>
            <Section title="Email Preferences">
              <FormRow label="Daily Summary Email" hint="Receive a daily recap of all hotel activity">
                <Toggle checked={notifSettings.emailSummary} onChange={(v) => setNotifSettings(prev => ({ ...prev, emailSummary: v }))} />
              </FormRow>
            </Section>
          </div>
        );

      case 'security':
        return (
          <div>
            <Section title="Change Password">
              {[
                { label: 'Current Password', show: showCurrentPass, toggle: () => setShowCurrentPass(v => !v) },
                { label: 'New Password', show: showNewPass, toggle: () => setShowNewPass(v => !v) },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.4rem', display: 'block' }}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type={f.show ? 'text' : 'password'}
                      placeholder="••••••••••"
                      style={{ width: '100%', padding: '0.6rem 2.75rem 0.6rem 2.5rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                    <button type="button" onClick={f.toggle} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                      {f.show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </Section>
            <Section title="Two-Factor Authentication">
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.875rem', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#166534', margin: 0 }}>2FA is Enabled</p>
                  <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: '0.25rem 0 0' }}>Your account is protected with an authenticator app.</p>
                </div>
                <button style={{ padding: '0.4rem 1rem', borderRadius: '0.5rem', border: '1px solid #86efac', background: 'white', color: '#166534', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>Manage</button>
              </div>
            </Section>
            <Section title="Active Sessions">
              {[
                { device: 'Chrome on MacBook Pro', location: 'Addis Ababa, ET', active: true },
                { device: 'Safari on iPhone 15', location: 'Addis Ababa, ET', active: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', background: s.active ? '#eff6ff' : '#f9fafb', borderRadius: '0.625rem', marginBottom: '0.5rem', border: '1px solid ' + (s.active ? '#bfdbfe' : '#f3f4f6') }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '0.875rem', color: '#111827' }}>{s.device}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{s.location} {s.active && '· Current session'}</p>
                  </div>
                  {!s.active && <button style={{ padding: '0.3rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #fca5a5', background: 'white', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer' }}>Revoke</button>}
                </div>
              ))}
            </Section>
          </div>
        );

      case 'appearance':
        return (
          <div>
            <Section title="Theme">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[
                  { id: 'light', label: 'Light', icon: Sun, preview: '#ffffff', border: '#e5e7eb' },
                  { id: 'dark', label: 'Dark', icon: Moon, preview: '#111827', border: '#374151' },
                  { id: 'system', label: 'System', icon: Monitor, preview: 'linear-gradient(to right, #fff 50%, #111827 50%)', border: '#e5e7eb' },
                ].map(t => {
                  const Icon = t.icon;
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      style={{
                        border: isSelected ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                        borderRadius: '0.875rem', padding: '1rem', cursor: 'pointer',
                        background: 'white', textAlign: 'center', transition: 'all 0.15s',
                        boxShadow: isSelected ? '0 0 0 4px rgba(59,130,246,0.1)' : 'none'
                      }}
                    >
                      <div style={{ width: '100%', height: 60, borderRadius: '0.5rem', background: t.preview, border: '1px solid ' + t.border, marginBottom: '0.75rem' }} />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        <Icon size={15} color={isSelected ? '#3b82f6' : '#6b7280'} />
                        <span style={{ fontSize: '0.875rem', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#3b82f6' : '#374151' }}>{t.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>
            <Section title="Density">
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['Comfortable', 'Compact'].map(d => (
                  <button key={d} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', background: d === 'Comfortable' ? '#f0f9ff' : 'white', borderColor: d === 'Comfortable' ? '#3b82f6' : '#e5e7eb', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, color: d === 'Comfortable' ? '#3b82f6' : '#6b7280' }}>
                    {d}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        );

      case 'billing':
        return (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d6a9f)', borderRadius: '1.25rem', padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Plan</p>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>Professional</h2>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.875rem' }}>Unlimited rooms · Priority support · Advanced analytics</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button style={{ padding: '0.5rem 1.25rem', borderRadius: '0.625rem', background: 'white', color: '#1e3a5f', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Upgrade Plan</button>
                <button style={{ padding: '0.5rem 1.25rem', borderRadius: '0.625rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.875rem' }}>Manage Billing</button>
              </div>
            </div>
            <Section title="Billing History">
              {[
                { invoice: 'INV-2026-08', amount: 'ETB 2,400', date: 'Aug 1, 2026', status: 'Paid' },
                { invoice: 'INV-2026-07', amount: 'ETB 2,400', date: 'Jul 1, 2026', status: 'Paid' },
                { invoice: 'INV-2026-06', amount: 'ETB 2,400', date: 'Jun 1, 2026', status: 'Paid' },
              ].map(b => (
                <div key={b.invoice} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '0.875rem', color: '#111827' }}>{b.invoice}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>{b.date}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{b.amount}</span>
                    <span style={{ padding: '0.2rem 0.65rem', borderRadius: '9999px', background: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 600 }}>{b.status}</span>
                    <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>Download</button>
                  </div>
                </div>
              ))}
            </Section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="dashboard-section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        <Shield size={24} style={{ color: '#3b82f6' }} /> Settings
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Sidebar Tabs */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', position: 'sticky', top: 0 }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  width: '100%', padding: '0.7rem 0.875rem',
                  borderRadius: '0.625rem', border: 'none',
                  background: isActive ? '#111827' : 'transparent',
                  color: isActive ? 'white' : '#6b7280',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: isActive ? 600 : 500,
                  textAlign: 'left', marginBottom: '0.2rem', transition: 'all 0.15s',
                }}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
          {renderContent()}

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
            <button className="secondary-btn">Discard Changes</button>
            <button className="primary-btn" onClick={handleSave} style={{ background: saved ? '#16a34a' : '#3b82f6', transition: 'background 0.3s' }}>
              <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
