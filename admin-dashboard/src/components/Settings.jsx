import React, { useState } from 'react';
import './Settings.css';
import { 
  User, Building, Shield, Bell, CreditCard, 
  Camera, Check, Mail, Phone, Lock, 
  ToggleLeft, ToggleRight, MapPin, Globe, Star
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Dummy state for toggles
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailAlerts: true,
    smsAlerts: false,
    marketing: false,
    newBooking: true,
    cancellations: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-section">
            <h2 className="settings-title">Owner Profile</h2>
            <p className="settings-subtitle">Manage your personal information and preferences.</p>
            
            <div className="settings-card">
              <div className="profile-header">
                <div className="avatar-wrapper">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Owner Avatar" className="avatar-img" />
                  <button className="avatar-edit-btn"><Camera size={16} /></button>
                </div>
                <div className="profile-info-header">
                  <h3>Alex Sterling</h3>
                  <span className="role-badge owner">Hotel Owner</span>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input type="text" defaultValue="Alex" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input type="text" defaultValue="Sterling" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input type="email" defaultValue="alex@finexyhotel.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-cancel">Discard Changes</button>
                <button className="btn-save"><Check size={16} /> Save Profile</button>
              </div>
            </div>
          </div>
        );
      
      case 'hotel':
        return (
          <div className="settings-section">
            <h2 className="settings-title">Hotel Information</h2>
            <p className="settings-subtitle">Update your property details and public information.</p>
            
            <div className="settings-card">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Property Name</label>
                  <div className="input-with-icon">
                    <Building size={18} className="input-icon" />
                    <input type="text" defaultValue="The Grand Finexy Resort" />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Full Address</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" defaultValue="123 Luxury Avenue, Beverly Hills, CA 90210" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Star Rating</label>
                  <div className="input-with-icon">
                    <Star size={18} className="input-icon" />
                    <select defaultValue="5">
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <div className="input-with-icon">
                    <Globe size={18} className="input-icon" />
                    <select defaultValue="pst">
                      <option value="est">Eastern Time (ET)</option>
                      <option value="cst">Central Time (CT)</option>
                      <option value="pst">Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="settings-actions">
                <button className="btn-save"><Check size={16} /> Update Property</button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <h2 className="settings-title">Security & Access</h2>
            <p className="settings-subtitle">Manage your password and secure your account.</p>
            
            <div className="settings-card mb-20">
              <h3 className="card-inner-title">Change Password</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Current Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type="password" placeholder="New Password" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                </div>
              </div>
              <div className="settings-actions">
                <button className="btn-save">Update Password</button>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="card-inner-title">Advanced Security</h3>
              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Two-Factor Authentication (2FA)</h4>
                    <p>Require a security code from your mobile device when logging in.</p>
                  </div>
                  <button className={`toggle-btn ${toggles.twoFactor ? 'on' : ''}`} onClick={() => handleToggle('twoFactor')}>
                    {toggles.twoFactor ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-section">
            <h2 className="settings-title">Notifications</h2>
            <p className="settings-subtitle">Choose what updates you want to receive.</p>
            
            <div className="settings-card">
              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Email Alerts</h4>
                    <p>Receive daily summaries and important alerts via email.</p>
                  </div>
                  <button className={`toggle-btn ${toggles.emailAlerts ? 'on' : ''}`} onClick={() => handleToggle('emailAlerts')}>
                    {toggles.emailAlerts ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>New Bookings</h4>
                    <p>Get notified immediately when a new reservation is made.</p>
                  </div>
                  <button className={`toggle-btn ${toggles.newBooking ? 'on' : ''}`} onClick={() => handleToggle('newBooking')}>
                    {toggles.newBooking ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Cancellations</h4>
                    <p>Get notified when a booking is cancelled.</p>
                  </div>
                  <button className={`toggle-btn ${toggles.cancellations ? 'on' : ''}`} onClick={() => handleToggle('cancellations')}>
                    {toggles.cancellations ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>SMS Alerts</h4>
                    <p>Receive critical system alerts via text message.</p>
                  </div>
                  <button className={`toggle-btn ${toggles.smsAlerts ? 'on' : ''}`} onClick={() => handleToggle('smsAlerts')}>
                    {toggles.smsAlerts ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-layout">
        
        {/* Left Sidebar Menu */}
        <div className="settings-sidebar">
          <div className="settings-menu">
            <button 
              className={`settings-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Owner Profile
            </button>
            <button 
              className={`settings-menu-item ${activeTab === 'hotel' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotel')}
            >
              <Building size={18} /> Hotel Details
            </button>
            <button 
              className={`settings-menu-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Security & Access
            </button>
            <button 
              className={`settings-menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              className={`settings-menu-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> Billing & Plans
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="settings-content">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Settings;
