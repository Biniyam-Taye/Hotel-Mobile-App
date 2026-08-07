import React from 'react';
import './Header.css';
import { Search, Bell, AlertCircle, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <a href="#" className="nav-link active">Overview</a>
        <a href="#" className="nav-link">Activity</a>
        <a href="#" className="nav-link">Manage</a>
        <a href="#" className="nav-link">Program</a>
        <a href="#" className="nav-link">Account</a>
        <a href="#" className="nav-link">Reports</a>
      </nav>
      
      <div className="header-actions">
        <div className="action-icons">
          <button className="icon-btn">
            <Search size={22} />
          </button>
          <button className="icon-btn position-relative">
            <Bell size={22} />
            <span className="notification-dot"></span>
          </button>
          <button className="icon-btn">
            <AlertCircle size={22} />
          </button>
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
