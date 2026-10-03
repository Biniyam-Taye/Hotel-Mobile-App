// src/pages/RoomsPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Wifi,
  Wind,
  Sparkles,
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowRight,
  Calendar,
  Check,
  Bed,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPublishedRooms, formatPrice } from '../services/roomApi';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedGuests, setSelectedGuests] = useState('all');

  // Booking Modal
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPublishedRooms();
        setRooms(data);
      } catch (err) {
        setError(err.message || 'Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter types available
  const propertyTypes = [
    { id: 'single', label: 'Single Bed' },
    { id: 'double', label: 'Double Bed' },
    { id: 'luxury', label: 'Luxury Room' },
    { id: 'suite', label: 'Family Suite' },
    { id: 'honeymoon', label: 'Honeymoon Suite' },
    { id: 'presidential', label: 'Presidential Suite' },
  ];

  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: '0-5000', label: 'ETB 0 to 5,000' },
    { id: '5000-15000', label: 'ETB 5,000 to 15,000' },
    { id: '15000-25000', label: 'ETB 15,000 to 25,000' },
    { id: '25000+', label: 'ETB 25,000+' },
  ];

  const handleTypeToggle = (typeLabel) => {
    setSelectedTypes(prev =>
      prev.includes(typeLabel)
        ? prev.filter(t => t !== typeLabel)
        : [...prev, typeLabel]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedPriceRange('all');
    setSelectedGuests('all');
  };

  // Filtered rooms logic
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = room.name.toLowerCase().includes(term);
        const matchesDesc = room.shortDescription.toLowerCase().includes(term);
        const matchesLoc = (room.location || '').toLowerCase().includes(term);
        if (!matchesName && !matchesDesc && !matchesLoc) return false;
      }

      // Property type checkbox filter
      if (selectedTypes.length > 0) {
        const roomNameLower = room.name.toLowerCase();
        const bedLower = (room.bedType || '').toLowerCase();
        const matchesType = selectedTypes.some(t => {
          const target = t.toLowerCase();
          return roomNameLower.includes(target) || bedLower.includes(target);
        });
        if (!matchesType) return false;
      }

      // Price range
      if (selectedPriceRange !== 'all') {
        const price = room.priceETB;
        if (selectedPriceRange === '0-5000' && price > 5000) return false;
        if (selectedPriceRange === '5000-15000' && (price < 5000 || price > 15000)) return false;
        if (selectedPriceRange === '15000-25000' && (price < 15000 || price > 25000)) return false;
        if (selectedPriceRange === '25000+' && price < 25000) return false;
      }

      // Guests
      if (selectedGuests !== 'all') {
        const cap = room.capacity || 2;
        if (selectedGuests === '1' && cap !== 1) return false;
        if (selectedGuests === '2' && cap !== 2) return false;
        if (selectedGuests === '3+' && cap < 3) return false;
      }

      return true;
    });
  }, [rooms, searchTerm, selectedTypes, selectedPriceRange, selectedGuests]);

  const openBookingModal = (room, e) => {
    e.preventDefault();
    setSelectedRoom(room);
    setShowBooking(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    alert('🎉 Booking submitted! We will confirm your reservation shortly.');
    setShowBooking(false);
    setSelectedRoom(null);
  };

  const renderStars = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="stars-wrapper">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < fullStars ? '#f59e0b' : 'none'}
            color={i < fullStars ? '#f59e0b' : '#cbd5e1'}
          />
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

        .rooms-page-bg {
          min-height: 100vh;
          background: #f8fafc;
          padding-top: 100px;
          padding-bottom: 90px;
          font-family: 'Poppins', sans-serif;
        }

        .rooms-page-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Top Hero Header */
        .rooms-header-banner {
          margin-bottom: 40px;
        }

        .rooms-hero-title {
          font-family: 'Cinzel', 'Georgia', serif;
          font-size: 44px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .rooms-hero-title .highlight-gold {
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .rooms-sub-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 26px;
          border-left: 4px solid #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          max-width: 820px;
          color: #475569;
          font-size: 15px;
          line-height: 1.6;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .rooms-sub-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
        }

        /* 2-Column Layout Grid */
        .rooms-main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 36px;
          align-items: start;
        }

        /* Left Column: Horizontal Room Cards with larger gap */
        .rooms-list-column {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .horizontal-room-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          overflow: hidden;
          display: flex;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .horizontal-room-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0px;
          background: linear-gradient(180deg, #d4af37 0%, #f5d879 100%);
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 3;
        }

        .horizontal-room-card:hover {
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12), 0 0 20px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.4);
        }

        .horizontal-room-card:hover::before {
          width: 5px;
        }

        .room-card-image-wrapper {
          width: 320px;
          min-width: 320px;
          position: relative;
          overflow: hidden;
          background: #f1f5f9;
        }

        .room-card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease;
        }

        .horizontal-room-card:hover .room-card-image-wrapper img {
          transform: scale(1.09);
          filter: brightness(1.03);
        }

        .popular-badge-chip {
          position: absolute;
          top: 14px;
          left: 14px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #1a1a1a;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 13px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.45);
          font-family: 'Montserrat', sans-serif;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .horizontal-room-card:hover .popular-badge-chip {
          transform: scale(1.05);
        }

        .room-card-content {
          padding: 26px 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .room-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .location-tag {
          color: #d4af37;
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stars-wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-number {
          font-size: 12.5px;
          font-weight: 700;
          color: #334155;
          margin-left: 3px;
          font-family: 'Montserrat', sans-serif;
        }

        .room-card-title {
          font-family: 'Cinzel', 'Georgia', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .horizontal-room-card:hover .room-card-title {
          color: #d4af37;
          transform: translateX(2px);
        }

        .room-address-sub {
          color: #64748b;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 16px;
        }

        /* Amenity Chips Row */
        .amenities-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }

        .amenity-chip {
          background: #f1f5f9;
          color: #475569;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid transparent;
          transition: all 0.25s ease;
        }

        .amenity-chip:hover {
          background: #fdfbf7;
          border-color: rgba(212, 175, 55, 0.4);
          color: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.12);
        }

        /* Card Footer */
        .room-card-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
        }

        .price-starting-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 2px;
        }

        .price-amount-display {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          transition: color 0.3s ease;
        }

        .horizontal-room-card:hover .price-amount-display {
          color: #d4af37;
        }

        .price-unit {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
        }

        .card-actions-wrapper {
          display: flex;
          gap: 12px;
        }

        .btn-room-details {
          padding: 11px 20px;
          border: 1.5px solid #cbd5e1;
          border-radius: 9999px;
          color: #334155;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: #ffffff;
        }

        .btn-room-details:hover {
          border-color: #d4af37;
          color: #1a1a1a;
          background: #fdfbf7;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.2);
        }

        .btn-room-book {
          padding: 11px 24px;
          background: linear-gradient(135deg, #1a1a24 0%, #0f172a 100%);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
        }

        .btn-room-book:hover {
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #1a1a1a;
          box-shadow: 0 8px 22px rgba(212, 175, 55, 0.5);
          transform: translateY(-2px);
        }

        /* Right Column: Refine Search Sidebar */
        .filter-sidebar-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          overflow: hidden;
          position: sticky;
          top: 100px;
        }

        .filter-header-bar {
          background: #fdfbf7;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .filter-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-icon-btn {
          width: 36px;
          height: 36px;
          background: #c94d41;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .filter-heading-text {
          font-family: 'Cinzel', serif;
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .clear-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: #ef4444;
        }

        .filter-body-padding {
          padding: 24px;
        }

        /* Search input box */
        .filter-search-box {
          position: relative;
          margin-bottom: 24px;
        }

        .filter-search-box input {
          width: 100%;
          padding: 11px 16px 11px 40px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .filter-search-box input:focus {
          border-color: #d4af37;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .filter-search-box svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        /* Filter Section Group */
        .filter-group {
          margin-bottom: 24px;
        }

        .filter-section-label {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 12px;
          display: block;
          font-family: 'Montserrat', sans-serif;
        }

        .checkbox-options-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #334155;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s;
        }

        .checkbox-item:hover {
          color: #d4af37;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          border: 1.5px solid #cbd5e1;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .checkbox-item.active .custom-checkbox {
          background: #d4af37;
          border-color: #d4af37;
          color: #ffffff;
        }

        /* Price radio list */
        .radio-options-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .radio-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #334155;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .radio-item:hover {
          background: #f8fafc;
        }

        .radio-item.active {
          background: #fdfbf7;
          color: #a16207;
          font-weight: 600;
        }

        .custom-radio {
          width: 16px;
          height: 16px;
          border: 2px solid #cbd5e1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .radio-item.active .custom-radio {
          border-color: #d4af37;
        }

        .radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d4af37;
        }

        /* Empty results state */
        .no-results-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 48px 24px;
          text-align: center;
          border: 1px dashed #cbd5e1;
          color: #64748b;
        }

        /* Modal Styles */
        .booking-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }

        .booking-modal-card {
          background: #ffffff;
          border-radius: 24px;
          max-width: 520px;
          width: 100%;
          padding: 32px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          position: relative;
        }

        /* Responsive Layout Breakpoints */
        @media (max-width: 1024px) {
          .rooms-main-grid {
            grid-template-columns: 1fr;
          }
          .filter-sidebar-card {
            position: relative;
            top: 0;
            margin-bottom: 32px;
          }
        }

        @media (max-width: 768px) {
          .horizontal-room-card {
            flex-direction: column;
          }
          .room-card-image-wrapper {
            width: 100%;
            height: 220px;
          }
          .rooms-hero-title {
            font-size: 32px;
          }
          .room-card-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .card-actions-wrapper {
            width: 100%;
          }
          .btn-room-details, .btn-room-book {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>

      <div className="rooms-page-bg">
        <div className="rooms-page-container">

          {/* Header Section matching 2nd design */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rooms-header-banner"
          >
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rooms-hero-title"
            >
              Find Your <span className="highlight-gold">Perfect Stay</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, boxShadow: '0 12px 32px rgba(212, 175, 55, 0.18)' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rooms-sub-card"
            >
              Take advantage of our limited-time offers and special packages to enhance your
              stay and create unforgettable memories at Villa Alpha International Hotel.
            </motion.div>
          </motion.div>

          {/* Main 2-Column Layout */}
          <div className="rooms-main-grid">

            {/* LEFT COLUMN: Rooms List */}
            <div className="rooms-list-column">
              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                  Loading available rooms...
                </div>
              )}

              {error && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444' }}>
                  {error}
                </div>
              )}

              {!loading && !error && filteredRooms.length === 0 && (
                <div className="no-results-card">
                  <SlidersHorizontal size={36} color="#94a3b8" style={{ marginBottom: '12px' }} />
                  <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>No Rooms Match Your Filters</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px' }}>
                    Try clearing or adjusting your search filters to find available accommodations.
                  </p>
                  <button className="btn-room-details" onClick={handleClearFilters}>
                    Clear All Filters
                  </button>
                </div>
              )}

              {!loading && !error && filteredRooms.map((room, idx) => (
                <motion.div 
                  key={room.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ y: -7, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: Math.min(idx * 0.08, 0.3) }}
                  className="horizontal-room-card"
                >

                  {/* Image Block */}
                  <div className="room-card-image-wrapper">
                    <img src={room.image} alt={room.name} loading="lazy" />
                    {room.popular && (
                      <div className="popular-badge-chip">✦ Popular</div>
                    )}
                  </div>

                  {/* Content Block */}
                  <div className="room-card-content">
                    <div>
                      {/* Meta Top: Location & Stars */}
                      <div className="room-meta-top">
                        <span className="location-tag">
                          {room.location || 'Adama'}
                        </span>
                        {renderStars(room.rating)}
                      </div>

                      {/* Room Title */}
                      <h2 className="room-card-title">{room.name}</h2>

                      {/* Location Address */}
                      <div className="room-address-sub">
                        <MapPin size={13} color="#94a3b8" /> Main Road, Adama
                      </div>

                      {/* Amenity Chips */}
                      <div className="amenities-chip-row">
                        <motion.span whileHover={{ scale: 1.06 }} className="amenity-chip">
                          <Wifi size={12} color="#0284c7" /> Free Wifi
                        </motion.span>
                        <motion.span whileHover={{ scale: 1.06 }} className="amenity-chip">
                          <Wind size={12} color="#06b6d4" /> Air Conditioning
                        </motion.span>
                        <motion.span whileHover={{ scale: 1.06 }} className="amenity-chip">
                          <Sparkles size={12} color="#d4af37" /> Housekeeping
                        </motion.span>
                        {room.capacity && (
                          <motion.span whileHover={{ scale: 1.06 }} className="amenity-chip">
                            <Users size={12} color="#8b5cf6" /> {room.capacity} Guests
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Footer: Price & Action Buttons */}
                    <div className="room-card-bottom">
                      <div>
                        <span className="price-starting-label">Starting from</span>
                        <span className="price-amount-display">
                          ETB {formatPrice(room.priceETB)}
                        </span>
                        <span className="price-unit"> /night</span>
                      </div>

                      <div className="card-actions-wrapper">
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                          <Link to={`/room/${room.id}`} className="btn-room-details">
                            View Details <ArrowRight size={14} />
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-room-book"
                          onClick={(e) => openBookingModal(room, e)}
                        >
                          Book Now <ArrowRight size={14} />
                        </motion.button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>


            {/* RIGHT COLUMN: Refine Search Sidebar */}
            <div className="filter-sidebar-column">
              <div className="filter-sidebar-card">

                {/* Filter Header */}
                <div className="filter-header-bar">
                  <div className="filter-title-group">
                    <div className="filter-icon-btn">
                      <SlidersHorizontal size={18} />
                    </div>
                    <h3 className="filter-heading-text">Refine Search</h3>
                  </div>

                  {(searchTerm || selectedTypes.length > 0 || selectedPriceRange !== 'all' || selectedGuests !== 'all') && (
                    <button className="clear-btn" onClick={handleClearFilters}>
                      <X size={14} /> Clear
                    </button>
                  )}
                </div>

                <div className="filter-body-padding">

                  {/* Search Input Box */}
                  <div className="filter-search-box">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search rooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter Group 1: PROPERTY TYPE */}
                  <div className="filter-group">
                    <span className="filter-section-label">PROPERTY TYPE</span>
                    <div className="checkbox-options-list">
                      {propertyTypes.map(type => {
                        const isActive = selectedTypes.includes(type.label);
                        return (
                          <div
                            key={type.id}
                            className={`checkbox-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleTypeToggle(type.label)}
                          >
                            <div className="custom-checkbox">
                              {isActive && <Check size={12} />}
                            </div>
                            <span>{type.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter Group 2: PRICE PER NIGHT */}
                  <div className="filter-group">
                    <span className="filter-section-label">PRICE PER NIGHT</span>
                    <div className="radio-options-list">
                      {priceRanges.map(p => {
                        const isActive = selectedPriceRange === p.id;
                        return (
                          <div
                            key={p.id}
                            className={`radio-item ${isActive ? 'active' : ''}`}
                            onClick={() => setSelectedPriceRange(p.id)}
                          >
                            <div className="custom-radio">
                              {isActive && <div className="radio-dot" />}
                            </div>
                            <span>{p.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter Group 3: GUESTS CAPACITY */}
                  <div className="filter-group" style={{ marginBottom: 0 }}>
                    <span className="filter-section-label">GUESTS CAPACITY</span>
                    <div className="radio-options-list">
                      {[
                        { id: 'all', label: 'Any Capacity' },
                        { id: '1', label: '1 Guest' },
                        { id: '2', label: '2 Guests' },
                        { id: '3+', label: '3+ Guests' },
                      ].map(g => {
                        const isActive = selectedGuests === g.id;
                        return (
                          <div
                            key={g.id}
                            className={`radio-item ${isActive ? 'active' : ''}`}
                            onClick={() => setSelectedGuests(g.id)}
                          >
                            <div className="custom-radio">
                              {isActive && <div className="radio-dot" />}
                            </div>
                            <span>{g.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Quick Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="booking-modal-overlay"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="booking-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
                onClick={() => setShowBooking(false)}
              >
                ✕
              </button>
              <h2 style={{ fontFamily: 'Cinzel, serif', margin: '0 0 4px 0', fontSize: '24px' }}>
                {selectedRoom.name}
              </h2>
              <div style={{ color: '#d4af37', fontWeight: 800, fontSize: '24px', marginBottom: '16px', fontFamily: 'Montserrat, sans-serif' }}>
                ETB {formatPrice(selectedRoom.priceETB)} <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 400 }}>/ night</span>
              </div>

              <form onSubmit={handleConfirmBooking}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Check-in</label>
                    <input type="date" required style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Check-out</label>
                    <input type="date" required style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" required style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #d4af37 0%, #f5d879 100%)',
                    color: '#1a1a1a',
                    border: 'none',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    boxShadow: '0 4px 15px rgba(212,175,55,0.4)',
                  }}
                >
                  Confirm Reservation
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}