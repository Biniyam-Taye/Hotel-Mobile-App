import React, { useState } from 'react';
import './TopNavPages.css';
import { Briefcase, Key, Wind, Trash2 } from 'lucide-react';

const Manage = () => {
  // Mock Database State
  const [rooms] = useState([
    { number: '101', type: 'Standard', status: 'Clean', icon: Key, color: 'badge-green' },
    { number: '102', type: 'Standard', status: 'Occupied', icon: Key, color: 'badge-blue' },
    { number: '103', type: 'Suite', status: 'Dirty', icon: Trash2, color: 'badge-orange' },
    { number: '104', type: 'Suite', status: 'Out of Order', icon: Wind, color: 'badge-red' },
    { number: '105', type: 'Deluxe', status: 'Clean', icon: Key, color: 'badge-green' },
    { number: '106', type: 'Deluxe', status: 'Clean', icon: Key, color: 'badge-green' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#fa5a2a' }}>
        <div className="topnav-icon-wrap">
          <Briefcase size={32} />
        </div>
        <div className="topnav-title">
          <h1>Management Console</h1>
          <p>Centralized control for properties, staff, and policies.</p>
        </div>
      </div>

      <div className="topnav-content">
        <h3 style={{ color: 'var(--text-dark)', marginTop: '10px' }}>Live Room Status</h3>
        <div className="topnav-grid">
          {rooms.map((room) => {
            const Icon = room.icon;
            return (
              <div key={room.number} className="topnav-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className={`topnav-badge ${room.color}`} style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', padding: 0 }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Room {room.number}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-light)' }}>{room.type}</p>
                  </div>
                </div>
                <span className={`topnav-badge ${room.color}`}>{room.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Manage;
