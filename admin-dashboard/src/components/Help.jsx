import React, { useState } from 'react';
import './Help.css';
import {
  Search, ChevronDown, ChevronRight, MessageCircle,
  BookOpen, Video, FileQuestion, Phone, Mail,
  Zap, ShieldCheck, CreditCard, Users, BarChart2,
  Calendar, CheckCircle, ExternalLink, ArrowRight
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'getting-started', label: 'Getting Started', Icon: Zap, color: '#f39c12', bg: '#fef3e2' },
  { id: 'billing', label: 'Billing & Payments', Icon: CreditCard, color: '#6366f1', bg: '#f0f0fa' },
  { id: 'team', label: 'Team Management', Icon: Users, color: '#2ecc71', bg: '#e6f9ee' },
  { id: 'reports', label: 'Reports & Analytics', Icon: BarChart2, color: '#fa5a2a', bg: '#fff0eb' },
  { id: 'security', label: 'Security & Access', Icon: ShieldCheck, color: '#e74c3c', bg: '#fde8e8' },
  { id: 'bookings', label: 'Reservations', Icon: Calendar, color: '#8b5cf6', bg: '#f0ebff' },
];

const FAQS = [
  {
    category: 'getting-started',
    question: 'How do I set up my hotel owner account for the first time?',
    answer: 'After registration, navigate to the Overview dashboard. You will be prompted to complete your hotel profile — add your hotel name, address, star rating, and contact details. Once complete, you can begin managing rooms, staff, and finances from a single panel.',
  },
  {
    category: 'getting-started',
    question: 'How do I invite my hotel managers and staff?',
    answer: 'Go to the Team section in the sidebar. Click "Invite Member", enter their email address and select their role (Hotel Manager, Front Desk, Housekeeping, etc.). They will receive an email invitation and their account will appear as "Pending Approval" until you approve it.',
  },
  {
    category: 'billing',
    question: 'How do I view my monthly revenue report?',
    answer: 'Your revenue summary is shown on the Overview dashboard. For a detailed breakdown, visit the Documents section where monthly financial reports are auto-generated, or use the Reports module to filter by date range, room type, or revenue category.',
  },
  {
    category: 'billing',
    question: 'How do I update my payment method or wallet?',
    answer: 'On the Overview dashboard, scroll to the "My Cards" or "Wallets" section. Click "+ Add New" to link a new card or bank account. You can set a primary payment method, activate or deactivate currencies, and monitor monthly spending limits per wallet.',
  },
  {
    category: 'team',
    question: 'How do I suspend or remove a staff member\'s access?',
    answer: 'Navigate to the Team page. Find the staff member in the table and click the "Suspend" button to temporarily freeze their access, or "Remove" to permanently revoke their role. Suspended users cannot log in but their data is retained. Removed users must be re-invited to regain access.',
  },
  {
    category: 'team',
    question: 'Can I assign multiple roles to one staff member?',
    answer: 'Currently, each team member has one primary role assigned by the hotel owner. If a staff member needs elevated privileges, you can update their role from the Team management page. Multi-role support is on our roadmap for the next release.',
  },
  {
    category: 'reports',
    question: 'How do I read the cashflow chart on the dashboard?',
    answer: 'The cashflow chart on the Overview page shows your monthly income (green bars) vs. expenses (orange bars) for the current year. Hover over any bar to see the exact figure. The line overlay represents your net profit trend. You can switch between weekly, monthly, and yearly views.',
  },
  {
    category: 'security',
    question: 'How do I enable two-factor authentication for my account?',
    answer: 'Go to Settings → Security. Toggle on "Two-Factor Authentication (2FA)" and scan the QR code with an authenticator app (Google Authenticator, Authy, etc.). Each login will then require a 6-digit code in addition to your password.',
  },
  {
    category: 'bookings',
    question: 'How do I view upcoming guest reservations?',
    answer: 'Open the Calendar page to see all reservations mapped to their check-in dates. Click any day to see the guest name, room, and details. You can also connect Google Calendar to sync reservations automatically with your personal or business calendar.',
  },
];

