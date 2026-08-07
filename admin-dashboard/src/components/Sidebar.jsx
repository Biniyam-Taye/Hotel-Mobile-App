import React, { useState } from 'react';
import './Sidebar.css';
import { LayoutGrid, Calendar, Mail, FileText, Users, Box, Settings, HelpCircle, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
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
          <div className="nav-item active">
            <LayoutGrid size={20} />
            <span className="nav-label">Overview</span>
          </div>
          <div className="nav-item">
            <Calendar size={20} />
            <span className="nav-label">Calendar</span>
          </div>
          <div className="nav-item">
            <Mail size={20} />
            <span className="nav-label">Messages</span>
          </div>
          <div className="nav-item">
            <FileText size={20} />
            <span className="nav-label">Documents</span>
          </div>
          <div className="nav-item">
            <Users size={20} />
            <span className="nav-label">Team</span>
          </div>
          <div className="nav-item">
            <Box size={20} />
            <span className="nav-label">Products</span>
          </div>
          <div className="nav-item">
            <Settings size={20} />
            <span className="nav-label">Settings</span>
          </div>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="nav-item">
          <HelpCircle size={20} />
          <span className="nav-label">Help</span>
        </div>
        <div className="nav-item">
          <LogOut size={20} />
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
