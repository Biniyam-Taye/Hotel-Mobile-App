import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Search, Bell, AlertCircle, ChevronDown, LogOut } from 'lucide-react';

const Header = ({ adminUser, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const name = adminUser
    ? `${adminUser.firstName} ${adminUser.lastName}`
    : 'Hotel Owner';

  const initials = adminUser
    ? (adminUser.firstName?.[0] || '') + (adminUser.lastName?.[0] || '')
    : 'HO';

  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink to="/top/overview" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Overview</NavLink>
        <NavLink to="/top/activity" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Activity</NavLink>
        <NavLink to="/top/manage"   className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Manage</NavLink>
        <NavLink to="/top/program"  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Program</NavLink>
        <NavLink to="/top/account"  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Account</NavLink>
        <NavLink to="/top/reports"  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Reports</NavLink>
      </nav>
      
      <div className="header-actions">
        <div className="action-icons">
          <NavLink to="/top/search" className={({isActive}) => `icon-btn ${isActive ? 'active-icon' : ''}`}>
            <Search size={22} />
          </NavLink>
          <NavLink to="/top/notifications" className={({isActive}) => `icon-btn position-relative ${isActive ? 'active-icon' : ''}`}>
            <Bell size={22} />
            <span className="notification-dot"></span>
          </NavLink>
          <NavLink to="/top/alerts" className={({isActive}) => `icon-btn ${isActive ? 'active-icon' : ''}`}>
            <AlertCircle size={22} />
          </NavLink>
        </div>
        
        {/* Admin profile / logout */}
        <div className="user-profile" style={{ position: 'relative', cursor: 'pointer' }}
          onClick={() => setProfileOpen(o => !o)}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #fa5a2a, #ff8c5a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0
          }}>
            {initials}
          </div>
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-email">Hotel Owner</span>
          </div>
          <ChevronDown size={16} className="text-light" />

          {/* Dropdown */}
          {profileOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'white', borderRadius: 12, minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 999,
              border: '1px solid #f0f0f0', overflow: 'hidden'
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); onLogout && onLogout(); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', border: 'none', background: 'none',
                  cursor: 'pointer', color: '#ef4444', fontWeight: 600, fontSize: 14,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
