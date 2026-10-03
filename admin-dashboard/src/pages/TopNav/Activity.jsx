import React, { useState } from 'react';
import './TopNavPages.css';
import { Activity as ActivityIcon, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Activity = () => {
  // Mock Database State
  const [activities] = useState([
    { id: 1, type: 'Check-in', user: 'Mike Johnson', time: '10 mins ago', desc: 'Checked into Room 302', icon: CheckCircle, color: 'badge-green' },
    { id: 2, type: 'Maintenance', user: 'System', time: '1 hour ago', desc: 'AC repair completed in Room 104', icon: CheckCircle, color: 'badge-blue' },
    { id: 3, type: 'Booking', user: 'Online Portal', time: '2 hours ago', desc: 'New reservation for 3 nights (ID: BK-1032)', icon: Clock, color: 'badge-purple' },
    { id: 4, type: 'Alert', user: 'Front Desk', time: '5 hours ago', desc: 'Guest complaint regarding noise on Floor 4', icon: AlertTriangle, color: 'badge-red' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#2ecc71' }}>
        <div className="topnav-icon-wrap">
          <ActivityIcon size={32} />
        </div>
        <div className="topnav-title">
          <h1>Recent Activity</h1>
          <p>Live feed of user actions, bookings, and system events.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-table-wrap" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>Activity Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                  <div className={`topnav-badge ${act.color}`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', padding: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-dark)' }}>{act.type}</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-light)' }}>{act.desc} &mdash; <strong>{act.user}</strong></p>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 500 }}>
                    {act.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
