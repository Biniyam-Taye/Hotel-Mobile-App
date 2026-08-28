// src/components/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowRight, Star, Calendar,
} from 'lucide-react';
import { fetchPublishedRooms, formatPrice } from '../services/roomApi';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
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

    loadRooms();
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    alert('🎉 Booking confirmed! We will contact you shortly.');
    setShowBooking(false);
    setSelectedRoom(null);
  };

  const openBooking = (room, e) => {
    e.preventDefault();
    setSelectedRoom(room);
    setShowBooking(true);
  };

  return (
    <>
      <style>{`
        /* Updated Fonts - Montserrat (Titles) + Poppins (Body) */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

        .rooms-section {
          padding: 80px 24px;
          background: #f8f9fa;
        }

        .rooms-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .rooms-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .rooms-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: 'Montserrat', sans-serif;
        }

        /* --- UPDATED TITLE HOVER EFFECT (Background Pop) --- */
        .rooms-header h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.2;
          display: inline-block;
          padding: 0 8px;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: default;
        }

        .rooms-header h2:hover {
          background: rgba(212, 175, 55, 0.08);
          transform: scale(1.02);
        }

        .rooms-header p {
          font-family: 'Poppins', sans-serif;
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ====== ROOMS GRID — 4 columns ====== */
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ====== ROOM CARD BASE ====== */
        .room-card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      box-shadow 0.38s ease, border-color 0.38s ease;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .room-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.11);
          border-color: rgba(212, 175, 55, 0.30);
        }

        /* Animated gold bottom accent */
        .room-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 3px;
          border-radius: 0 0 18px 18px;
          background: linear-gradient(90deg, #d4af37, #f5d879);
          transition: width 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
        }
        .room-card:hover::after { width: 100%; }

        /* ====== ROOM IMAGE ====== */
        .room-card .room-image {
          position: relative;
          height: 215px;
          overflow: hidden;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .room-card .room-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }

        .room-card:hover .room-image img { transform: scale(1.07); }

        /* Gradient overlay */
        .room-card .room-image::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.28) 0%,
            transparent 50%,
            rgba(0,0,0,0.18) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* ── Price pill — top right ─────────────────────── */
        .room-card .room-image .price-badge {
          position: absolute;
          top: 10px; right: 10px;
          z-index: 2;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 5px 11px;
          border-radius: 9999px;
          display: flex;
          align-items: baseline;
          gap: 3px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.14);
          font-family: 'Montserrat', sans-serif;
          line-height: 1;
          white-space: nowrap;
        }
        .price-badge .price-amount {
          font-size: 12px;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.3px;
        }
        .price-badge .price-label {
          font-size: 9.5px;
          font-weight: 500;
          color: #8a8f98;
        }

        /* ── Popular pill — top left ────────────────────── */
        .room-card .room-image .popular-badge {
          position: absolute;
          top: 10px; left: 10px;
          z-index: 2;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #3d2e00;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 3px 10px rgba(212,175,55,0.50);
          font-family: 'Montserrat', sans-serif;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        /* ====== ROOM DETAILS ====== */
        .room-card .room-details {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Name + rating row */
        .room-card .room-details .room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .room-card .room-details .room-header h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.9px;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.3;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Rating chip */
        .rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: #fffbeb;
          border: 1.5px solid #f59e0b;
          color: #92400e;
          padding: 3px 8px;
          border-radius: 9999px;
          font-size: 10.5px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .rating-badge .star svg {
          fill: #f59e0b;
          color: #f59e0b;
          vertical-align: middle;
        }

        /* Thin divider */
        .room-card .room-details .card-divider {
          height: 1px;
          background: linear-gradient(90deg, #ececec, transparent);
          margin: 8px 0;
        }

        /* Description */
        .room-card .room-details .short-description {
          font-family: 'Poppins', sans-serif;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.6;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        /* ====== ACTION BUTTONS — side by side 2-col ====== */
        .room-card .room-details .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .room-card .room-details .action-buttons .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 9px 6px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 11.5px;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
          box-sizing: border-box;
          letter-spacing: 0.1px;
        }

        /* View Details — clean outline pill */
        .room-card .room-details .action-buttons .btn-view {
          background: transparent;
          color: #4b5563;
          border: 1.5px solid #d1d5db;
        }
        .room-card .room-details .action-buttons .btn-view:hover {
          background: #fafafa;
          border-color: #d4af37;
          color: #1a1a1a;
          box-shadow: 0 3px 10px rgba(0,0,0,0.07);
          transform: translateY(-1px);
        }

        /* Book Now — gold pill */
        .room-card .room-details .action-buttons .btn-book {
          background: linear-gradient(135deg, #c9a227 0%, #e8c848 55%, #c9a227 100%);
          background-size: 200% auto;
          color: #1a1a1a;
          border: none;
          font-weight: 700;
          box-shadow: 0 3px 12px rgba(212,175,55,0.32);
          transition: background-position 0.4s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .room-card .room-details .action-buttons .btn-book:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(212,175,55,0.45);
        }

        /* ====== EXPLORE BUTTON ====== */
        .explore-all-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 60px;
        }

        .explore-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 36px;
          border: 2px solid #d4af37;
          border-radius: 9999px;
          color: #d4af37;
          background: transparent;
          font-weight: 700;
          font-size: 18px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }

        .explore-all-btn:hover {
          background: #d4af37;
          color: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .explore-all-btn .arrow-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #d4af37;
          transition: all 0.3s ease;
        }

        .explore-all-btn:hover .arrow-circle {
          background: #1a1a1a;
          border-color: #1a1a1a;
          color: #d4af37;
        }

        /* ====== RESPONSIVE ====== */
        @media (max-width: 1199px) {
          .rooms-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
          .room-card .room-image { height: 240px; }
        }
        @media (min-width: 1200px) {
          .rooms-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
        }
        @media (max-width: 640px) {
          .rooms-section { padding: 60px 16px; }
          .rooms-grid { grid-template-columns: 1fr; gap: 16px; }
          .rooms-header h2 { font-size: 28px; }
          .room-card .room-image { height: 220px; }
          .room-card .room-details { padding: 14px 16px 16px; }
          .room-card .room-details .action-buttons .btn { font-size: 11.5px; padding: 8px 10px; }
        }
        @media (max-width: 380px) {
          .explore-all-btn { font-size: 15px; padding: 14px 24px; }
        }

        /* ====== MODAL STYLES ====== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #ffffff;
          border-radius: 20px;
          max-width: 520px;
          width: 100%;
          padding: 32px;
          animation: slideUp 0.4s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content .modal-close {
          float: right;
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.3s;
        }

        .modal-content .modal-close:hover {
          color: #1a1a1a;
        }

        .modal-content h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .modal-content .modal-price {
          color: #d4af37;
          font-size: 28px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
        }

        .modal-content .modal-price span {
          font-size: 14px;
          color: #6b7280;
          font-weight: 400;
        }

        .modal-content .form-group {
          margin: 16px 0;
        }

        .modal-content .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
          font-family: 'Poppins', sans-serif;
        }

        .modal-content .form-group input,
        .modal-content .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .modal-content .form-group input:focus,
        .modal-content .form-group select:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .modal-content .btn-confirm {
          width: 100%;
          padding: 14px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .modal-content .btn-confirm:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }

        .modal-content .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }


      `}</style>

      <section className="rooms-section" id="rooms">
        <div className="rooms-container">
          <div className="rooms-header">
            <div className="label">✦ ACCOMMODATIONS</div>
            <h2>Luxury <span style={{ color: '#d4af37' }}>Rooms & Suites</span></h2>
            <p>
              Experience comfort and elegance in our beautifully designed rooms,
              each crafted to provide the perfect stay.
            </p>
          </div>

          <div className="rooms-grid">
            {loading && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>Loading rooms...</p>
            )}
            {error && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#b91c1c' }}>{error}</p>
            )}
            {!loading && !error && rooms.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>No rooms available at the moment.</p>
            )}
            {!loading && rooms.slice(0, 4).map((room) => (
              <div key={room.id} className="room-card">
                {/* Image + Overlays */}
                <div className="room-image">
                  <img src={room.image} alt={room.name} />

                  {/* Price pill — top right */}
                  <div className="price-badge">
                    <span className="price-amount">ETB {formatPrice(room.priceETB)}</span>
                    <span className="price-label">/ night</span>
                  </div>

                  {/* Popular — bottom left (no overlap with price) */}
                  {room.popular && (
                    <div className="popular-badge">
                      ✦ Popular
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="room-details">
                  <div className="room-header">
                    <h3 title={room.name}>{room.name}</h3>
                    <div className="rating-badge">
                      <span className="star"><Star size={11} fill="#f59e0b" /></span>
                      {room.rating}
                    </div>
                  </div>

                  <div className="card-divider" />

                  <p className="short-description">{room.shortDescription}</p>

                  <div className="action-buttons">
                    <Link to={`/room/${room.id}`} className="btn btn-view">
                      <ArrowRight size={13} /> View Details
                    </Link>
                    <button
                      className="btn btn-book"
                      onClick={(e) => openBooking(room, e)}
                    >
                      <Calendar size={13} /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="explore-all-wrapper">
            <Link to="/rooms" className="explore-all-btn">
              Explore All Rooms
              <span className="arrow-circle">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Booking Modal ---- */}
      {showBooking && selectedRoom && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBooking(false)}>✕</button>
            <h3>{selectedRoom.name}</h3>
            <div className="modal-price">
              ETB {formatPrice(selectedRoom.priceETB)} <span>/ night</span>
            </div>

            <form onSubmit={handleBooking}>
              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input type="date" required />
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 234 567 890" required />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select required>
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-confirm">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;