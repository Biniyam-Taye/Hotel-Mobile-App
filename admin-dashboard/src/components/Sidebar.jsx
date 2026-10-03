import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { LayoutGrid, Calendar, Mail, FileText, Users, Settings, HelpCircle, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar = ({ onLogout, adminUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const avatarInitials = adminUser
    ? (adminUser.firstName?.[0] || '') + (adminUser.lastName?.[0] || '')
    : 'A';

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronLeft size={24} strokeWidth={3} /> : <ChevronRight size={24} strokeWidth={3} />}
      </button>

      <div className="sidebar-top">
        <div className="logo-container">
          <div className="logo-icon">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Finexy</span>
        </div>
        
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            <LayoutGrid size={20} />
            <span className="nav-label">Overview</span>
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Calendar size={20} />
            <span className="nav-label">Calendar</span>
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Mail size={20} />
            <span className="nav-label">Messages</span>
          </NavLink>
          <NavLink to="/documents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            <span className="nav-label">Documents</span>
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            <span className="nav-label">Team</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={20} />
            <span className="nav-label">Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink to="/help" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HelpCircle size={20} />
          <span className="nav-label">Help</span>
        </NavLink>

        {/* Logout button */}
        <button
          className="nav-item logout-btn"
          onClick={onLogout}
          title="Sign Out"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={20} />
          <span className="nav-label">Logout</span>
        </button>

        {/* Admin user info when expanded */}
        {isExpanded && adminUser && (
          <div className="sidebar-user-info">
            <div className="sidebar-avatar">{avatarInitials}</div>
            <div className="sidebar-user-details">
              <div className="sidebar-user-name">{adminUser.firstName} {adminUser.lastName}</div>
              <div className="sidebar-user-role">Hotel Owner</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
