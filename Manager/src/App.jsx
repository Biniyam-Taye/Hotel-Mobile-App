import React, { useState } from 'react';
import { 
  Bell, Plus, Search, ChevronDown, LayoutDashboard, 
  CalendarCheck, DoorOpen, Tags, Utensils, ConciergeBell, 
  Dumbbell, TicketPercent, Globe, Image as ImageIcon, Star, 
  BarChart3, Settings, TrendingUp, Users,
  MessageSquare, Hotel, ChevronRight
} from 'lucide-react';
import './index.css';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', active: true },
      { icon: CalendarCheck, label: 'Reservations' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { icon: DoorOpen, label: 'Rooms' },
      { icon: Tags, label: 'Room Categories' },
    ],
  },
  {
    label: 'Hospitality',
    items: [
      { icon: Utensils, label: 'Restaurant & Menu' },
      { icon: ConciergeBell, label: 'Hotel Services' },
      { icon: Dumbbell, label: 'Facilities & Amenities' },
    ],
  },
  {
    label: 'Content',
    items: [
      { icon: Globe, label: 'Website Content' },
      { icon: TicketPercent, label: 'Offers & Coupons' },
      { icon: ImageIcon, label: 'Gallery / Media' },
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

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="top-header">
        <div className="logo-area">
          <Hotel size={24} />
          HotelManager
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
                  return (
                    <div
                      key={item.label}
                      className={`sidebar-item${item.active ? ' active' : ''}`}
                    >
                      <span className="sidebar-item-icon"><Icon size={22} /></span>
                      {sidebarExpanded && <span className="sidebar-item-label">{item.label}</span>}
                      {/* Tooltip — only visible in collapsed mode via CSS */}
                      <span className="sidebar-tooltip">{item.label}</span>
                    </div>
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
          
          {/* Main Dashboard Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h1 className="section-title">Hotel Overview 🏨</h1>
            </div>

            {/* Summary Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Total Rooms</span>
                  <DoorOpen size={16} />
                </div>
                <span className="stat-number">124</span>
              </div>
              <div className="stat-card green">
                <div className="stat-header">
                  <span className="stat-title">Occupied</span>
                  <Users size={16} />
                </div>
                <span className="stat-number">89</span>
                <span className="stat-trend positive">↑ 12% vs last week</span>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Available</span>
                  <DoorOpen size={16} />
                </div>
                <span className="stat-number">35</span>
              </div>
              <div className="stat-card blue">
                <div className="stat-header">
                  <span className="stat-title">Check-ins Today</span>
                  <CalendarCheck size={16} />
                </div>
                <span className="stat-number">14</span>
              </div>
              <div className="stat-card red">
                <div className="stat-header">
                  <span className="stat-title">Check-outs Today</span>
                  <CalendarCheck size={16} />
                </div>
                <span className="stat-number">9</span>
              </div>
              <div className="stat-card yellow">
                <div className="stat-header">
                  <span className="stat-title">Pending Booking</span>
                  <Bell size={16} />
                </div>
                <span className="stat-number">5</span>
              </div>
              <div className="stat-card purple">
                <div className="stat-header">
                  <span className="stat-title">Revenue (Today)</span>
                  <TrendingUp size={16} />
                </div>
                <span className="stat-number">$8,240</span>
                <span className="stat-trend positive">↑ $420 vs yesterday</span>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Occupancy Rate</span>
                  <BarChart3 size={16} />
                </div>
                <span className="stat-number">71.7%</span>
                <span className="stat-trend positive">↑ 4.2%</span>
              </div>
            </div>

            {/* Data Sections */}
            <div className="data-section-grid">
              
              {/* Today's Activity */}
              <div className="data-card">
                <div className="data-card-header">
                  <h3 className="data-card-title">Today's Reservations</h3>
                  <span style={{ fontSize: '0.875rem', color: '#3b82f6', cursor: 'pointer' }}>View All</span>
                </div>
                <div className="list-container">
                  <div className="list-item">
                    <div className="list-item-main">
                      <div className="list-item-icon"><Users size={20} /></div>
                      <div className="list-item-details">
                        <h4>Michael &amp; Emma Smith</h4>
                        <p>Deluxe Ocean View • 3 Nights</p>
                      </div>
                    </div>
                    <span className="badge pending">Arrival: 14:00</span>
                  </div>
                  <div className="list-item">
                    <div className="list-item-main">
                      <div className="list-item-icon"><Users size={20} /></div>
                      <div className="list-item-details">
                        <h4>David Chen</h4>
                        <p>Executive Suite • 1 Night</p>
                      </div>
                    </div>
                    <span className="badge confirmed">Checked In</span>
                  </div>
                  <div className="list-item">
                    <div className="list-item-main">
                      <div className="list-item-icon"><Users size={20} /></div>
                      <div className="list-item-details">
                        <h4>Johnson Family (4)</h4>
                        <p>Family Connecting Room • 5 Nights</p>
                      </div>
                    </div>
                    <span className="badge checkout">Checkout: 11:00</span>
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="data-card">
                <div className="data-card-header">
                  <h3 className="data-card-title">Recent Web Bookings</h3>
                  <span style={{ fontSize: '0.875rem', color: '#3b82f6', cursor: 'pointer' }}>Manage</span>
                </div>
                <div className="list-container">
                  <div className="list-item">
                    <div className="list-item-main">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80" alt="Guest" style={{width: 40, height: 40, borderRadius: '50%'}} />
                      <div className="list-item-details">
                        <h4>Sophie Laurent</h4>
                        <p>Booking #BK-9241 • Oct 12 - Oct 15</p>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: 600, fontSize: '0.875rem'}}>$450.00</div>
                      <div style={{fontSize: '0.75rem', color: '#10b981'}}>Paid</div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="list-item-main">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=40&q=80" alt="Guest" style={{width: 40, height: 40, borderRadius: '50%'}} />
                      <div className="list-item-details">
                        <h4>James Wilson</h4>
                        <p>Booking #BK-9240 • Oct 18 - Oct 20</p>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: 600, fontSize: '0.875rem'}}>$320.00</div>
                      <div style={{fontSize: '0.75rem', color: '#f59e0b'}}>Deposit</div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="list-item-main">
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80" alt="Guest" style={{width: 40, height: 40, borderRadius: '50%'}} />
                      <div className="list-item-details">
                        <h4>Elena Rodriguez</h4>
                        <p>Booking #BK-9239 • Nov 02 - Nov 07</p>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: 600, fontSize: '0.875rem'}}>$1,150.00</div>
                      <div style={{fontSize: '0.75rem', color: '#10b981'}}>Paid</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating Quick Actions Toolbar */}
            <div className="floating-toolbar">
              <div className="toolbar-action primary">
                <Plus size={16} /> Add Room
              </div>
              <div className="toolbar-action">
                <Utensils size={16} /> Add Menu Item
              </div>
              <div className="toolbar-action">
                <ConciergeBell size={16} /> Add Service
              </div>
              <div className="toolbar-action">
                <TicketPercent size={16} /> Create Offer
              </div>
              <div className="toolbar-action">
                <Globe size={16} /> Edit Website
              </div>
            </div>
            
          </section>

          {/* Right Sidebar - Recent Guest Reviews */}
          <section className="reviews-section">
            <div className="section-header">
              <h2 className="section-title" style={{fontSize: '1.25rem'}}>Recent Reviews ⭐️</h2>
            </div>
            
            <div className="review-card featured">
              <div className="review-header">
                <div className="reviewer-info">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&q=80" alt="Avatar" className="reviewer-avatar" />
                  <div>
                    <div className="reviewer-name">Amanda Taylor</div>
                    <div className="review-date">Today at 9:24 AM</div>
                  </div>
                </div>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="review-text">"Absolutely wonderful stay! The room was spotless and the ocean view was breathtaking. The restaurant staff went above and beyond for our anniversary."</p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar" style={{backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '12px', fontWeight: 'bold'}}>RJ</div>
                  <div>
                    <div className="reviewer-name">Robert Johnson</div>
                    <div className="review-date">Yesterday</div>
                  </div>
                </div>
                <div className="star-rating">
                  {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  <Star size={14} color="#e5e7eb" />
                </div>
              </div>
              <p className="review-text">"Very good experience overall. Check-in was a bit slow, but the amenities made up for it. The spa is highly recommended."</p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&q=80" alt="Avatar" className="reviewer-avatar" />
                  <div>
                    <div className="reviewer-name">Peter Wong</div>
                    <div className="review-date">Oct 08, 2026</div>
                  </div>
                </div>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="review-text">"Best business hotel in the city. The executive lounge was perfect for my meetings and the high-speed wifi actually worked flawlessly."</p>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}

export default App;
