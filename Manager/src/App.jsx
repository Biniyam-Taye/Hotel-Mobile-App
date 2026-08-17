import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, Plus, ChevronDown, LayoutDashboard, 
  CalendarCheck, DoorOpen, Tags, Utensils, ConciergeBell, 
  Dumbbell, TicketPercent, Globe, Star, 
  BarChart3, Settings, TrendingUp, Users,
  MessageSquare, Hotel, ChevronRight, LogOut, User, HelpCircle
} from 'lucide-react';
import './index.css';

// Import Pages
import DashboardOverview from './pages/DashboardOverview';
import RoomsList from './pages/Rooms/RoomsList';
import RoomCategoriesList from './pages/RoomCategories/RoomCategoriesList';
import RestaurantMenu from './pages/Hospitality/RestaurantMenu';
import HotelServices from './pages/Hospitality/HotelServices';
import FacilitiesAmenities from './pages/Hospitality/FacilitiesAmenities';
import OffersCoupons from './pages/Content/OffersCoupons';
import NotificationsPage from './pages/System/Notifications';
import SettingsPage from './pages/System/Settings';
import ReviewsPage from './pages/Insights/Reviews';
import ReportsPage from './pages/Insights/Reports';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      { icon: CalendarCheck, label: 'Reservations', path: '/reservations' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { icon: DoorOpen, label: 'Rooms', path: '/rooms' },
      { icon: Tags, label: 'Room Categories', path: '/room-categories' },
    ],
  },
  {
    label: 'Hospitality',
    items: [
      { icon: Utensils, label: 'Restaurant & Menu', path: '/hospitality/restaurant' },
      { icon: ConciergeBell, label: 'Hotel Services', path: '/hospitality/services' },
      { icon: Dumbbell, label: 'Facilities & Amenities', path: '/hospitality/facilities' },
    ],
  },
  {
    label: 'Content',
    items: [
      { icon: Globe, label: 'Website Content' },
      { icon: TicketPercent, label: 'Offers & Coupons', path: '/content/offers' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: Star, label: 'Reviews', path: '/insights/reviews' },
      { icon: BarChart3, label: 'Reports', path: '/insights/reports' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: MessageSquare, label: 'Notifications', path: '/system/notifications' },
      { icon: Settings, label: 'Settings', path: '/system/settings' },
    ],
  },
];

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  const notifications = [
    { id: 1, text: 'New booking from John Doe', time: '5 min ago', unread: true },
    { id: 2, text: 'Room 204 checkout pending', time: '30 min ago', unread: true },
    { id: 3, text: 'Maintenance request resolved', time: '1 hr ago', unread: false },
  ];

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="top-header">
        {/* Logo */}
        <div className="logo-area">
          <img src="/logo.png" alt="Hotel Logo" style={{ height: '48px', objectFit: 'contain' }} />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minWidth: '8rem' }} />

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Notifications */}
          <div className="icon-btn-wrapper" ref={notifRef}>
            <button className="icon-btn" onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}>
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            {notifOpen && (
              <div className="dropdown-panel notif-panel">
                <div className="dropdown-header">Notifications</div>
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`}>
                    <div className="notif-dot" style={{ backgroundColor: n.unread ? '#3b82f6' : 'transparent' }} />
                    <div>
                      <p className="notif-text">{n.text}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
                <div className="dropdown-footer">View all notifications</div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="icon-btn-wrapper" ref={profileRef}>
            <button className="user-profile" onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" 
                alt="Manager Profile" 
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">Sarah Jenkins</span>
                <span className="user-email">General Manager</span>
              </div>
              <ChevronDown size={14} color="#a1a1aa" style={{ transition: 'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {profileOpen && (
              <div className="dropdown-panel profile-panel">
                <div className="dropdown-header">My Account</div>
                <Link to="#" className="dropdown-item"><User size={15} /> Profile Settings</Link>
                <Link to="#" className="dropdown-item"><HelpCircle size={15} /> Help & Support</Link>
                <div className="dropdown-divider" />
                <button className="dropdown-item danger"><LogOut size={15} /> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-area">
        
        {/* Left Sidebar */}
        <aside className={`left-sidebar${sidebarExpanded ? ' expanded' : ''}`}>
          
          {/* Nav Items */}
          <div className="sidebar-nav">
            {navGroups.map((group) => (
              <div className="sidebar-group" key={group.label}>
                {sidebarExpanded && (
                  <span className="sidebar-group-title">{group.label}</span>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || 
                    (item.path !== '/' && location.pathname.startsWith(item.path));
                    
                  return (
                    <Link
                      to={item.path || '#'}
                      key={item.label}
                      className={`sidebar-item${isActive ? ' active' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="sidebar-item-icon"><Icon size={22} /></span>
                      {sidebarExpanded && <span className="sidebar-item-label">{item.label}</span>}
                      {/* Tooltip — only visible in collapsed mode via CSS */}
                      <span className="sidebar-tooltip">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Toggle Button — sits on the right edge of the sidebar */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarExpanded((v) => !v)}
            aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronRight
              size={16}
              className={`toggle-arrow${sidebarExpanded ? ' rotated' : ''}`}
            />
          </button>
        </aside>

        {/* Content Layout */}
        <div className="content-layout">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/room-categories" element={<RoomCategoriesList />} />
            <Route path="/hospitality/restaurant" element={<RestaurantMenu />} />
            <Route path="/hospitality/services" element={<HotelServices />} />
            <Route path="/hospitality/facilities" element={<FacilitiesAmenities />} />
            <Route path="/content/offers" element={<OffersCoupons />} />
            <Route path="/system/notifications" element={<NotificationsPage />} />
            <Route path="/system/settings" element={<SettingsPage />} />
            <Route path="/insights/reviews" element={<ReviewsPage />} />
            <Route path="/insights/reports" element={<ReportsPage />} />
            {/* Catch-all for undefined routes that just renders the overview for now */}
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