const GUIDES = [
  { title: 'Quick Start: Hotel Owner Setup', time: '5 min read', Icon: BookOpen, color: '#6366f1' },
  { title: 'Managing Your Team Roles', time: '8 min read', Icon: Users, color: '#fa5a2a' },
  { title: 'Understanding Your Revenue Dashboard', time: '6 min read', Icon: BarChart2, color: '#2ecc71' },
  { title: 'Calendar & Google Sync Guide', time: '4 min read', Icon: Calendar, color: '#f39c12' },
  { title: 'Document Management Best Practices', time: '7 min read', Icon: FileQuestion, color: '#8b5cf6' },
  { title: 'Security & Access Control Overview', time: '5 min read', Icon: ShieldCheck, color: '#e74c3c' },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────
const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{item.question}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className="faq-answer">{item.answer}</div>}
    </div>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const Help = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = FAQS.filter(f => {
    const matchSearch = f.question.toLowerCase().includes(search.toLowerCase())
      || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="help-page">

      {/* ── Hero ── */}
      <div className="help-hero">
        <div className="help-hero-text">
          <h1>How can we help you?</h1>
          <p>Search our knowledge base or browse categories below.</p>
        </div>
        <div className="help-hero-search">
          <Search size={18} className="h-search-icon" />
          <input
            placeholder="Search for answers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="help-stats">
          <div className="help-stat"><CheckCircle size={15} /><span>9 articles</span></div>
          <div className="help-stat"><Video size={15} /><span>6 video guides</span></div>
          <div className="help-stat"><MessageCircle size={15} /><span>Live chat available</span></div>
        </div>
      </div>

      <div className="help-body">
        {/* ── Left: Categories + FAQ ── */}
        <div className="help-main">

          {/* Category chips */}
          <div className="help-cats">
            <button
              className={`help-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >All Topics</button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`help-cat-btn ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                <c.Icon size={14} /> {c.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="faq-section">
            <h2 className="section-heading">
              Frequently Asked Questions
              <span className="faq-count">{filteredFaqs.length} results</span>
            </h2>
            {filteredFaqs.length > 0
              ? filteredFaqs.map((f, i) => <FaqItem key={i} item={f} />)
              : <div className="help-empty">
                  <FileQuestion size={40} />
                  <p>No results found for "<strong>{search}</strong>"</p>
                  <span>Try a different keyword or browse a category above.</span>
                </div>
            }
          </div>

          {/* Video Guides */}
          <div className="guide-section">
            <h2 className="section-heading">Step-by-Step Guides</h2>
            <div className="guide-grid">
              {GUIDES.map((g, i) => (
                <div key={i} className="guide-card">
                  <div className="guide-icon" style={{ background: g.color + '22' }}>
                    <g.Icon size={22} color={g.color} />
                  </div>
                  <div className="guide-info">
                    <span className="guide-title">{g.title}</span>
                    <span className="guide-time">{g.time}</span>
                  </div>
                  <ExternalLink size={14} className="guide-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="help-sidebar">

          {/* Topic Categories */}
          <div className="help-card">
            <h3 className="help-card-title">Browse by Topic</h3>
            <div className="topic-list">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className="topic-item"
                  onClick={() => setActiveCategory(c.id)}
                >
                  <div className="topic-icon" style={{ background: c.bg }}>
                    <c.Icon size={16} color={c.color} />
                  </div>
                  <span className="topic-label">{c.label}</span>
                  <ArrowRight size={14} className="topic-arrow" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="help-card contact-card">
            <div className="contact-icon"><MessageCircle size={22} color="white" /></div>
            <h3>Still need help?</h3>
            <p>Our hotel support team is available 24/7 to assist you.</p>
            <div className="contact-options">
              <a href="mailto:support@finexy.com" className="contact-btn">
                <Mail size={15} /> Email Support
              </a>
              <a href="tel:+1800000000" className="contact-btn contact-btn-outline">
                <Phone size={15} /> Call Us
              </a>
            </div>
          </div>

          {/* Live Chat */}
          <div className="help-card live-chat-card">
            <div className="live-badge"><span className="live-dot"></span>Online</div>
            <h3>Live Chat</h3>
            <p>Chat with a support agent right now — average response time is under 2 minutes.</p>
            <button className="start-chat-btn"><MessageCircle size={15} /> Start Live Chat</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Help;
