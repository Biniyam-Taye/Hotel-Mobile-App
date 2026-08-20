// src/components/Offers.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Clock, Star, X } from 'lucide-react';

const Offers = () => {
  // State for the booking modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const openBookingModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  const offers = [
    {
      id: 1,
      title: 'Early Bird Special',
      subtitle: 'Book 30+ Days in Advance',
      description: 'Plan ahead and save big! Enjoy 25% off on all room types when you book at least 30 days before your stay.',
      discount: '25% OFF',
      price: '6,840',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      validUntil: 'Valid until Dec 31, 2026',
      icon: Calendar,
      popular: true
    },
    {
      id: 2,
      title: 'Romantic Getaway',
      subtitle: 'Perfect for Couples',
      description: 'Includes champagne on arrival, rose petal turndown, couples spa treatment, and a candlelit dinner.',
      discount: '15% OFF',
      price: '7,250',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      validUntil: 'Valid until Feb 28, 2026',
      icon: Star,
      popular: false
    },
    {
      id: 3,
      title: 'Family Fun Package',
      subtitle: 'Great for Families',
      description: 'Includes connecting rooms, complimentary kids meals, free airport transfers, and a family activity pass.',
      discount: '20% OFF',
      price: '9,100',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      validUntil: 'Valid until Aug 31, 2026',
      icon: Users,
      popular: true
    },
    {
      id: 4,
      title: 'Business Class',
      subtitle: 'For Corporate Travelers',
      description: 'Includes executive room, airport transfers, meeting room access, and complimentary business services.',
      discount: '10% OFF',
      price: '8,500',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      validUntil: 'Valid until Dec 31, 2026',
      icon: Clock,
      popular: false
    }
  ];

  return (
    <>
      <style>{`
        /* --- MAIN OFFERS CSS --- */
        .offers-section {
          padding: 80px 24px;
          background: #ffffff;
        }

        .offers-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .offers-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .offers-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .offers-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          display: inline-block;
          padding: 0 8px;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: default;
        }

        .offers-header h2:hover {
          background: rgba(212, 175, 55, 0.08);
          transform: scale(1.02);
        }

        .offers-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .offer-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .offer-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.2);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }

        .offer-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 5px;
          border-radius: 0 0 16px 16px;
          background: var(--card-line-color, #d4af37);
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
        }

        .offer-card:hover::after {
          width: 100%;
        }

        .offer-card .offer-image {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .offer-card .offer-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .offer-card:hover .offer-image img {
          transform: scale(1.06);
        }

        .offer-card .offer-image .discount-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ef4444;
          color: #ffffff;
          padding: 4px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .offer-card .offer-image .popular-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .offer-card .offer-details {
          padding: 18px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .offer-card .offer-details .offer-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.08);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 10px;
        }

        .offer-card .offer-details .offer-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 2px;
        }

        .offer-card .offer-details .offer-subtitle {
          font-size: 12px;
          color: #d4af37;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .offer-card .offer-details .offer-description {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0 0 12px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .offer-card .offer-details .offer-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid #f1f3f5;
          flex-wrap: wrap;
          gap: 8px;
        }

        .offer-card .offer-details .offer-footer .valid {
          font-size: 11px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .offer-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        /* ===== FIXED: VIEW DETAILS BUTTON - TEXT ALWAYS VISIBLE ===== */
        .btn-view-details {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 18px;
          border: 2px solid #d4af37;
          background: transparent;
          color: #d4af37;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          min-width: 120px;
        }

        .btn-view-details:hover {
          background: #d4af37;
          color: #1a1a1a !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* ===== FIXED: BOOK NOW BUTTON ===== */
        .btn-book-offer {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 20px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          min-width: 120px;
        }

        .btn-book-offer:hover {
          background: #c5a028;
          color: #1a1a1a !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
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
          font-family: 'Poppins', sans-serif;
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

        @media (min-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          .offer-card .offer-image {
            height: 200px;
          }
          .offers-section {
            padding: 100px 24px;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .offer-card .offer-image {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .offers-section {
            padding: 60px 16px;
          }
          .offers-header h2 {
            font-size: 28px;
          }
          .offer-card .offer-image {
            height: 180px;
          }
          .offer-card .offer-details {
            padding: 16px;
          }
          .offer-card .offer-details .offer-title {
            font-size: 16px;
          }
          .offer-card .offer-details .offer-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .offer-actions {
            width: 100%;
          }
          .btn-view-details,
          .btn-book-offer {
            flex: 1;
            justify-content: center;
            font-size: 12px;
            padding: 6px 12px;
            min-width: auto;
          }
          .explore-all-btn {
            font-size: 15px;
            padding: 14px 24px;
          }
        }

        /* --- MODAL POP-UP CSS --- */
        .booking-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .booking-modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .booking-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          position: relative;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
          transform: scale(0.9) translateY(20px);
          transition: all 0.3s ease;
        }
        .booking-modal-overlay.active .booking-modal {
          transform: scale(1) translateY(0);
        }
        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          transition: color 0.2s;
        }
        .modal-close-btn:hover {
          color: #1a1a1a;
        }
        .modal-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .modal-price {
          font-size: 28px;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 4px;
        }
        .modal-price span {
          font-size: 14px;
          font-weight: 400;
          color: #6b7280;
        }
        .modal-package-details {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          margin: 12px 0 20px 0;
          border-left: 4px solid #d4af37;
        }
        .modal-package-details .modal-subtitle {
          font-size: 14px;
          color: #d4af37;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .modal-package-details .modal-desc {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }
        .modal-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 16px 0 20px 0;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .form-control {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #1a1a1a;
          background: #ffffff;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-control:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .btn-confirm-booking {
          width: 100%;
          padding: 16px;
          margin-top: 8px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-confirm-booking:hover {
          background: #c5a028;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }
        @media (max-width: 480px) {
          .booking-modal {
            padding: 24px 16px;
          }
          .modal-title {
            font-size: 22px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="offers-section" id="offers">
        <div className="offers-container">
          <div className="offers-header">
            <div className="label">✦ Special Offers</div>
            <h2>Exclusive <span style={{ color: '#d4af37' }}>Deals & Packages</span></h2>
            <p>
              Make your stay even more memorable with our handpicked offers.
              Book now to enjoy these limited-time benefits.
            </p>
          </div>

          <div className="offers-grid">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="offer-card" 
                style={{ '--card-line-color': '#d4af37' }}
              >
                <div className="offer-image">
                  <img src={offer.image} alt={offer.title} />
                  <div className="discount-badge">{offer.discount}</div>
                  {offer.popular && (
                    <div className="popular-badge">✦ Popular</div>
                  )}
                </div>
                <div className="offer-details">
                  <div className="offer-icon">
                    <offer.icon size={18} />
                  </div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <div className="offer-subtitle">{offer.subtitle}</div>
                  <p className="offer-description">{offer.description}</p>
                  
                  <div className="offer-footer">
                    <span className="valid">
                      <Clock size={12} /> {offer.validUntil}
                    </span>
                    <div className="offer-actions">
                      <Link to={`/offers/${offer.id}`} className="btn-view-details">
                        View Details <ArrowRight size={14} />
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          openBookingModal(offer);
                        }} 
                        className="btn-book-offer"
                      >
                        Book Now <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="explore-all-wrapper">
            <Link to="/offers" className="explore-all-btn">
              Explore All Offers
              <span className="arrow-circle">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- DETAILED BOOKING MODAL POPUP --- */}
      <div className={`booking-modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="booking-modal">
          <button className="modal-close-btn" onClick={closeBookingModal}>
            <X size={24} />
          </button>
          
          <h2 className="modal-title">{selectedOffer?.title}</h2>
          <div className="modal-price">
            ETB {selectedOffer?.price} <span>/ night</span>
          </div>

          <div className="modal-package-details">
            <div className="modal-subtitle">{selectedOffer?.subtitle}</div>
            <p className="modal-desc">{selectedOffer?.description}</p>
          </div>
          
          <div className="modal-divider"></div>

          <h4 style={{ margin: '0 0 16px 0', color: '#1a1a1a' }}>Book This Package</h4>
          <form onSubmit={(e) => { e.preventDefault(); alert('Booking Confirmed!'); closeBookingModal(); }}>
            <div className="form-row-2">
              <div className="form-group">
                <label>Check-in Date</label>
                <input type="date" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input type="date" className="form-control" required />
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" placeholder="john@example.com" required />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" className="form-control" placeholder="+1 234 567 890" required />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <select className="form-control">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-confirm-booking">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Offers;