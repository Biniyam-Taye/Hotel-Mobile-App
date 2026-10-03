import React, { useState } from 'react';
import './TopNavPages.css';
import { Bell, MailOpen, Mail } from 'lucide-react';

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, title: 'New VIP Booking', desc: 'Alice Smith booked the Presidential Suite.', time: '10 mins ago', read: false },
    { id: 2, title: 'Payment Failed', desc: 'Invoice INV-0045 payment was declined.', time: '2 hours ago', read: false },
    { id: 3, title: 'Weekly Summary Ready', desc: 'Your weekly performance report is available.', time: '1 day ago', read: true },
    { id: 4, title: 'System Update', desc: 'Server maintenance scheduled for tonight 2AM.', time: '2 days ago', read: true },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#fa5a2a' }}>
        <div className="topnav-icon-wrap">
          <Bell size={32} />
        </div>
        <div className="topnav-title">
          <h1>Notification Center</h1>
          <p>Review alerts, messages, and required actions.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-table-wrap" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((notif) => (
              <div key={notif.id} style={{ 
                display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', 
                background: notif.read ? 'white' : '#fff7ed', 
                borderLeft: notif.read ? '4px solid transparent' : '4px solid var(--primary-orange)',
                border: '1px solid #f1f5f9', borderRadius: '12px' 
              }}>
                <div style={{ color: notif.read ? 'var(--text-light)' : 'var(--primary-orange)', marginTop: '4px' }}>
                  {notif.read ? <MailOpen size={24} /> : <Mail size={24} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-dark)' }}>{notif.title}</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-light)' }}>{notif.desc}</p>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 500 }}>
                  {notif.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
