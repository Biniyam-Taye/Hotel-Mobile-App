import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, Plus, ChevronDown, LayoutDashboard, 
  CalendarCheck, DoorOpen, Tags, Utensils, ConciergeBell, 
  Dumbbell, TicketPercent, Globe, Star, 
  BarChart3, Settings, TrendingUp, Users,
  MessageSquare, Hotel, ChevronRight, LogOut, User, HelpCircle,
  Presentation
} from 'lucide-react';
import './index.css';

// Import Pages
import DashboardOverview from './pages/DashboardOverview';
import RoomsList from './pages/Rooms/RoomsList';
import RoomCategoriesList from './pages/RoomCategories/RoomCategoriesList';
import RestaurantMenu from './pages/Hospitality/RestaurantMenu';
import HotelServices from './pages/Hospitality/HotelServices';
import FacilitiesAmenities from './pages/Hospitality/FacilitiesAmenities';
import EventsConferences from './pages/Hospitality/EventsConferences';
import OffersCoupons from './pages/Content/OffersCoupons';
import NotificationsPage from './pages/System/Notifications';
import SettingsPage from './pages/System/Settings';
import ReviewsPage from './pages/Insights/Reviews';
import ReportsPage from './pages/Insights/Reports';
import ReservationsPage from './pages/Reservations/ReservationsPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Messages from './pages/Messages/Messages';
import { getMe } from './services/authApi';

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
      { icon: Presentation, label: 'Events & Conferences', path: '/hospitality/events' },
    ],
  },
  {
    label: 'Content',
    items: [
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
      { icon: MessageSquare, label: 'Messages', path: '/messages' },
      { icon: Bell, label: 'Notifications', path: '/system/notifications' },
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

  // Auth States
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isPendingApproval, setIsPendingApproval] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auth Check on load / token change
  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setUser(null);
        setCheckingAuth(false);
        return;
      }

      try {
        const userData = await getMe();
        setUser(userData);
        // If manager is still pending approval, show pending screen
        if (userData.role === 'manager' && userData.approvalStatus === 'pending') {
          setIsPendingApproval(true);
        } else {
          setIsPendingApproval(false);
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser(null);
        setIsPendingApproval(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [token]);

  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsPendingApproval(userData.role === 'manager' && userData.approvalStatus === 'pending');
  };

  // isPending is passed from Signup when the registered manager has pending status
  const handleSignupSuccess = (userData, userToken, isPending = false) => {
    setUser(userData);
    setToken(userToken);
    setIsPendingApproval(isPending);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setAuthMode('login');
    setIsPendingApproval(false);
    setProfileOpen(false);
    navigate('/');
  };

  const getAvatarUrl = (u) => {
    if (u?.profilePicture && u.profilePicture !== 'default.jpg') {
      return u.profilePicture;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      (u?.firstName || '') + ' ' + (u?.lastName || '')
    )}&background=2563eb&color=fff&size=150`;
  };


  const notifications = [
    { id: 1, text: 'New booking from John Doe', time: '5 min ago', unread: true },
    { id: 2, text: 'Room 204 checkout pending', time: '30 min ago', unread: true },
    { id: 3, text: 'Maintenance request resolved', time: '1 hr ago', unread: false },
  ];

  if (checkingAuth) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0b0c10',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <div className="btn-spinner" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  if (!user) {
    if (authMode === 'signup') {
      return (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => setAuthMode('login')}
        />
      );
    }
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignup={() => setAuthMode('signup')}
      />
    );
  }

  // Manager has signed up but not yet approved by admin
  if (isPendingApproval) {
    return (
      <div className="auth-page">
        <div className="auth-glass-card" style={{ maxWidth: '460px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>⏳</div>
          <h2 className="auth-heading" style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>
            Account Pending Approval
          </h2>
          <p className="auth-subheading" style={{ marginBottom: '1.5rem', lineHeight: '1.6', textAlign: 'center' }}>
            Hi <strong style={{ color: '#2563eb' }}>{user.firstName}</strong>! Your manager account has been created successfully.
            <br /><br />
            Please wait while the <strong style={{ color: '#2563eb' }}>hotel owner</strong> reviews and approves your account.
            You will be able to access the dashboard once approved.
          </p>
          <div style={{
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.15)',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.75rem',
            fontSize: '0.85rem',
            color: '#1e3a8a',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>✉️</span>
            <strong>{user.email}</strong>
            <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>(awaiting approval)</span>
          </div>
          <button
            className="auth-primary-btn"
            onClick={handleLogout}
            style={{ width: '100%' }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">

      {/* Left Sidebar — full height */}
      <aside className={`left-sidebar${sidebarExpanded ? ' expanded' : ''}`}>
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
                    <span className="sidebar-tooltip">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
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

      {/* Right Column — navbar + content */}
      <div className="right-column">

        {/* Top Header */}
        <header className="top-header">
          <div className="logo-area">
            <img src="/logo.png" alt="Hotel Logo" style={{ height: '48px', objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, minWidth: '8rem' }} />

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
                  <div className="dropdown-footer" onClick={() => { navigate('/system/notifications'); setNotifOpen(false); }} style={{ cursor: 'pointer' }}>View all notifications</div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="icon-btn-wrapper" ref={profileRef}>
              <button className="user-profile" onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}>
                <img
                  src={getAvatarUrl(user)}
                  alt="Manager Profile"
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="user-email">{user.role === 'manager' ? 'General Manager' : user.role}</span>
                </div>
                <ChevronDown size={14} color="#a1a1aa" style={{ transition: 'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {profileOpen && (
                <div className="dropdown-panel profile-panel">
                  <div className="dropdown-header">My Account</div>
                  <Link to="/system/settings" className="dropdown-item" onClick={() => setProfileOpen(false)}><User size={15} /> Profile Settings</Link>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger" onClick={handleLogout}><LogOut size={15} /> Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-layout">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/room-categories" element={<RoomCategoriesList />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/hospitality/restaurant" element={<RestaurantMenu />} />
            <Route path="/hospitality/services" element={<HotelServices />} />
            <Route path="/hospitality/facilities" element={<FacilitiesAmenities />} />
            <Route path="/hospitality/events" element={<EventsConferences />} />
            <Route path="/content/offers" element={<OffersCoupons />} />
            <Route path="/system/notifications" element={<NotificationsPage />} />
            <Route path="/system/settings" element={<SettingsPage />} />
            <Route path="/insights/reviews" element={<ReviewsPage />} />
            <Route path="/insights/reports" element={<ReportsPage />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
