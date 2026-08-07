import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Search, Bell, AlertCircle, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink to="/top/overview" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Overview</NavLink>
        <NavLink to="/top/activity" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Activity</NavLink>
        <NavLink to="/top/manage" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Manage</NavLink>
        <NavLink to="/top/program" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Program</NavLink>
        <NavLink to="/top/account" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Account</NavLink>
        <NavLink to="/top/reports" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Reports</NavLink>
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
        
        <div className="user-profile">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="avatar" />
          <div className="user-info">
            <span className="user-name">Sajibur Rahman</span>
            <span className="user-email">sajibur.rahman@gm...</span>
          </div>
          <ChevronDown size={16} className="text-light" />
        </div>
      </div>
    </header>
  );
};

export default Header;
