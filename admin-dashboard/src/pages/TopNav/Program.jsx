import React, { useState } from 'react';
import './TopNavPages.css';
import { Layers, Star, Award, Gift } from 'lucide-react';

const Program = () => {
  const [members] = useState([
    { name: 'Sajibur Rahman', tier: 'Platinum', points: '125,000', joined: '2021', icon: Star, color: 'badge-purple' },
    { name: 'Alice Smith', tier: 'Gold', points: '45,200', joined: '2023', icon: Award, color: 'badge-orange' },
    { name: 'Bob Johnson', tier: 'Silver', points: '12,500', joined: '2024', icon: Gift, color: 'badge-blue' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#8b5cf6' }}>
        <div className="topnav-icon-wrap">
          <Layers size={32} />
        </div>
        <div className="topnav-title">
          <h1>Program Details</h1>
          <p>Manage loyalty programs, partnerships, and campaigns.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-grid">
          <div className="topnav-card" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white' }}>
            <h3 style={{ color: 'white' }}><Star size={18} /> Platinum Members</h3>
            <div className="topnav-stat" style={{ color: 'white' }}>1,245</div>
            <div className="topnav-trend" style={{ color: '#ddd' }}>+12% this year</div>
          </div>
          <div className="topnav-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' }}>
            <h3 style={{ color: 'white' }}><Award size={18} /> Gold Members</h3>
            <div className="topnav-stat" style={{ color: 'white' }}>4,820</div>
            <div className="topnav-trend" style={{ color: '#ddd' }}>+8% this year</div>
          </div>
          <div className="topnav-card" style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)', color: 'white' }}>
            <h3 style={{ color: 'white' }}><Gift size={18} /> Silver Members</h3>
            <div className="topnav-stat" style={{ color: 'white' }}>12,900</div>
            <div className="topnav-trend" style={{ color: '#ddd' }}>+24% this year</div>
          </div>
        </div>

        <div className="topnav-table-wrap">
          <table className="topnav-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Tier</th>
                <th>Points Balance</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => {
                const Icon = member.icon;
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className={`topnav-badge ${member.color}`} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', padding: 0 }}>
                          <Icon size={16} />
                        </div>
                        <strong>{member.name}</strong>
                      </div>
                    </td>
                    <td><span className={`topnav-badge ${member.color}`}>{member.tier}</span></td>
                    <td><strong>{member.points}</strong> pts</td>
                    <td>{member.joined}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Program;
