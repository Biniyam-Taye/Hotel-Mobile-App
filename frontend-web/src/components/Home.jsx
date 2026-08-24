// src/components/Home.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Wifi, Tv, AirVent, Coffee, Car, Users, Bath,
  ArrowRight, Star, Bed, Maximize, Utensils, Dumbbell, Sparkles, Calendar,
  MapPin
} from 'lucide-react';

const Home = () => {
  const usdToEtb = 57;
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

 

const rooms = [
  {
    id: 3,
    name: 'Presidential Suite',
    priceUSD: 450,
    priceETB: 450 * usdToEtb,
    capacity: 4,
    bedType: 'King Size Bed + Sofa Bed',
    size: '85 m²',
    rating: 4.8,
    location: 'Adama · Bekele Mola Hotels',
    shortDescription: 'Our most luxurious suite with private terrace and butler service.',
    features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', 'Private Terrace'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    popular: true,
    longDescription: 'The Presidential Suite is the epitome of luxury living...',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // main view
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // angle 2 – bedroom
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'  // angle 3 – bathroom/balcony
    ]
  },
  {
    id: 4,
    name: 'Standard Room',
    priceUSD: 120,
    priceETB: 120 * usdToEtb,
    capacity: 2,
    bedType: 'Double Bed',
    size: '24 m²',
    rating: 4.3,
    location: 'Adama · Bekele Mola Hotels',
    shortDescription: 'Comfortable room with all essential amenities for a pleasant stay.',
    features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    popular: false,
    longDescription: 'The Standard Room offers a comfortable and inviting space...',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 5,
    name: 'Family Suite',
    priceUSD: 320,
    priceETB: 320 * usdToEtb,
    capacity: 5,
    bedType: 'King Size Bed + 2 Twin Beds',
    size: '65 m²',
    rating: 4.7,
    location: 'Adama · Bekele Mola Hotels',
    shortDescription: 'Spacious suite designed for families with children\'s entertainment area.',
    features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Game Console'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    popular: false,
    longDescription: 'The Family Suite is perfect for families seeking space and comfort...',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 6,
    name: 'Honeymoon Suite',
    priceUSD: 380,
    priceETB: 380 * usdToEtb,
    capacity: 2,
    bedType: 'King Size Bed',
    size: '55 m²',
    rating: 4.9,
    location: 'Adama · Bekele Mola Hotels',
    shortDescription: 'Romantic suite with jacuzzi, rose petals, and sunset views.',
    features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Jacuzzi', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    popular: true,
    longDescription: 'The Honeymoon Suite is designed for romance and celebration...',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  }
];

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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

        .rooms-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        /* --- UPDATED ROOM CARD HOVER EFFECT (Bottom Colored Line) --- */
        .room-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden; /* Ensures the colored line stays inside the corners */
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: default;
          display: flex;
          flex-direction: column;
          position: relative; /* Required for the bottom line */
        }

        .room-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(212, 175, 55, 0.2);
        }

        /* The sliding colored bottom line */
        .room-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 5px;
          border-radius: 0 0 24px 24px; /* Matches the card's bottom rounded corners */
          background: var(--card-line-color, #d4af37); /* Defaults to Gold if no color is passed */
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
        }

        .room-card:hover::after {
          width: 100%;
        }

        /* --- IMAGE & BADGE OVERLAYS --- */
        .room-card .room-image {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .room-card .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .room-card:hover .room-image img {
          transform: scale(1.08);
        }

        .room-card .room-image .popular-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          font-family: 'Montserrat', sans-serif;
        }

        .room-card .room-image .price-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(6px);
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Montserrat', sans-serif;
        }
        .room-card .room-image .price-badge span {
          font-size: 10px;
          font-weight: 500;
          color: #6b7280;
        }

        /* --- DETAILS TYPOGRAPHY --- */
        .room-card .room-details {
          padding: 24px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .room-card .room-details .room-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }

        .room-card .room-details .room-header h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.2;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #ffffff;
          border: 1px solid #ffb347;
          color: #ffb347;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
        }
        .rating-badge .star {
          fill: #ffb347;
          color: #ffb347;
        }

        .room-card .room-details .short-description {
          font-family: 'Poppins', sans-serif;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.6;
          margin: 6px 0 16px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .room-card .room-details .card-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .room-card .room-details .action-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .room-card .room-details .action-buttons .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          flex: 1;
        }

        .room-card .room-details .action-buttons .btn-view {
          background: #f1f5f9;
          color: #1a1a1a;
        }

        .room-card .room-details .action-buttons .btn-view:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .room-card .room-details .action-buttons .btn-book {
          background: #d4af37;
          color: #1a1a1a;
        }

        .room-card .room-details .action-buttons .btn-book:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);
        }

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

        /* -------- MODAL STYLES -------- */
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

        @media (min-width: 768px) {
          .rooms-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .rooms-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 640px) {
          .rooms-section { padding: 60px 16px; }
          .rooms-header h2 { font-size: 28px; }
          .room-card .room-details .room-header { flex-direction: column; align-items: flex-start; gap: 6px; }
          .room-card .room-image { height: 200px; }
          .room-card .room-details { padding: 16px 18px 20px; }
          .room-card .room-details .action-buttons .btn { font-size: 12px; padding: 6px 14px; }
          .room-card .room-image .price-badge { font-size: 12px; padding: 4px 12px; }
        }

        @media (max-width: 480px) {
          .room-card .room-details .action-buttons { flex-direction: column; gap: 8px; }
          .room-card .room-details .action-buttons .btn { width: 100%; }
          .explore-all-btn { font-size: 15px; padding: 14px 24px; }
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
            {rooms.map((room) => (
              /* Added the inline style for the colored line. Defaults to Gold (#d4af37) */
              <div key={room.id} className="room-card" style={{ '--card-line-color': '#d4af37' }}>
                <div className="room-image">
                  <img src={room.image} alt={room.name} />
                  
                  {/* PRICE BADGE BACK ON IMAGE TOP-RIGHT */}
                  <div className="price-badge">
                    ETB {formatPrice(room.priceETB)} <span>/ night</span>
                  </div>

                  {/* POPULAR BADGE (Top Left) */}
                  {room.popular && (
                    <div className="popular-badge">✦ Popular</div>
                  )}
                </div>
                
                <div className="room-details">
                  <div className="room-header">
                    <h3>{room.name}</h3>
                    <div className="rating-badge">
                      <span className="star"><Star size={12} fill="#ffb347" /></span> {room.rating}
                    </div>
                  </div>
                  <p className="short-description">{room.shortDescription}</p>
                  
                  <div className="card-footer">
                    <div className="action-buttons">
                      <Link to={`/room/${room.id}`} className="btn btn-view">
                        View Details <ArrowRight size={12} />
                      </Link>
                      <button
                        className="btn btn-book"
                        onClick={(e) => openBooking(room, e)}
                      >
                        Book Now <Calendar size={12} />
                      </button>
                    </div>
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