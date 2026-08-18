import React from 'react';
import {
  DoorOpen, Users, CalendarCheck, TrendingUp, BarChart3,
  ArrowUpRight, ArrowDownRight, Star, BedDouble, CreditCard,
  Clock, CheckCircle, AlertCircle, Utensils, Waves, Car
} from 'lucide-react';

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const kpiCards = [
  {
    label: 'Total Rooms',
    value: '124',
    sub: '89 occupied · 35 free',
    trend: null,
    icon: BedDouble,
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    chart: [60, 65, 75, 70, 85, 90, 89],
  },
  {
    label: 'Check-ins Today',
    value: '14',
    sub: '3 arrivals pending',
    trend: '+2',
    positive: true,
    icon: CalendarCheck,
    gradient: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    chart: [8, 12, 15, 10, 18, 22, 14],
  },
  {
    label: 'Occupancy Rate',
    value: '71.7%',
    sub: 'Monthly avg: 68.4%',
    trend: '+3.3%',
    positive: true,
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    chart: [62, 65, 68, 64, 70, 75, 71.7],
  },
];

const secondaryStats = [
  { label: 'Check-outs Today', value: 9, icon: DoorOpen, color: '#fee2e2', iconColor: '#dc2626' },
  { label: 'Pending Bookings', value: 5, icon: AlertCircle, color: '#fef3c7', iconColor: '#b45309' },
  { label: 'Guests In-House', value: 203, icon: Users, color: '#dbeafe', iconColor: '#1d4ed8' },
  { label: 'Avg. Rating', value: '4.6 ★', icon: Star, color: '#fce7f3', iconColor: '#9d174d' },
];

