import React, { useState } from 'react';
import './TopNavPages.css';
import { Server, Database, ShieldAlert, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const Alerts = () => {
  const [metrics] = useState([
    { id: 1, name: 'Server Health', desc: 'Main application cluster', status: 'Optimal', icon: Server, statusIcon: CheckCircle, color: '#10b981', time: 'Updated just now' },
    { id: 2, name: 'Database API', desc: 'Read/Write operations latency', status: 'Warning', icon: Database, statusIcon: AlertTriangle, color: '#f59e0b', time: 'Updated 2 mins ago' },
    { id: 3, name: 'Firewall', desc: 'Inbound traffic inspection', status: 'Critical', icon: ShieldAlert, statusIcon: XCircle, color: '#ef4444', time: 'Updated 5 mins ago' },
  ]);

  return (
    <div className="topnav-page" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>System Status</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-light)' }}>Monitor your core infrastructure and security alerts.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {metrics.map((metric) => {
          const MainIcon = metric.icon;
          const StatusIcon = metric.statusIcon;
          
          return (
            <div key={metric.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '24px', 
              background: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              border: '1px solid #f1f5f9',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '48px', height: '48px', 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-dark)'
                }}>
                  <MainIcon size={24} />
                </div>
                
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)' }}>
                    {metric.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)' }}>
                    {metric.desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                  {metric.time}
                </span>
                
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  padding: '8px 16px', 
                  borderRadius: '30px', 
                  background: `${metric.color}15`, // 15% opacity background
                  color: metric.color,
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  <StatusIcon size={16} />
                  {metric.status}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Alerts;
