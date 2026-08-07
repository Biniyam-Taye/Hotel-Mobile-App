import React, { useState } from 'react';
import './TopNavPages.css';
import { AlertCircle, Server, Database, ShieldAlert } from 'lucide-react';

const Alerts = () => {
  const [metrics] = useState([
    { name: 'Server Health', status: 'Optimal', icon: Server, color: 'badge-green', load: '32%' },
    { name: 'Database API', status: 'Warning', icon: Database, color: 'badge-orange', load: '85%' },
    { name: 'Firewall', status: 'Critical', icon: ShieldAlert, color: 'badge-red', load: '100%' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#e74c3c' }}>
        <div className="topnav-icon-wrap">
          <AlertCircle size={32} />
        </div>
        <div className="topnav-title">
          <h1>System Alerts</h1>
          <p>Critical infrastructure and security notifications.</p>
        </div>
      </div>

      <div className="topnav-content">
        <h3 style={{ color: 'var(--text-dark)', marginTop: '10px' }}>Infrastructure Status</h3>
        <div className="topnav-grid">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} className="topnav-card" style={{ borderTop: `4px solid ${metric.status === 'Optimal' ? '#2ecc71' : metric.status === 'Warning' ? '#f39c12' : '#e74c3c'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--text-light)' }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{ margin: 0 }}>{metric.name}</h3>
                  </div>
                  <span className={`topnav-badge ${metric.color}`}>{metric.status}</span>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-light)' }}>
                    <span>Current Load</span>
                    <strong>{metric.load}</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: metric.load, height: '100%', 
                      background: metric.status === 'Optimal' ? '#2ecc71' : metric.status === 'Warning' ? '#f39c12' : '#e74c3c' 
                    }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
