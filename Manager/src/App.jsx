import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Bell, Plus, Search, ChevronDown, LayoutDashboard, 
  CalendarCheck, DoorOpen, Tags, Utensils, ConciergeBell, 
  Dumbbell, TicketPercent, Globe, Image as ImageIcon, Star, 
  BarChart3, Settings, TrendingUp, Users,
  MessageSquare, Hotel, ChevronRight
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
      { icon: Star, label: 'Reviews' },
      { icon: BarChart3, label: 'Analytics & Reports' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: MessageSquare, label: 'Notifications' },
      { icon: Settings, label: 'Settings' },
    ],
  },
];

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="top-header">
        <div className="logo-area">
          <img src="/logo.png" alt="Hotel Logo" style={{ height: '32px', objectFit: 'contain' }} />
        </div>
        
        <div className="top-search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search reservations, rooms, or guests..." />
        </div>
        
        <div className="nav-actions">
          <div className="icon-btn">
            <Plus size={20} />
          </div>
          <div className="icon-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" 
              alt="Manager Profile" 
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">Sarah Jenkins</span>
              <span className="user-email">General Manager</span>
            </div>
            <ChevronDown size={16} color="#a1a1aa" />
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
            {/* Catch-all for undefined routes that just renders the overview for now */}
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
