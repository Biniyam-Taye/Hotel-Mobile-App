import React, { useState } from 'react';
import './Help.css';
import {
  Search, ChevronDown, ChevronRight, MessageCircle,
  BookOpen, Video, FileQuestion, Phone, Mail,
  Zap, ShieldCheck, CreditCard, Users, BarChart2,
  Calendar, CheckCircle, ExternalLink, ArrowRight,
  ArrowLeft, Clock, Tag, AlertCircle, Lightbulb,
  Star, Lock, Eye, Upload, FolderOpen, RefreshCw
} from 'lucide-react';

// ─── Guides Content ────────────────────────────────────────────────────────────
const GUIDE_CONTENT = {
  0: {
    title: 'Quick Start: Hotel Owner Setup',
    time: '5 min read',
    color: '#6366f1',
    Icon: BookOpen,
    sections: [
      {
        heading: '1. Complete Your Hotel Profile',
        content: 'After your first login, you will be directed to the Overview dashboard. Click the profile icon in the top-right corner and select "Hotel Settings". Fill in your hotel name, address, star rating, contact number, and upload your hotel logo. This information will appear on all guest-facing documents and invoices.',
        tip: 'Add a high-resolution logo (at least 512×512px) for the best results across documents and emails.',
      },
      {
        heading: '2. Configure Your Financial Wallets',
        content: 'Navigate to the Overview dashboard and scroll to the Wallets section. Click "Total 6 wallets" to manage your currencies. You can activate USD, EUR, GBP or any supported currency. Set spending limits per currency to control your monthly operational budget and avoid overspending.',
      },
      {
        heading: '3. Link Your Payment Cards',
        content: 'In the "My Cards" section on the dashboard, click "+ Add new". Enter your card details — these are used for vendor payments and operational expenses. You can have multiple cards and designate a primary one for all default transactions.',
        tip: 'Use a dedicated business card rather than a personal card for cleaner financial records.',
      },
      {
        heading: '4. Invite Your First Staff Member',
        content: 'Go to the Team page from the sidebar. Click "Invite Member", enter the staff email, and choose a role (Hotel Manager, Front Desk Officer, Housekeeping Supervisor, etc.). The invited person gets an email link to set their password. Their status will show as "Pending Approval" — you must click Approve to activate them.',
      },
      {
        heading: '5. Add Your First Event to the Calendar',
        content: 'Open the Calendar page and click "+ Add Event". Fill in the event title, date, time, category, and location. This is great for tracking VIP guest arrivals, staff meetings, maintenance windows, or hotel events. You can also connect your Google Calendar for automatic sync.',
      },
    ],
  },
  1: {
    title: 'Managing Your Team Roles',
    time: '8 min read',
    color: '#fa5a2a',
    Icon: Users,
    sections: [
      {
        heading: 'Understanding Role Levels',
        content: 'Your hotel system supports a hierarchy of roles. As the Owner, you have full access to all sections. Below you, roles include: Hotel Manager (operational control), Front Desk Officer (guest check-in/out), Housekeeping Supervisor (room status), Restaurant Manager (F&B), Security Chief (access logs), and Event Coordinator (bookings).',
        tip: 'Assign the minimum required permissions for each role to maintain operational security.',
      },
      {
        heading: 'Inviting New Team Members',
        content: 'From the Team page, click the orange "Invite Member" button. Enter the staff member\'s work email and select their role from the dropdown. Once sent, they receive an email with a secure link to set their password. They appear in the table with a "Pending Approval" badge until you explicitly approve them.',
      },
      {
        heading: 'Approving a Pending Account',
        content: 'In the Team table, any member with the yellow "Pending Approval" badge needs your action. Click the green "Approve" button in their row. Their status immediately changes to "Active" and they gain access to the features permitted by their role. You will receive a notification once they log in for the first time.',
      },
      {
        heading: 'Suspending an Account',
        content: 'If a staff member is on leave, under investigation, or no longer needs active access, click the orange "Suspend" button in their row. Their login is immediately frozen — they cannot access any part of the system. Their data, reports, and history are fully preserved. You can re-activate them by clicking "Approve" again.',
        tip: 'Suspension is reversible. Use "Remove" only when you want to permanently revoke access and require a fresh invitation.',
      },
      {
        heading: 'Removing a Team Member',
        content: 'The red "Remove" button permanently deletes the staff member\'s role access from the system. Their account is unlinked from your hotel. If you need them back later, you must send a new invitation. Historical data (shift logs, activity records) is retained for audit purposes even after removal.',
      },
      {
        heading: 'Searching and Filtering',
        content: 'Use the search bar at the top of the Team table to quickly find staff by name or role. This is especially useful in larger hotels with 20+ staff members. The search is real-time and updates as you type.',
      },
    ],
  },
  2: {
    title: 'Understanding Your Revenue Dashboard',
    time: '6 min read',
    color: '#2ecc71',
    Icon: BarChart2,
    sections: [
      {
        heading: 'The Summary Cards',
        content: 'At the top of the Overview dashboard, you will see four KPI cards: Total Balance, Monthly Profit, Total Expenses, and Occupancy Rate. Each card shows the current figure, a percentage change vs. last month, and a colour indicator (green for positive, red for decline). These update in real time as transactions are processed.',
      },
      {
        heading: 'Reading the Cashflow Chart',
        content: 'The main chart shows a monthly breakdown of your income (green bars) against your expenses (orange bars). The line overlay represents your net profit trajectory. Hover over any bar to see the exact figure for that month. By default it shows the current year — use the period selector to switch between Weekly, Monthly, and Yearly views.',
        tip: 'A consistently rising profit line with stable expense bars is the ideal pattern. If expenses spike, use the Transaction History below to investigate.',
      },
      {
        heading: 'Monthly Spending Limit & Progress Bar',
        content: 'Below the chart, a progress bar tracks how much of your monthly budget has been spent. The orange fill moves in real time as expenses are logged. The figures on either side show current spend vs. your set limit. To change the limit, go to Settings → Finance.',
      },
      {
        heading: 'Wallet Overview',
        content: 'The Wallets panel shows each currency wallet (USD, EUR, GBP) with its current balance and active/inactive status. Inactive wallets are greyed out. Click any wallet to see its detailed transaction log, pending transfers, and statement downloads.',
      },
      {
        heading: 'Recent Activity Table',
        content: 'The bottom of the dashboard shows your most recent financial transactions — each row includes a timestamp, description, amount, and category. Green amounts are income (credits), red amounts are expenses (debits). Use the "See all" link to open the full transaction history with filtering and export options.',
      },
    ],
  },
  3: {
    title: 'Calendar & Google Sync Guide',
    time: '4 min read',
    color: '#f39c12',
    Icon: Calendar,
    sections: [
      {
        heading: 'Navigating the Calendar',
        content: 'The Calendar page shows a full monthly grid. Each day cell displays coloured event pills. Click any day to select it — the panel below the grid immediately shows all events for that day, including time, location, and category. Use the left/right arrows to navigate between months, or click "Today" to jump back to the current month.',
      },
      {
        heading: 'Creating a New Event',
        content: 'Click the "+ Add Event" button in the top-right of the calendar. A modal will appear. Fill in: Event Title, Time, Category (Meeting, Hospitality, Finance, Training, Event, Procurement), and Location. Click "Create Event" and it will appear on the calendar immediately. Events are colour-coded by category for quick visual scanning.',
        tip: 'Use the "Hospitality" category for all guest-related events (VIP arrivals, special occasions) so they stand out in orange on the calendar.',
      },
      {
        heading: 'Starring and Managing Events',
        content: 'Click any event pill on the calendar grid to jump to that day\'s detail panel below. The detail panel shows each event with a coloured accent bar, time, location, and category tag. Events can also be created directly from the selected-day panel by clicking "Add one?" when no events are scheduled.',
      },
      {
        heading: 'Connecting Google Calendar',
        content: 'To enable Google Calendar sync: (1) Open Google Cloud Console → Create a project. (2) Enable the Google Calendar API. (3) Create OAuth 2.0 credentials (Web Application type). (4) Add your localhost URL as an authorized origin. (5) Copy the Client ID into the Calendar.jsx file. Once configured, a "Connect Google Calendar" button appears — clicking it triggers OAuth login and imports your events automatically.',
        tip: 'Google Calendar events are shown with the same colour-coded system and appear alongside your manually created events without duplicating.',
      },
      {
        heading: 'Upcoming Events Sidebar',
        content: 'The right sidebar lists the next 6 upcoming events sorted by date. Click any item to jump directly to that day on the calendar. The colour legend below maps each event category to its colour, making it easy to understand what is happening at a glance.',
      },
    ],
  },
  4: {
    title: 'Document Management Best Practices',
    time: '7 min read',
    color: '#8b5cf6',
    Icon: FolderOpen,
    sections: [
      {
        heading: 'Uploading Documents',
        content: 'On the Documents page, click the orange "Upload File" button in the left sidebar to open your OS file picker. You can select multiple files at once. Alternatively, drag and drop files from your desktop directly onto the dashed drop zone in the main content area. Uploaded files appear at the top of the list immediately.',
        tip: 'For financial documents, always upload PDFs instead of editable formats to prevent accidental modification.',
      },
      {
        heading: 'Organising with Folders',
        content: 'Four default folders are provided: Financial Reports, Guest Contracts, Staff Records, and Maintenance Logs. Click any folder in the left sidebar to filter documents to that folder. Use consistent naming conventions — for example, "Q2_Revenue_2026.pdf" is far easier to find than "document_final_v3.pdf".',
      },
      {
        heading: 'Using Categories',
        content: 'Every document belongs to a category: Financial, Contracts, Operations, Marketing, HR, or Feedback. When uploading, assign the correct category. Use the category pills in the toolbar to filter the document list. Combined with the search bar, you can locate any document in seconds.',
      },
      {
        heading: 'Grid vs List View',
        content: 'The view toggle in the toolbar switches between Grid view (visual card-based layout — great for image-heavy files) and List view (compact table — best for large document libraries). Your preference is remembered for the session. The list view also exposes category and file size columns that are hidden in the grid.',
      },
      {
        heading: 'Starring Important Documents',
        content: 'Click the star icon on any document card or row to mark it as starred. Starred documents are accessible via the "Starred" section in the left sidebar navigation. Use this for frequently accessed files like the current season\'s rate card, the active staff schedule, or recurring financial templates.',
        tip: 'Star your active contracts and current financial reports at the start of each month for one-click access.',
      },
      {
        heading: 'Deleting and Recovery',
        content: 'Click the trash icon (in grid card menu or list view row) to delete a document. Deleted documents are removed from the active view. The Trash section in the sidebar will show deleted files — recovery options will be available in a future update. Always be certain before deleting legal or financial documents.',
      },
    ],
  },
  5: {
    title: 'Security & Access Control Overview',
    time: '5 min read',
    color: '#e74c3c',
    Icon: ShieldCheck,
    sections: [
      {
        heading: 'Role-Based Access Control',
        content: 'Every staff member has a role that determines exactly what they can see and do. The Hotel Owner (you) has full unrestricted access. Managers can see financial summaries and team members. Front Desk staff only access guest-facing features. This prevents accidental or intentional access to sensitive data.',
        tip: 'Regularly review the Team page to ensure no staff member has more permissions than their role requires.',
      },
      {
        heading: 'Enabling Two-Factor Authentication (2FA)',
        content: 'Go to Settings → Security and toggle on "Two-Factor Authentication". Scan the QR code with Google Authenticator, Authy, or any TOTP app. After enabling 2FA, every login requires your password plus a 6-digit rotating code. This prevents unauthorized access even if your password is compromised.',
      },
      {
        heading: 'Monitoring Login Activity',
        content: 'In Settings → Security, the "Login Activity" section shows a log of all recent logins — device type, IP address, location, and timestamp. If you see an unfamiliar login, you can instantly revoke all active sessions and be prompted to change your password. Unusual activity triggers an automatic email alert.',
        tip: 'Check login activity at least once a week for any sign of unauthorized access.',
      },
      {
        heading: 'Suspending Compromised Accounts',
        content: 'If you suspect a staff account has been compromised (e.g., credentials shared or a device stolen), immediately suspend the account from the Team page. Suspension instantly invalidates their session tokens — they are logged out everywhere immediately. Then contact them via a verified channel to investigate.',
      },
      {
        heading: 'Password Policies',
        content: 'All accounts must use passwords of at least 12 characters combining uppercase, lowercase, numbers, and symbols. The system blocks common passwords and requires a change every 90 days. Staff receive an email reminder 7 days before expiry. Admins can force an immediate password reset for any account from the Team management panel.',
      },
    ],
  },
};

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
  { category: 'getting-started', question: 'How do I set up my hotel owner account for the first time?', answer: 'After registration, navigate to the Overview dashboard. You will be prompted to complete your hotel profile — add your hotel name, address, star rating, and contact details. Once complete, you can begin managing rooms, staff, and finances from a single panel.' },
  { category: 'getting-started', question: 'How do I invite my hotel managers and staff?', answer: 'Go to the Team section in the sidebar. Click "Invite Member", enter their email address and select their role. They will receive an email invitation and their account will appear as "Pending Approval" until you approve it.' },
  { category: 'billing', question: 'How do I view my monthly revenue report?', answer: 'Your revenue summary is shown on the Overview dashboard. For a detailed breakdown, visit the Documents section where monthly financial reports are auto-generated, or use the Reports module to filter by date range.' },
  { category: 'billing', question: 'How do I update my payment method or wallet?', answer: 'On the Overview dashboard, scroll to the "My Cards" or "Wallets" section. Click "+ Add New" to link a new card or bank account. You can set a primary payment method and monitor monthly spending limits per wallet.' },
  { category: 'team', question: 'How do I suspend or remove a staff member\'s access?', answer: 'Navigate to the Team page. Find the staff member and click "Suspend" to temporarily freeze access, or "Remove" to permanently revoke their role. Suspended users cannot log in but their data is retained.' },
  { category: 'team', question: 'Can I assign multiple roles to one staff member?', answer: 'Currently each team member has one primary role. Multi-role support is on our roadmap for the next release.' },
  { category: 'reports', question: 'How do I read the cashflow chart on the dashboard?', answer: 'The cashflow chart shows monthly income (green bars) vs. expenses (orange bars). The line overlay represents net profit. Hover over any bar to see the exact figure. Switch between weekly, monthly, and yearly views.' },
  { category: 'security', question: 'How do I enable two-factor authentication for my account?', answer: 'Go to Settings → Security. Toggle on "Two-Factor Authentication (2FA)" and scan the QR code with an authenticator app. Each login will require a 6-digit code in addition to your password.' },
  { category: 'bookings', question: 'How do I view upcoming guest reservations?', answer: 'Open the Calendar page to see all reservations mapped to their check-in dates. Click any day to see guest name, room, and details. You can also connect Google Calendar to sync reservations automatically.' },
];

const GUIDES = [
  { title: 'Quick Start: Hotel Owner Setup', time: '5 min read', Icon: BookOpen, color: '#6366f1' },
  { title: 'Managing Your Team Roles', time: '8 min read', Icon: Users, color: '#fa5a2a' },
  { title: 'Understanding Your Revenue Dashboard', time: '6 min read', Icon: BarChart2, color: '#2ecc71' },
  { title: 'Calendar & Google Sync Guide', time: '4 min read', Icon: Calendar, color: '#f39c12' },
  { title: 'Document Management Best Practices', time: '7 min read', Icon: FolderOpen, color: '#8b5cf6' },
  { title: 'Security & Access Control Overview', time: '5 min read', Icon: ShieldCheck, color: '#e74c3c' },
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
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

// ─── Guide Article View ────────────────────────────────────────────────────────
const GuideArticle = ({ guideIndex, onBack }) => {
  const guide = GUIDE_CONTENT[guideIndex];
  const meta = GUIDES[guideIndex];
  if (!guide) return null;

  return (
    <div className="guide-article-page">
      {/* Back */}
      <button className="guide-back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Help
      </button>

      {/* Article Hero */}
      <div className="guide-article-hero" style={{ background: `linear-gradient(135deg, ${guide.color}18, ${guide.color}08)`, borderLeft: `4px solid ${guide.color}` }}>
        <div className="guide-article-icon" style={{ background: guide.color + '22' }}>
          <guide.Icon size={28} color={guide.color} />
        </div>
        <div>
          <h1 className="guide-article-title">{guide.title}</h1>
          <div className="guide-article-meta">
            <span><Clock size={13} /> {meta.time}</span>
            <span><Tag size={13} /> How-to Guide</span>
            <span><Eye size={13} /> Hotel Owner</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="guide-sections">
        {guide.sections.map((section, i) => (
          <div key={i} className="guide-section-block">
            <div className="guide-step-num" style={{ background: guide.color + '18', color: guide.color }}>Step {i + 1}</div>
            <h2 className="guide-section-heading">{section.heading}</h2>
            <p className="guide-section-content">{section.content}</p>
            {section.tip && (
              <div className="guide-tip">
                <Lightbulb size={15} color="#f39c12" />
                <span><strong>Pro Tip:</strong> {section.tip}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Done card */}
      <div className="guide-done-card">
        <CheckCircle size={28} color="#2ecc71" />
        <div>
          <h3>You're all set!</h3>
          <p>If you still have questions, browse other guides or start a live chat with our support team.</p>
        </div>
        <button className="start-chat-btn" style={{ width: 'auto', padding: '11px 22px' }}>
          <MessageCircle size={15} /> Live Chat
        </button>
      </div>
    </div>
  );
};

// ─── Main Help Page ─────────────────────────────────────────────────────────────
const Help = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openGuide, setOpenGuide] = useState(null); // null = list view, number = article

  const filteredFaqs = FAQS.filter(f => {
    const matchSearch = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    return matchSearch && matchCat;
  });

  // ── Guide Article View ──
  if (openGuide !== null) {
    return (
      <div className="help-page">
        <GuideArticle guideIndex={openGuide} onBack={() => setOpenGuide(null)} />
      </div>
    );
  }

  // ── Help Index View ──
  return (
    <div className="help-page">
      {/* Hero */}
      <div className="help-hero">
        <div className="help-hero-text">
          <h1>How can we help you?</h1>
          <p>Search our knowledge base or browse categories below.</p>
        </div>
        <div className="help-hero-search">
          <Search size={18} className="h-search-icon" />
          <input placeholder="Search for answers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="help-stats">
          <div className="help-stat"><CheckCircle size={15} /><span>9 articles</span></div>
          <div className="help-stat"><Video size={15} /><span>6 guides</span></div>
          <div className="help-stat"><MessageCircle size={15} /><span>Live chat available</span></div>
        </div>
      </div>

      <div className="help-body">
        {/* Main */}
        <div className="help-main">
          {/* Category chips */}
          <div className="help-cats">
            <button className={`help-cat-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Topics</button>
            {CATEGORIES.map(c => (
              <button key={c.id} className={`help-cat-btn ${activeCategory === c.id ? 'active' : ''}`} onClick={() => setActiveCategory(c.id)}>
                <c.Icon size={14} /> {c.label}
              </button>
            ))}
          </div>

          {/* FAQ */}
          <div className="faq-section">
            <h2 className="section-heading">
              Frequently Asked Questions
              <span className="faq-count">{filteredFaqs.length} results</span>
            </h2>
            {filteredFaqs.length > 0
              ? filteredFaqs.map((f, i) => <FaqItem key={i} item={f} />)
              : <div className="help-empty">
                  <FileQuestion size={40} />
                  <p>No results for "<strong>{search}</strong>"</p>
                  <span>Try a different keyword or browse a category above.</span>
                </div>
            }
          </div>

          {/* Guides */}
          <div className="guide-section">
            <h2 className="section-heading">Step-by-Step Guides</h2>
            <div className="guide-grid">
              {GUIDES.map((g, i) => (
                <div key={i} className="guide-card" onClick={() => setOpenGuide(i)}>
                  <div className="guide-icon" style={{ background: g.color + '22' }}>
                    <g.Icon size={22} color={g.color} />
                  </div>
                  <div className="guide-info">
                    <span className="guide-title">{g.title}</span>
                    <span className="guide-time"><Clock size={11} /> {g.time}</span>
                  </div>
                  <ArrowRight size={16} className="guide-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="help-sidebar">
          <div className="help-card">
            <h3 className="help-card-title">Browse by Topic</h3>
            <div className="topic-list">
              {CATEGORIES.map(c => (
                <button key={c.id} className="topic-item" onClick={() => setActiveCategory(c.id)}>
                  <div className="topic-icon" style={{ background: c.bg }}><c.Icon size={16} color={c.color} /></div>
                  <span className="topic-label">{c.label}</span>
                  <ArrowRight size={14} className="topic-arrow" />
                </button>
              ))}
            </div>
          </div>

          <div className="help-card contact-card">
            <div className="contact-icon"><MessageCircle size={22} color="white" /></div>
            <h3>Still need help?</h3>
            <p>Our hotel support team is available 24/7 to assist you.</p>
            <div className="contact-options">
              <a href="mailto:support@finexy.com" className="contact-btn"><Mail size={15} /> Email Support</a>
              <a href="tel:+1800000000" className="contact-btn contact-btn-outline"><Phone size={15} /> Call Us</a>
            </div>
          </div>

          <div className="help-card live-chat-card">
            <div className="live-badge"><span className="live-dot"></span>Online</div>
            <h3>Live Chat</h3>
            <p>Chat with a support agent right now — average response under 2 minutes.</p>
            <button className="start-chat-btn"><MessageCircle size={15} /> Start Live Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
