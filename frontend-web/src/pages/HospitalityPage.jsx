// src/pages/HospitalityPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Check, ArrowLeft, Filter, ChevronDown, X, User, Lock, Calendar, LockKeyhole
} from 'lucide-react';
import { services as staticServices } from '../data/services';
import { fetchHospitalityItems } from '../services/hospitalityApi';
import EventBookingForm from "../components/EventBookingForm";

const LEGACY_CATEGORIES = ['Dining', 'Bar', 'Breakfast', 'Tour', 'Spa', 'Fitness'];

const HospitalityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activePrice, setActivePrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState('availability');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Guest');
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [checkMessage, setCheckMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (activeCategory === 'All') setSearchParams({}, { replace: true });
    else setSearchParams({ category: activeCategory }, { replace: true });
  }, [activeCategory, setSearchParams]);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    else setActiveCategory('All');
  }, [categoryParam]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setLoadError('');
        const items = await fetchHospitalityItems();
        setApiItems(items);
      } catch (err) {
        setLoadError(err.message || 'Failed to load hospitality content');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const legacyItems = staticServices.filter((item) => LEGACY_CATEGORIES.includes(item.category));
  const allServices = [...apiItems, ...legacyItems];

  const getCategoryFilter = (param) => {
    const map = {
      'Dining': ['Dining'],
      'Services': ['Services'],
      'Wellness': ['Spa', 'Fitness', 'Wellness'],
      'Events': ['Events'],
    };
    return map[param] || null;
  };

  const categories = ['All', 'Bar', 'Breakfast', 'Dining', 'Fitness', 'Spa', 'Tour', 'Services', 'Wellness', 'Events'];
  const priceRanges = ['All', '100-300', '300-500', '500-1000'];
  const sortOptions = [
    { id: 'popular', label: 'Popularity' },
    { id: 'price-low', label: 'Price Low to High' },
    { id: 'price-high', label: 'Price High to Low' },
    { id: 'newest', label: 'Newest First' },
  ];

  const categoryFilter = getCategoryFilter(activeCategory);
  const filteredByCategory = categoryFilter
    ? allServices.filter((s) => categoryFilter.includes(s.category))
    : allServices;
  const filteredByPrice = filteredByCategory.filter(s => {
    if (activePrice === 'All') return true;
    if (activePrice === '100-300') return s.price >= 100 && s.price <= 300;
    if (activePrice === '300-500') return s.price >= 300 && s.price <= 500;
    if (activePrice === '500-1000') return s.price >= 500 && s.price <= 1000;
    return true;
  });

  const sortedServices = [...filteredByPrice].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  const openBookingModal = (service) => {
    setSelectedService(service);
    setBookingStep('availability');
    setCheckInDate('');
    setCheckOutDate('');
    setAvailabilityStatus(null);
    setLoginError('');
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsChecking(false);
    setAvailabilityStatus(null);
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  };

  const handleCheckAvailability = () => {
    const checkIn = parseDate(checkInDate);
    const checkOut = parseDate(checkOutDate);
    if (!checkIn || !checkOut) {
      setAvailabilityStatus('unavailable');
      setCheckMessage("Please select both dates.");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkIn < today) {
      setAvailabilityStatus('unavailable');
      setCheckMessage("Dates are in the past.");
      return;
    }
    if (checkOut <= checkIn) {
      setAvailabilityStatus('unavailable');
      setCheckMessage("Check-out must be after Check-in.");
      return;
    }
    setIsChecking(true);
    setAvailabilityStatus(null);
    setCheckMessage('');
    setTimeout(() => {
      setIsChecking(false);
      setAvailabilityStatus('available');
      setCheckMessage("Great news! Dates are available.");
    }, 1500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setTimeout(() => {
      setIsLoggedIn(true);
      setBookingStep('form');
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ══ Page shell ══ */
        .hp {
          background: #f0f1f5;
          min-height: 100vh;
          padding: 110px 0 90px;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .hp-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ══ Page header ══ */
        .hp-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .hp-header .lbl {
          display: inline-block;
          color: #c9970c;
          font-size: 11px; font-weight: 800;
          letter-spacing: 3px; text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hp-header h1 {
          font-family: 'Georgia', serif;
          font-size: 42px; font-weight: 700;
          color: #111827; margin: 0 0 12px;
        }
        .hp-header p {
          font-size: 16px; color: #6b7280;
          max-width: 580px; margin: 0 auto; line-height: 1.65;
        }

        /* ══ Layout: sidebar + grid ══ */
        .hp-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 32px;
          align-items: start;
        }

        /* ══ Sidebar ══ */
        .sidebar {
          background: #fff;
          border-radius: 18px;
          padding: 24px 20px;
          border: 1px solid #e9eaf0;
          height: fit-content;
          position: sticky;
          top: 100px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .sb-x-row {
          display: flex; justify-content: flex-end; margin-bottom: 8px;
        }
        .sb-x-btn {
          background: #f3f4f6; border: none; cursor: pointer;
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280; transition: background 0.15s;
        }
        .sb-x-btn:hover { background: #fee2e2; color: #b91c1c; }
        .sb-section-title {
          font-size: 10px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #374151; margin-bottom: 12px;
        }
        .sb-list {
          list-style: none; padding: 0; margin: 0 0 20px;
        }
        .sb-list li {
          padding: 9px 10px; border-radius: 9px;
          cursor: pointer; font-size: 14px; color: #6b7280;
          transition: all 0.15s; display: flex;
          align-items: center; justify-content: space-between;
        }
        .sb-list li:hover { background: #fef9ec; color: #c9970c; }
        .sb-list li.active {
          background: #fef9ec; color: #c9970c;
          font-weight: 700;
        }
        .sb-divider { border: none; border-top: 1px solid #f1f3f8; margin: 16px 0; }

        /* sort radio */
        .sort-option {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 9px;
          cursor: pointer; font-size: 14px; color: #6b7280;
          transition: background 0.15s;
        }
        .sort-option:hover { background: #f9fafb; }
        .sort-option.active { color: #c9970c; font-weight: 600; }
        .radio-circle {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid #d1d5db;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color 0.15s;
        }
        .sort-option.active .radio-circle { border-color: #d4af37; }
        .inner {
          width: 8px; height: 8px; border-radius: 50%;
          background: transparent; transition: background 0.15s;
        }
        .sort-option.active .inner { background: #d4af37; }

        /* mobile toggle */
        .mobile-filter-toggle {
          display: none; width: 100%; padding: 12px 20px;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
          font-size: 14px; font-weight: 600; color: #1a1a1a;
          cursor: pointer; font-family: inherit;
          justify-content: space-between; align-items: center;
          margin-bottom: 16px;
        }
        .mobile-filter-toggle:hover { border-color: #d4af37; }
        .sidebar-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.4); z-index: 999;
        }
        .sidebar-overlay.active { display: block; }

        /* ══ 3-column card grid ══ */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ══ SERVICE CARD – Nike-style ══ */
        .svc-card {
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          display: flex;
          flex-direction: column;
          cursor: default;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14);
        }

        /* ── Top image section ── */
        .svc-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f3f4f6;
        }
        .svc-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .svc-card:hover .svc-img-wrap img {
          transform: scale(1.06);
        }

        /* "Popular" badge – top-left overlay */
        .svc-badge {
          position: absolute; top: 14px; left: 14px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(4px);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11px; font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        /* category pill – top-right overlay */
        .svc-cat-pill {
          position: absolute; top: 14px; right: 14px;
          background: rgba(212,175,55,0.92);
          backdrop-filter: blur(4px);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11px; font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.3px;
        }

        /* ── Card content ── */
        .svc-body {
          display: flex; flex-direction: column;
          padding: 18px 18px 20px;
          gap: 6px; flex: 1;
        }

        /* provider / hotel name */
        .svc-provider {
          font-size: 11px; font-weight: 700;
          color: #c9970c; text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        /* service title */
        .svc-title {
          font-size: 17px; font-weight: 800;
          color: #111827; margin: 0; line-height: 1.3;
        }

        /* description */
        .svc-desc {
          font-size: 13px; color: #6b7280;
          line-height: 1.6; margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* location */
        .svc-loc {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: #9ca3af;
        }
        .svc-loc svg { color: #d4af37; flex-shrink: 0; }

        /* amenity tags */
        .svc-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-top: 2px;
        }
        .svc-tag {
          display: flex; align-items: center; gap: 4px;
          padding: 3px 10px;
          background: #f3f4f6; border-radius: 999px;
          font-size: 11px; color: #4b5563; font-weight: 500;
        }
        .svc-tag svg { color: #d4af37; }

        /* spacer */
        .svc-spacer { flex: 1; }

        /* ── Card footer: price pill + Book Now ── */
        .svc-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px; margin-top: 14px;
        }
        /* price pill – dark rounded */
        .svc-price-pill {
          display: flex; align-items: center;
          background: #f3f4f6;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 15px; font-weight: 800;
          color: #111827;
          letter-spacing: -0.3px;
          white-space: nowrap;
        }
        /* "Book Now →" dark button */
        .svc-book-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #111827; color: #fff;
          border: none; cursor: pointer;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 700;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          font-family: inherit;
        }
        .svc-book-btn:hover {
          background: #1f2937;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.28);
        }
        .svc-book-btn:active { transform: scale(0.97); }

        /* ══ Status / empty states ══ */
        .hp-status {
          text-align: center; padding: 60px 24px;
          color: #9ca3af; font-size: 15px;
          grid-column: 1 / -1;
        }
        .hp-status.err { color: #b91c1c; }
        @keyframes spin2 { to { transform: rotate(360deg); } }
        .spin2 { animation: spin2 1s linear infinite; }

        /* ══ MODAL (fully preserved) ══ */
        .booking-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .booking-modal { background: #fff; border-radius: 20px; max-width: 480px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.2); position: relative; display: flex; flex-direction: column; }
        .booking-modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f3f5; display: flex; justify-content: space-between; align-items: center; }
        .booking-modal-header h3 { margin: 0; font-size: 18px; color: #1a1a1a; font-weight: 700; }
        .booking-modal-close { background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b7280; transition: all 0.3s ease; }
        .booking-modal-close:hover { background: #ef4444; color: #fff; }
        .booking-modal-body { padding: 24px; overflow-y: auto; }

        .step-indicator { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; }
        .step-indicator::before { content: ''; position: absolute; top: 12px; left: 0; right: 0; height: 2px; background: #e5e7eb; z-index: 0; }
        .step-item { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 12px; color: #9ca3af; position: relative; z-index: 1; width: 33%; }
        .step-item.active { color: #d4af37; font-weight: 700; }
        .step-num { width: 24px; height: 24px; border-radius: 50%; background: #fff; border: 2px solid #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
        .step-item.active .step-num { background: #d4af37; border-color: #d4af37; color: #fff; }

        .avail-check-box { text-align: center; padding: 0 10px; }
        .avail-check-box svg { color: #d4af37; margin-bottom: 12px; }
        .avail-check-box h4 { margin: 0 0 8px; color: #1a1a1a; font-size: 20px; }
        .avail-check-box p { color: #6b7280; font-size: 14px; margin-bottom: 24px; line-height: 1.6; }

        .booking-form-stack { display: flex; flex-direction: column; gap: 16px; text-align: left; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 14px; font-weight: 700; color: #1a1a1a; }

        .date-input-wrapper { position: relative; }
        .date-input-wrapper input[type="date"] { width: 100%; height: 48px; padding: 0 44px 0 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff; font-family: inherit; font-size: 14px; color: #1a1a1a; outline: none; transition: all 0.2s ease; -webkit-appearance: none; appearance: none; }
        .date-input-wrapper input[type="date"]:focus { border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        input[type="date"]::-webkit-datetime-edit { -webkit-appearance: none; appearance: none; color: #6b7280; }
        input[type="date"]::-webkit-datetime-edit-fields-wrapper { background: transparent; }
        input[type="date"]::-webkit-datetime-edit-month-field:focus,
        input[type="date"]::-webkit-datetime-edit-day-field:focus,
        input[type="date"]::-webkit-datetime-edit-year-field:focus { background: transparent; color: #1a1a1a; outline: none; }
        input[type="date"]:valid::-webkit-datetime-edit { color: #1a1a1a; }
        input[type="date"]::-webkit-calendar-picker-indicator { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; cursor: pointer; opacity: 0.6; }

        .select-wrapper { position: relative; }
        .select-wrapper select { width: 100%; height: 48px; padding: 0 44px 0 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff; font-family: inherit; font-size: 14px; color: #1a1a1a; outline: none; transition: all 0.2s ease; cursor: pointer; appearance: none; -webkit-appearance: none; }
        .select-wrapper select:focus { border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        .select-wrapper svg { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        .status-msg { display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 10px; font-size: 14px; margin-bottom: 16px; justify-content: center; }
        .status-msg.available { background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; }
        .status-msg.unavailable { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; }

        .btn-primary { width: 100%; height: 48px; background: #d4af37; color: #1a1a1a; border: none; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s ease; font-family: inherit; margin-top: 4px; letter-spacing: 0.5px; }
        .btn-primary:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
        .btn-primary:hover:not(:disabled) { background: #c5a028; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }

        .secure-note { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-top: 16px; }
        .loading-spinner { border: 3px solid rgba(0,0,0,0.1); border-top: 3px solid #d4af37; border-radius: 50%; width: 20px; height: 20px; animation: spin2 1s linear infinite; }

        .login-box { text-align: center; }
        .login-box .input-group { margin-bottom: 16px; text-align: left; }
        .login-box label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .login-box .input-wrapper { position: relative; }
        .login-box .input-wrapper svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .login-box input { width: 100%; padding: 12px 12px 12px 40px; background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 10px; font-family: inherit; font-size: 14px; outline: none; transition: all 0.2s; }
        .login-box input:focus { background: #fff; border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        .error-msg { color: #ef4444; font-size: 13px; margin-top: 8px; }

        /* ══ Responsive ══ */
        @media (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          .hp-layout { grid-template-columns: 1fr; }
          .sidebar { position: static; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .mobile-filter-toggle { display: flex; }
          .sidebar { position: fixed; top: 0; right: -100%; width: 85%; max-width: 320px; height: 100vh; border-radius: 0; border: none; box-shadow: -4px 0 30px rgba(0,0,0,0.12); padding: 24px 20px; overflow-y: auto; z-index: 1000; transition: right 0.3s ease; }
          .sidebar.open { right: 0; }
        }
        @media (max-width: 560px) {
          .hp { padding: 90px 0 60px; }
          .hp-inner { padding: 0 16px; }
          .hp-header h1 { font-size: 30px; }
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hp">
        <div className="hp-inner">

          {/* ── Page Header ── */}
          <div className="hp-header">
            <div className="lbl">✦ Discover Hospitality</div>
            <h1>Discover Hospitality</h1>
            <p>Discover dining, spa, massage, tours, and hotel services from our partner properties.</p>
          </div>

          {/* mobile toggle */}
          <button className="mobile-filter-toggle" onClick={() => setMobileMenuOpen(true)}>
            <span><Filter size={16} /> Filters &amp; Sort</span>
            <ChevronDown size={16} />
          </button>

          <div className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />

          <div className="hp-layout">

            {/* ════ Sidebar ════ */}
            <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
              <div className="sb-x-row">
                <button className="sb-x-btn" onClick={() => setMobileMenuOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <div className="sb-section-title">Category</div>
              <ul className="sb-list">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => { setActiveCategory(cat); if (window.innerWidth <= 860) setMobileMenuOpen(false); }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              <hr className="sb-divider" />
              <div className="sb-section-title">Price (ETB)</div>
              <ul className="sb-list">
                {priceRanges.map((range) => (
                  <li
                    key={range}
                    className={activePrice === range ? 'active' : ''}
                    onClick={() => { setActivePrice(range); if (window.innerWidth <= 860) setMobileMenuOpen(false); }}
                  >
                    {range === 'All' ? 'All Prices' : `${range.replace('-', ' – ')} ETB`}
                  </li>
                ))}
              </ul>

              <hr className="sb-divider" />
              <div className="sb-section-title">Sort by</div>
              {sortOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`sort-option ${sortBy === opt.id ? 'active' : ''}`}
                  onClick={() => { setSortBy(opt.id); if (window.innerWidth <= 860) setMobileMenuOpen(false); }}
                >
                  <div className="radio-circle"><div className="inner" /></div>
                  {opt.label}
                </div>
              ))}
            </aside>

            {/* ════ 3-column Card Grid ════ */}
            <div className="services-grid">
              {loading ? (
                <div className="hp-status">Loading hospitality content…</div>
              ) : loadError ? (
                <div className="hp-status err">{loadError}</div>
              ) : sortedServices.length === 0 ? (
                <div className="hp-status">No services found for the selected filters.</div>
              ) : (
                sortedServices.map((service) => (
                  <div key={service.id} className="svc-card">

                    {/* ── Top: full-width image with overlays ── */}
                    <div className="svc-img-wrap">
                      <img src={service.image} alt={service.title} loading="lazy" />

                      {/* "Popular" badge top-left */}
                      {service.popular && (
                        <div className="svc-badge">✦ Popular</div>
                      )}

                      {/* Category pill top-right */}
                      <div className="svc-cat-pill">{service.category}</div>
                    </div>

                    {/* ── Card body ── */}
                    <div className="svc-body">
                      {/* provider */}
                      {service.provider && (
                        <div className="svc-provider">{service.provider}</div>
                      )}

                      {/* title */}
                      <h3 className="svc-title">{service.title}</h3>

                      {/* description */}
                      <p className="svc-desc">{service.description}</p>

                      {/* location */}
                      {service.location && (
                        <div className="svc-loc">
                          <MapPin size={13} />
                          {service.location}
                        </div>
                      )}

                      {/* amenity tags */}
                      {service.amenities?.length > 0 && (
                        <div className="svc-tags">
                          {service.amenities.map((a, i) => (
                            <span key={i} className="svc-tag">
                              <Check size={11} /> {a}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="svc-spacer" />

                      {/* ── Footer: price pill + Book Now ── */}
                      <div className="svc-footer">
                        <div className="svc-price-pill">
                          {service.displayPrice || `From ${service.price.toLocaleString()} ETB`}
                          {service.priceSuffix && ` ${service.priceSuffix}`}
                        </div>
                        <button className="svc-book-btn" onClick={() => openBookingModal(service)}>
                          Book Now <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ════ Booking Modal (fully preserved) ════ */}
      {selectedService && (
        <div className="booking-modal-overlay" onClick={closeModal}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="booking-modal-header">
              <h3>Book: {selectedService.title}</h3>
              <button className="booking-modal-close" onClick={closeModal}><X size={18} /></button>
            </div>

            <div className="booking-modal-body">
              <div className="step-indicator">
                <div className={`step-item ${bookingStep === 'availability' ? 'active' : ''}`}>
                  <div className="step-num">1</div> Availability
                </div>
                <div className={`step-item ${bookingStep === 'login' ? 'active' : ''}`}>
                  <div className="step-num">2</div> Login
                </div>
                <div className={`step-item ${bookingStep === 'form' ? 'active' : ''}`}>
                  <div className="step-num">3</div> Book
                </div>
              </div>

              {bookingStep === 'availability' && (
                <div className="avail-check-box">
                  <Calendar size={48} />
                  <h4>Check Availability</h4>
                  <p>Select your dates to see if {selectedService.title} is available.</p>

                  <div className="booking-form-stack">
                    <div className="form-group">
                      <label>Check-In</label>
                      <div className="date-input-wrapper">
                        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Check-Out</label>
                      <div className="date-input-wrapper">
                        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Guests</label>
                      <div className="select-wrapper">
                        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5+ Guests</option>
                        </select>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {availabilityStatus === 'available' && <div className="status-msg available"><Check size={16} /> {checkMessage}</div>}
                  {availabilityStatus === 'unavailable' && <div className="status-msg unavailable"><X size={16} /> {checkMessage}</div>}

                  <button className="btn-primary" onClick={handleCheckAvailability} disabled={isChecking}>
                    {isChecking ? (<><div className="loading-spinner" /> Checking...</>) : (<>Check Availability <ArrowRight size={16} /></>)}
                  </button>

                  <div className="secure-note">
                    <LockKeyhole size={14} /> You won't be charged yet
                  </div>

                  {availabilityStatus === 'available' && (
                    <button className="btn-primary" style={{ marginTop: '12px', background: '#059669', color: 'white' }} onClick={() => setBookingStep(isLoggedIn ? 'form' : 'login')}>
                      Continue to Booking <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}

              {bookingStep === 'login' && (
                <div className="login-box">
                  <h4 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>Login Required</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>You must be logged in to proceed.</p>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                      <label>Email Address</label>
                      <div className="input-wrapper"><User size={16} /><input type="email" placeholder="you@example.com" required /></div>
                    </div>
                    <div className="input-group">
                      <label>Password</label>
                      <div className="input-wrapper"><Lock size={16} /><input type="password" placeholder="••••••••" required /></div>
                    </div>
                    {loginError && <div className="error-msg">{loginError}</div>}
                    <button type="submit" className="btn-primary">Login &amp; Continue <ArrowRight size={16} /></button>
                  </form>
                </div>
              )}

              {bookingStep === 'form' && (
                <div>
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={16} /> Confirmed for {checkInDate} to {checkOutDate}!
                  </div>
                  <EventBookingForm key={selectedService.id} roomName={selectedService.title} roomPrice={selectedService.price} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalityPage;