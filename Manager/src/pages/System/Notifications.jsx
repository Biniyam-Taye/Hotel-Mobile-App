import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, BellOff, Calendar, DoorOpen, Star, AlertTriangle, Users, CreditCard } from 'lucide-react';

const allNotifications = [
  {
    id: 1,
    type: 'booking',
    icon: Calendar,
    iconBg: '#dbeafe',
    iconColor: '#1d4ed8',
    title: 'New Booking Confirmed',
    message: 'John Doe has confirmed a booking for Deluxe Ocean Suite — Check-in Aug 20.',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'room',
    icon: DoorOpen,
    iconBg: '#fef3c7',
    iconColor: '#b45309',
    title: 'Room 204 — Checkout Pending',
    message: 'Room 204 checkout is overdue by 2 hours. Guest has not responded to calls.',
    time: '30 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'alert',
    icon: AlertTriangle,
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    title: 'Maintenance Alert',
    message: 'HVAC system in Room 301 has been flagged for urgent maintenance. Please review.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 4,
    type: 'review',
    icon: Star,
    iconBg: '#d1fae5',
    iconColor: '#065f46',
    title: 'New 5-Star Review',
    message: 'A guest left a 5-star review for their stay: "Exceptional service, will be back!"',
    time: '2 hrs ago',
    unread: false,
  },
  {
    id: 5,
    type: 'guest',
    icon: Users,
    iconBg: '#ede9fe',
    iconColor: '#6d28d9',
    title: 'VIP Guest Arriving Tomorrow',
    message: 'Ambassador David Chen is arriving tomorrow. Suite 501 should be prepared by 2 PM.',
    time: '3 hrs ago',
    unread: false,
  },
  {
    id: 6,
    type: 'payment',
    icon: CreditCard,
    iconBg: '#fce7f3',
    iconColor: '#9d174d',
    title: 'Payment Received',
    message: 'Payment of ETB 4,800 received from booking #BK-20248. Transaction successful.',
    time: 'Yesterday',
    unread: false,
  },
];

const filterOptions = ['All', 'Unread', 'Booking', 'Room', 'Alert', 'Review'];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return n.unread;
    return n.type === activeFilter.toLowerCase();
  });

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));
  const markRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  const deleteNotif = (id) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <section className="dashboard-section">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>
            <Bell size={24} style={{ color: '#3b82f6' }} /> Notifications
          </h1>
          {unreadCount > 0 ? (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              You have <span style={{ color: '#3b82f6', fontWeight: 600 }}>{unreadCount} unread</span> notification{unreadCount > 1 ? 's' : ''}
            </p>
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>All caught up!</p>
          )}
        </div>
        <button
          onClick={markAllRead}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#3b82f6', fontWeight: 500, background: 'none', border: '1px solid #bfdbfe', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
        >
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {filterOptions.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: activeFilter === f ? '#111827' : '#f3f4f6',
              color: activeFilter === f ? 'white' : '#6b7280',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9ca3af' }}>
            <BellOff size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No notifications here</h3>
            <p style={{ fontSize: '0.875rem' }}>Try a different filter.</p>
          </div>
        ) : filtered.map(n => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: '1rem',
                background: n.unread ? 'white' : '#f9fafb',
                border: n.unread ? '1px solid #dbeafe' : '1px solid #f3f4f6',
                boxShadow: n.unread ? '0 2px 8px rgba(59,130,246,0.08)' : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Icon */}
              <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: n.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={n.iconColor} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>
                    {n.title}
                    {n.unread && (
                      <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', backgroundColor: '#3b82f6', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                    )}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', flexShrink: 0 }}>{n.time}</span>
                </div>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.825rem', color: '#6b7280', lineHeight: 1.5 }}>{n.message}</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                {n.unread && (
                  <button
                    onClick={() => markRead(n.id)}
                    title="Mark as read"
                    style={{ width: 32, height: 32, borderRadius: '0.5rem', border: 'none', background: '#dbeafe', color: '#1d4ed8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Check size={15} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotif(n.id)}
                  title="Delete"
                  style={{ width: 32, height: 32, borderRadius: '0.5rem', border: 'none', background: 'transparent', color: '#d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
