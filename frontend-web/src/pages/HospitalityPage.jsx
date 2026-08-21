// src/pages/HospitalityPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Check, ArrowLeft, Filter, ChevronDown, X, User, Lock, Calendar, LockKeyhole
} from 'lucide-react';
import { services } from '../data/services';
import EventBookingForm from "../components/EventBookingForm";

const HospitalityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activePrice, setActivePrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const filteredByCategory = categoryFilter ? services.filter(s => categoryFilter.includes(s.category)) : services;
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

  // ===== FIX: CORRECT LOCAL DATE PARSING (Fixes the "Past Date" bug) =====
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-'); // Input is YYYY-MM-DD
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-11 in JS
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const handleCheckAvailability = () => {
    const checkIn = parseDate(checkInDate);
    const checkOut = parseDate(checkOutDate);

    if (!checkIn || !checkOut) {
      setAvailabilityStatus('unavailable');
      setCheckMessage("Please select both dates.");
      return;
    }

    // Set today's date to midnight for accurate comparison
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
        .hospitality-page { background: #f8f9fa; min-height: 100vh; padding: 120px 24px 80px; }
        .hospitality-container { max-width: 1200px; margin: 0 auto; }
        .hospitality-header { text-align: center; margin-bottom: 40px; }
        .hospitality-header .label { color: #d4af37; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .hospitality-header h1 { font-family: 'Georgia', serif; font-size: 40px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
        .hospitality-header p { color: #6b7280; font-size: 16px; max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .hospitality-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; }
        .sidebar { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e5e7eb; height: fit-content; position: sticky; top: 100px; }
        .sidebar .sidebar-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a; margin-bottom: 12px; }
        .sidebar .category-list, .sidebar .price-list { list-style: none; padding: 0; margin: 0 0 20px 0; }
        .sidebar .category-list li, .sidebar .price-list li { padding: 6px 0; cursor: pointer; color: #6b7280; font-size: 14px; transition: color 0.3s ease; border-bottom: 1px solid #f1f3f5; }
        .sidebar .category-list li:last-child, .sidebar .price-list li:last-child { border-bottom: none; }
        .sidebar .category-list li:hover, .sidebar .price-list li:hover { color: #d4af37; }
        .sidebar .category-list li.active, .sidebar .price-list li.active { color: #d4af37; font-weight: 600; }
        .sidebar .divider { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }

        .mobile-filter-toggle { display: none; width: 100%; padding: 12px 20px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 14px; font-weight: 600; color: #1a1a1a; cursor: pointer; font-family: 'Poppins', sans-serif; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mobile-filter-toggle:hover { border-color: #d4af37; }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 999; }
        .sidebar-overlay.active { display: block; }

        .service-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; transition: all 0.4s ease; margin-bottom: 24px; }
        .service-card:last-child { margin-bottom: 0; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); border-color: rgba(212,175,55,0.15); }
        .service-card .card-inner { display: grid; grid-template-columns: 300px 1fr; gap: 0; }
        .service-card .card-image { height: auto; min-height: 260px; overflow: hidden; position: relative; }
        .service-card .card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .service-card:hover .card-image img { transform: scale(1.05); }
        .service-card .card-image .popular-badge { position: absolute; top: 16px; right: 16px; background: #d4af37; color: #1a1a1a; padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .service-card .card-body { padding: 24px; display: flex; flex-direction: column; }
        .service-card .card-body .provider { font-size: 12px; font-weight: 600; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .service-card .card-body .title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px; }
        .service-card .card-body .description { font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 12px; flex: 1; }
        .service-card .card-body .location { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 12px; }
        .service-card .card-body .location svg { color: #d4af37; }
        .service-card .card-body .amenities { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .service-card .card-body .amenities .amenity { display: flex; align-items: center; gap: 4px; padding: 4px 12px; background: #f3f4f6; border-radius: 9999px; font-size: 12px; color: #4b5563; }
        .service-card .card-body .amenities .amenity svg { color: #d4af37; }
        .service-card .card-body .card-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: auto; padding-top: 12px; border-top: 1px solid #f1f3f5; }
        .service-card .card-body .card-footer .price { font-size: 20px; font-weight: 700; color: #d4af37; }
        .service-card .card-body .card-footer .price span { font-size: 14px; font-weight: 400; color: #6b7280; }
        .service-card .card-body .card-footer .btn-order { display: inline-flex; align-items: center; gap: 6px; padding: 8px 24px; background: #d4af37; color: #1a1a1a; border: none; border-radius: 9999px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; text-decoration: none; }
        .service-card .card-body .card-footer .btn-order:hover { background: #c5a028; transform: translateY(-2px); box-shadow: 0 4px 20px rgba(212,175,55,0.3); }

        /* MODAL */
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

        /* STACKED FORM */
        .booking-form-stack { display: flex; flex-direction: column; gap: 16px; text-align: left; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 14px; font-weight: 700; color: #1a1a1a; }

        /* ===== NATIVE INPUTS (FIXED NO BLUE HIGHLIGHT) ===== */
        .date-input-wrapper { position: relative; }
        .date-input-wrapper input[type="date"] {
          width: 100%;
          height: 48px;
          padding: 0 44px 0 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          font-family: inherit;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
          transition: all 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .date-input-wrapper input[type="date"]:focus { border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }

        /* Kills the ugly blue highlight completely */
        input[type="date"]::-webkit-datetime-edit { -webkit-appearance: none; appearance: none; color: #6b7280; }
        input[type="date"]::-webkit-datetime-edit-fields-wrapper { background: transparent; }
        input[type="date"]::-webkit-datetime-edit-month-field:focus,
        input[type="date"]::-webkit-datetime-edit-day-field:focus,
        input[type="date"]::-webkit-datetime-edit-year-field:focus {
          background: transparent;
          color: #1a1a1a;
          outline: none;
        }
        
        /* Makes the input dark once a date is picked */
        input[type="date"]:valid::-webkit-datetime-edit { color: #1a1a1a; }

        /* Calendar Icon on the right */
        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          cursor: pointer;
          opacity: 0.6;
        }

        /* Select Dropdown */
        .select-wrapper { position: relative; }
        .select-wrapper select {
          width: 100%;
          height: 48px;
          padding: 0 44px 0 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          font-family: inherit;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
          transition: all 0.2s ease;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
        .select-wrapper select:focus { border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        .select-wrapper svg { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        .status-msg { display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 10px; font-size: 14px; margin-bottom: 16px; justify-content: center; }
        .status-msg.available { background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; }
        .status-msg.unavailable { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; }

        .btn-primary { width: 100%; height: 48px; background: #d4af37; color: #1a1a1a; border: none; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; margin-top: 4px; letter-spacing: 0.5px; }
        .btn-primary:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
        .btn-primary:hover:not(:disabled) { background: #c5a028; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }

        .secure-note { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-top: 16px; }
        .secure-note svg { width: 14px; height: 14px; }

        .loading-spinner { border: 3px solid rgba(0,0,0,0.1); border-top: 3px solid #d4af37; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .login-box { text-align: center; }
        .login-box .input-group { margin-bottom: 16px; text-align: left; }
        .login-box label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .login-box .input-wrapper { position: relative; }
        .login-box .input-wrapper svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .login-box input { width: 100%; padding: 12px 12px 12px 40px; background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 10px; font-family: inherit; font-size: 14px; outline: none; transition: all 0.2s; }
        .login-box input:focus { background: #fff; border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        .error-msg { color: #ef4444; font-size: 13px; margin-top: 8px; }

        @media (max-width: 1024px) {
          .hospitality-layout { grid-template-columns: 240px 1fr; gap: 24px; }
          .service-card .card-inner { grid-template-columns: 240px 1fr; }
        }
        @media (max-width: 768px) {
          .hospitality-page { padding: 100px 16px 60px; }
          .hospitality-header h1 { font-size: 30px; }
          .hospitality-layout { grid-template-columns: 1fr; gap: 16px; }
          .mobile-filter-toggle { display: flex; }
          .sidebar { position: fixed; top: 0; right: -100%; width: 85%; max-width: 340px; height: 100vh; border-radius: 0; border: none; box-shadow: -4px 0 30px rgba(0,0,0,0.1); padding: 24px 20px; overflow-y: auto; z-index: 1000; transition: right 0.3s ease; }
          .sidebar.open { right: 0; }
          .sidebar-close { display: flex; justify-content: flex-end; margin-bottom: 16px; }
          .sidebar-close button { background: none; border: none; cursor: pointer; color: #6b7280; padding: 4px; }
          .service-card .card-inner { grid-template-columns: 1fr; }
          .service-card .card-image { height: 200px; min-height: 0; }
          .service-card .card-body .card-footer { flex-direction: column; align-items: stretch; }
          .service-card .card-body .card-footer .btn-order { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hospitality-page { padding: 90px 12px 40px; }
          .service-card .card-image { height: 180px; }
        }
      `}</style>

      <div className="hospitality-page">
        <div className="hospitality-container">
          <div className="hospitality-header">
            <div className="label">✦ Discover Hospitality</div>
            <h1>Discover Hospitality</h1>
            <p>Discover dining, spa, massage, tours, and hotel services from our partner properties.</p>
          </div>

          <button className="mobile-filter-toggle" onClick={() => setMobileMenuOpen(true)}>
            <span><Filter size={16} /> Filters & Sort</span>
            <ChevronDown size={16} />
          </button>

          <div className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

          <div className="hospitality-layout">
            <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
              <div className="sidebar-close">
                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
              </div>

              <div className="sidebar-title">CATEGORY</div>
              <ul className="category-list">
                {categories.map((cat) => (
                  <li key={cat} className={activeCategory === cat ? 'active' : ''} onClick={() => { setActiveCategory(cat); if (window.innerWidth <= 768) setMobileMenuOpen(false); }}>{cat}</li>
                ))}
              </ul>

              <hr className="divider" />
              <div className="sidebar-title">PRICE (ETB)</div>
              <ul className="price-list">
                {priceRanges.map((range) => (
                  <li key={range} className={activePrice === range ? 'active' : ''} onClick={() => { setActivePrice(range); if (window.innerWidth <= 768) setMobileMenuOpen(false); }}>
                    {range === 'All' ? 'All' : `${range.replace('-', ' to ')} ETB`}
                  </li>
                ))}
              </ul>

              <hr className="divider" />
              <div className="sidebar-title">SORT RESULTS BY</div>
              <div className="sort-options">
                {sortOptions.map((option) => (
                  <div key={option.id} className={`sort-option ${sortBy === option.id ? 'active' : ''}`} onClick={() => { setSortBy(option.id); if (window.innerWidth <= 768) setMobileMenuOpen(false); }}>
                    <div className="radio-circle"><div className="inner"></div></div>
                    {option.label}
                  </div>
                ))}
              </div>
            </aside>

            <div className="services-list">
              {sortedServices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No services found.</div>
              ) : (
                sortedServices.map((service) => (
                  <div key={service.id} className="service-card">
                    <div className="card-inner">
                      <div className="card-image">
                        <img src={service.image} alt={service.title} loading="lazy" />
                        {service.popular && <div className="popular-badge">✦ Popular</div>}
                      </div>
                      <div className="card-body">
                        <div className="provider">{service.provider}</div>
                        <h3 className="title">{service.title}</h3>
                        <p className="description">{service.description}</p>
                        <div className="location"><MapPin size={14} /> {service.location}</div>
                        <div className="amenities">
                          {service.amenities.map((amenity, idx) => (
                            <span key={idx} className="amenity"><Check size={12} /> {amenity}</span>
                          ))}
                        </div>
                        <div className="card-footer">
                          <div className="price">ETB {service.price.toLocaleString()} <span>/ person</span></div>
                          <button className="btn-order" onClick={() => openBookingModal(service)}>Book Now <ArrowRight size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

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
                    {isChecking ? (<><div className="loading-spinner"></div> Checking...</>) : (<>Check Availability <ArrowRight size={16} /></>)}
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
                    <button type="submit" className="btn-primary">Login & Continue <ArrowRight size={16} /></button>
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