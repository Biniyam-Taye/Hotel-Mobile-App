import React from 'react';
import './Sidebar.css';
import { LayoutGrid, Calendar, Mail, FileText, Users, Box, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
          </div>
          <div className="nav-item">
            <Calendar size={20} />
          </div>
          <div className="nav-item">
            <Mail size={20} />
          </div>
          <div className="nav-item">
            <FileText size={20} />
          </div>
          <div className="nav-item">
            <Users size={20} />
          </div>
          <div className="nav-item">
            <Box size={20} />
          </div>
          <div className="nav-item">
            <Settings size={20} />
          </div>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="nav-item">
          <HelpCircle size={20} />
        </div>
        <div className="nav-item">
          <LogOut size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
