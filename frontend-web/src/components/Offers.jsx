// src/components/Offers.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Clock, Star, X } from 'lucide-react';
import { fetchPublicOffers } from '../services/offersApi';
import { initiateStripeCheckout } from '../services/paymentApi';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Booking modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // ── Fetch live offers from backend ──────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setLoadError('');
        const data = await fetchPublicOffers();
        setOffers(data);
      } catch (err) {
        setLoadError(err.message || 'Failed to load offers');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openBookingModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

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
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .offer-card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2),
                      box-shadow 0.4s ease, border-color 0.4s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .offer-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 22px 44px rgba(0,0,0,0.12), 0 0 0 1px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.35);
        }

        .offer-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          border-radius: 0 0 18px 18px;
          background: linear-gradient(90deg, #d4af37, #f5d879);
          transition: width 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 3;
        }

        .offer-card:hover::after {
          width: 100%;
        }

        .offer-card .offer-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .offer-card .offer-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
        }

        .offer-card:hover .offer-image img {
          transform: scale(1.08) rotate(1deg);
        }

        .offer-card .offer-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.25) 0%,
            transparent 50%,
            rgba(0,0,0,0.15) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .offer-card .offer-image .hover-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, rgba(212, 175, 55, 0.18) 100%);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .offer-card:hover .offer-image .hover-vignette {
          opacity: 1;
        }

        .offer-card .offer-image .discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ef4444;
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 11.5px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          z-index: 2;
          font-family: 'Montserrat', sans-serif;
        }

        .offer-card .offer-image .popular-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #3d2e00;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 3px 10px rgba(212,175,55,0.50);
          z-index: 2;
          font-family: 'Montserrat', sans-serif;
        }

        .offer-card .offer-details {
          padding: 14px 16px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .offer-card .offer-details .offer-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.4s ease;
        }
        .offer-card:hover .offer-details .offer-title {
          transform: translateX(4px);
          color: #d4af37;
        }

        .offer-card .offer-details .offer-subtitle {
          font-size: 10.5px;
          color: #d4af37;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .offer-card .offer-details .offer-description {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0 0 10px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.4s ease;
        }
        .offer-card:hover .offer-details .offer-description {
          color: #374151;
        }

        .offer-card .offer-details .offer-footer {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
        }

        .offer-card .offer-details .offer-footer .valid {
          font-size: 11px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Poppins', sans-serif;
        }

        .offer-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
        }

        .btn-view-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 6px;
          border: 1.5px solid #d1d5db;
          background: transparent;
          color: #4b5563;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .btn-view-details:hover {
          background: #fafafa;
          border-color: #d4af37;
          color: #1a1a1a !important;
          box-shadow: 0 3px 10px rgba(0,0,0,0.07);
          transform: translateY(-1px);
        }

        .btn-book-offer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 6px;
          background: linear-gradient(135deg, #c9a227 0%, #e8c848 55%, #c9a227 100%);
          background-size: 200% auto;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 11.5px;
          cursor: pointer;
          transition: background-position 0.4s ease, transform 0.25s ease, box-shadow 0.25s ease;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          box-sizing: border-box;
          box-shadow: 0 3px 12px rgba(212,175,55,0.32);
        }

        .btn-book-offer:hover {
          background-position: right center;
          color: #1a1a1a !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 7px 20px rgba(212,175,55,0.45);
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

        /* ── Responsive Grid ── */
        @media (max-width: 1199px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
          .offer-card .offer-image {
            height: 220px;
          }
        }

        @media (max-width: 640px) {
          .offers-section {
            padding: 60px 16px;
          }
          .offers-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .offers-header h2 {
            font-size: 28px;
          }
          .offer-card .offer-image {
            height: 200px;
          }
          .offer-card .offer-details {
            padding: 14px 16px 16px;
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
            <h2>Exclusive <span style={{ color: '#d4af37' }}>Deals &amp; Packages</span></h2>
            <p>
              Make your stay even more memorable with our handpicked offers.
              Book now to enjoy these limited-time benefits.
            </p>
          </div>

          {/* ── Content States ── */}
          {loading ? (
            <div className="offers-status">Loading offers…</div>
          ) : loadError ? (
            <div className="offers-status err">{loadError}</div>
          ) : offers.length === 0 ? (
            <div className="offers-status">No special offers available at the moment. Check back soon!</div>
          ) : (
            <>
              <div className="offers-grid">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="offer-card"
                    style={{ '--card-line-color': '#d4af37' }}
                  >
                    <div className="offer-image">
                      <img src={offer.image} alt={offer.title} loading="lazy" />
                      <div className="hover-vignette" />
                      {offer.discount && (
                        <div className="discount-badge">{offer.discount}</div>
                      )}
                      {offer.popular && (
                        <div className="popular-badge">✦ Popular</div>
                      )}
                    </div>

                    <div className="offer-details">
                      <div className="offer-icon">
                        <Calendar size={18} />
                      </div>
                      <h3 className="offer-title">{offer.title}</h3>
                      {offer.subtitle && (
                        <div className="offer-subtitle">{offer.subtitle}</div>
                      )}
                      <p className="offer-description">{offer.description}</p>

                      <div className="offer-footer">
                        {offer.validUntil && (
                          <span className="valid">
                            <Clock size={12} /> Valid until {offer.validUntil}
                          </span>
                        )}
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
            </>
          )}
        </div>
      </section>

      {/* --- BOOKING MODAL POPUP --- */}
      <div className={`booking-modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="booking-modal">
          <button className="modal-close-btn" onClick={closeBookingModal}>
            <X size={24} />
          </button>

          <h2 className="modal-title">{selectedOffer?.title}</h2>
          {selectedOffer?.packagePricing && (
            <div className="modal-price">
              {selectedOffer.packagePricing} <span>/ package</span>
            </div>
          )}

          <div className="modal-package-details">
            {selectedOffer?.subtitle && (
              <div className="modal-subtitle">{selectedOffer.subtitle}</div>
            )}
            <p className="modal-desc">{selectedOffer?.description}</p>
          </div>

          <div className="modal-divider" />

          <h4 style={{ margin: '0 0 16px 0', color: '#1a1a1a' }}>Book This Package</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            const emailInput = e.target.email?.value || '';
            const nameInput = e.target.fullName?.value || '';
            closeBookingModal();
            initiateStripeCheckout({
              title: `Offer Package - ${selectedOffer?.title || 'Special Deal'}`,
              amount: selectedOffer?.price || 200,
              relatedType: 'Offer',
              customerEmail: emailInput,
              customerName: nameInput,
            });
          }}>
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
                <input type="tel" className="form-control" placeholder="+251 911 000 000" required />
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