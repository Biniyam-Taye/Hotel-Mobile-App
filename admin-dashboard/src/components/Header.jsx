import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Search, Bell, AlertCircle, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="top-navigation">
      
      {/* 1. Main Nav Pill */}
      <nav className="nav-pill">
        <NavLink to="/" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`} end>
          Overview
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}>
          Activity
        </NavLink>
        <NavLink to="/team" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}>
          Manage
        </NavLink>
        <NavLink to="/documents" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}>
          Program
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}>
          Account
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}>
          Reports
        </NavLink>
      </nav>
      
      <div className="header-right">
        {/* 2. Icons Pill */}
        <div className="icons-pill">
          <button className="icon-btn">
            <Search size={20} />
          </button>
          <button className="icon-btn position-relative">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <button className="icon-btn">
            <AlertCircle size={20} />
          </button>
        </div>
        
        {/* 3. Profile Pill */}
        <div className="profile-pill">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="profile-avatar" />
          <div className="profile-info">
            <span className="profile-name">Sajibur Rahman</span>
            <span className="profile-email">sajibur.rahman@gm...</span>
          </div>
          <ChevronDown size={14} className="profile-chevron" />
        </div>
      </div>
      
    </header>
  );
};

export default Header;