const reservations = [
  { name: 'Michael & Emma Smith', room: 'Deluxe Ocean Suite', nights: 3, time: '14:00', status: 'arriving', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=40&q=80' },
  { name: 'David Chen', room: 'Executive Suite', nights: 1, time: '11:00', status: 'checkedin', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=40&q=80' },
  { name: 'Johnson Family (4)', room: 'Family Connecting Room', nights: 5, time: '11:00', status: 'checkout', avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=40&q=80' },
  { name: 'Sophie Laurent', room: 'Garden View Room', nights: 2, time: '16:00', status: 'arriving', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80' },
];

const recentBookings = [
  { name: 'Dawit Bekele', booking: '#BK-9244', dates: 'Aug 20 – Aug 24', amount: 'ETB 4,800', paid: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80' },
  { name: 'Elena Rodriguez', booking: '#BK-9243', dates: 'Sep 2 – Sep 7', amount: 'ETB 6,200', paid: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80' },
  { name: 'James Wilson', booking: '#BK-9242', dates: 'Sep 10 – Sep 12', amount: 'ETB 2,400', paid: false, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80' },
  { name: 'Amara Selassie', booking: '#BK-9241', dates: 'Sep 15 – Sep 18', amount: 'ETB 3,100', paid: true, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=40&q=80' },
];

const recentReviews = [
  { name: 'Amanda Taylor', time: 'Today, 9:24 AM', rating: 5, text: 'Absolutely wonderful stay! The room was spotless and the ocean view was breathtaking.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80' },
  { name: 'Robert Johnson', time: 'Yesterday', rating: 4, text: 'Very good experience overall. The spa is highly recommended and staff are super friendly.', avatar: null, initials: 'RJ' },
  { name: 'Peter Wong', time: 'Aug 8, 2026', rating: 5, text: 'Best business hotel in the city. Executive lounge was perfect and wi-fi worked flawlessly.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=40&q=80' },
];

const services = [
  { label: 'Restaurant', bookings: 24, icon: Utensils, color: '#dbeafe', iconColor: '#1d4ed8' },
  { label: 'Pool / Spa', bookings: 18, icon: Waves, color: '#dcfce7', iconColor: '#065f46' },
  { label: 'Transfers', bookings: 7, icon: Car, color: '#fef3c7', iconColor: '#b45309' },
];

const statusStyle = {
  arriving:  { bg: '#dbeafe', color: '#1d4ed8', label: 'Arriving' },
  checkedin: { bg: '#dcfce7', color: '#065f46', label: 'Checked In' },
  checkout:  { bg: '#fee2e2', color: '#b91c1c', label: 'Checkout' },
};

function StarRow({ n }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill={i < n ? '#fbbf24' : 'none'} color={i < n ? '#fbbf24' : '#e5e7eb'} />
      ))}
    </div>
  );
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const occupancyData = [62, 70, 75, 68, 80, 90, 72];
const revenueData   = [5200, 6800, 7400, 6100, 8240, 9500, 7800];
const maxRev = Math.max(...revenueData);

export default function DashboardOverview() {
  return (
    <section className="dashboard-section" style={{ paddingBottom: '3rem' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>{today}</p>
      </div>

      {/* KPI Cards (gradient) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
        {kpiCards.map(c => {
          const Icon = c.icon;
          return (
            <div key={c.label} style={{ borderRadius: '1.25rem', padding: '1.5rem', background: c.gradient, color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
              
              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}>{c.value}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.75, marginTop: '0.3rem' }}>{c.label}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.2rem' }}>{c.sub}</div>
                </div>
              </div>

              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {c.trend ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600 }}>
                    {c.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {c.trend}
                  </div>
                ) : <div />}
                
                {/* Mini Bar Chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                  {c.chart.map((val, i) => {
                    const max = Math.max(...c.chart);
                    const height = (val / max) * 100;
                    return (
                      <div key={i} style={{ width: '6px', height: `${height}%`, background: 'rgba(255,255,255,0.4)', borderRadius: '3px' }} />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {secondaryStats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: 'white', borderRadius: '1rem', padding: '1rem 1.25rem', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.875rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={s.iconColor} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.73rem', color: '#9ca3af', marginTop: '0.2rem' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Charts + Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* Weekly Occupancy Bar Chart */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Weekly Occupancy</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: '#d1fae5', padding: '0.2rem 0.7rem', borderRadius: '9999px' }}>Avg 74%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 120 }}>
            {occupancyData.map((pct, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 500 }}>{pct}%</span>
                <div style={{ width: '100%', borderRadius: '0.4rem 0.4rem 0 0', height: `${(pct / 100) * 90}px`, background: i === 4 ? 'linear-gradient(180deg,#3b82f6,#1d4ed8)' : '#e0f2fe', transition: 'height 0.4s ease' }} />
                <span style={{ fontSize: '0.68rem', color: '#6b7280' }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Status Overview */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Room Status Overview</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', background: '#eff6ff', padding: '0.2rem 0.7rem', borderRadius: '9999px' }}>124 Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Clean & Ready', value: 62, color: '#10b981' },
              { label: 'Clean (Needs Inspection)', value: 24, color: '#3b82f6' },
              { label: 'Occupied / Dirty', value: 35, color: '#f59e0b' },
              { label: 'Out of Order', value: 3, color: '#ef4444' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: '0.825rem', color: '#4b5563', fontWeight: 500 }}>{s.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', width: '20px', textAlign: 'right' }}>{s.value}</span>
                  <div style={{ width: 60, height: 6, borderRadius: 3, background: '#f3f4f6', overflow: 'hidden' }}>
                    <div style={{ width: `${(s.value / 124) * 100}%`, height: '100%', background: s.color, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: '1.25rem' }}>

        {/* Today's Reservations */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Today's Reservations</h3>
            <span style={{ fontSize: '0.78rem', color: '#3b82f6', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {reservations.map((r, i) => {
              const s = statusStyle[r.status];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem', borderRadius: '0.75rem', background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                  <img src={r.avatar} alt={r.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.825rem', fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                    <p style={{ margin: '0.1rem 0 0', fontSize: '0.72rem', color: '#9ca3af' }}>{r.room} · {r.nights}N</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ background: s.bg, color: s.color, fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.6rem', borderRadius: '9999px', marginBottom: '0.2rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.68rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.2rem', justifyContent: 'flex-end' }}><Clock size={10} />{r.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Bookings */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Recent Bookings</h3>
            <span style={{ fontSize: '0.78rem', color: '#3b82f6', fontWeight: 500, cursor: 'pointer' }}>Manage</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentBookings.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.7rem 0', borderBottom: i < recentBookings.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <img src={b.avatar} alt={b.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.825rem', fontWeight: 600, color: '#111827' }}>{b.name}</p>
                  <p style={{ margin: '0.1rem 0 0', fontSize: '0.7rem', color: '#9ca3af' }}>{b.booking} · {b.dates}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: b.paid ? '#059669' : '#f59e0b', padding: '0.2rem 0.6rem', background: b.paid ? '#d1fae5' : '#fef3c7', borderRadius: '9999px' }}>{b.paid ? '✓ Paid' : '⧖ Deposit'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Reviews + Services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Active Services */}
          <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>Today's Services</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {services.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color={s.iconColor} />
                    </div>
                    <span style={{ flex: 1, fontSize: '0.825rem', color: '#374151' }}>{s.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 70, height: 5, borderRadius: 3, background: '#f3f4f6', overflow: 'hidden' }}>
                        <div style={{ width: `${(s.bookings / 30) * 100}%`, height: '100%', background: s.iconColor, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', width: 18, textAlign: 'right' }}>{s.bookings}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reviews */}
          <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', flex: 1 }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>Recent Reviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {recentReviews.map((r, i) => (
                <div key={i} style={{ padding: '0.875rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                    {r.avatar
                      ? <img src={r.avatar} alt={r.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                      : <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#6b7280' }}>{r.initials}</div>
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '0.775rem', fontWeight: 600, color: '#111827' }}>{r.name}</p>
                      <p style={{ margin: 0, fontSize: '0.65rem', color: '#9ca3af' }}>{r.time}</p>
                    </div>
                    <StarRow n={r.rating} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.775rem', color: '#4b5563', lineHeight: 1.5 }}>"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
