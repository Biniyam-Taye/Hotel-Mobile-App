// src/components/OfferDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Users, Star, CheckCircle, XCircle, X, ArrowRight } from 'lucide-react';
import { fetchOfferById } from '../services/offersApi';

const OfferDetail = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');

  // Check Availability State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Contact State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchOfferById(id);
        setOffer(data);
        setActiveImage(data.image);
      } catch (err) {
        setError(err.message || 'Failed to load offer details');
      } finally {
        setLoading(false);
      }
    };
    loadOffer();
  }, [id]);

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (availabilityStatus === 'available') {
      setShowModal(true);
      return;
    }

    setIsChecking(true);
    setAvailabilityStatus(null);

    setTimeout(() => {
      setAvailabilityStatus('available');
      setIsChecking(false);
    }, 750);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowModal(false);
      setAvailabilityStatus(null);
      setCheckIn('');
      setCheckOut('');
      setFullName('');
      setEmail('');
      setPhone('');
    }, 2500);
  };

  if (loading) {
    return (
      <div className="detail-page" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '600' }}>Loading package details...</div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="detail-page" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ color: '#ef4444', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          {error || 'Offer not found!'}
        </div>
        <Link to="/#offers" className="back-link" style={{ justifyContent: 'center' }}>
          <ArrowLeft size={16} /> Back to offers
        </Link>
      </div>
    );
  }

  const galleryImages = [offer.image, ...(offer.detailImages || [])].filter(Boolean);

  return (
    <>
      <style>{`
        .detail-page {
          padding: 40px 24px 80px;
          background: #ffffff;
          font-family: 'Poppins', sans-serif;
        }
        .detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #d4af37;
        }

        /* --- Main Layout --- */
        .detail-hero {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .detail-hero {
            flex-direction: row;
            gap: 50px;
          }
        }

        /* --- Left Side: Images --- */
        .detail-images {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .main-image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 450px;
          background: #f3f4f6;
        }
        .main-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }
        .badge-discount {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #ef4444;
          color: white;
          padding: 6px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        .badge-seasonal {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .thumbnail-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .thumbnail-strip::-webkit-scrollbar {
          height: 4px;
        }
        .thumbnail-strip::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }
        .thumbnail-strip img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: 0.2s;
          flex-shrink: 0;
        }
        .thumbnail-strip img:hover, .thumbnail-strip img.active {
          border-color: #d4af37;
        }

        /* --- Right Side: Content --- */
        .detail-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .validity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef3c7;
          color: #b45309;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          width: fit-content;
          margin-bottom: 16px;
        }
        .detail-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }
        .detail-highlight {
          font-size: 18px;
          color: #d4af37;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .divider-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .divider-line .dot { width: 6px; height: 6px; background: #d4af37; border-radius: 50%; }
        .divider-line .line { flex: 1; height: 1px; background: #e5e7eb; max-width: 40px; }

        .detail-description {
          color: #4b5563;
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 24px;
        }

        /* --- Info Cards --- */
        .info-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        @media (min-width: 480px) {
          .info-cards { grid-template-columns: repeat(3, 1fr); }
        }
        .info-card {
          background: #f8fafc;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #f1f3f5;
          transition: border-color 0.3s;
        }
        .info-card:hover {
          border-color: #d4af37;
        }
        .info-card .label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          font-weight: 700;
        }
        .info-card .value {
          font-weight: 700;
          color: #1a1a1a;
          font-size: 18px;
        }
        .info-card .sub-value {
          font-size: 12px;
          color: #6b7280;
        }
        .info-card .savings-text {
          color: #d4af37;
          font-weight: 600;
          font-size: 13px;
          margin-top: 4px;
        }

        /* --- Check Availability Card --- */
        .availability-box {
          background: #ffffff;
          border-radius: 18px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-top: 10px;
        }
        .availability-box h4 {
          margin: 0 0 16px;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
        }
        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }
        .form-field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }
        .form-field input, .form-field select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 13.5px;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          background: #f9fafb;
        }
        .btn-check-avail {
          width: 100%;
          padding: 13px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
        }
        .btn-check-avail:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212,175,55,0.35);
        }
        .btn-check-avail.btn-book-now {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(16, 185, 129, 0.35);
        }
        .btn-check-avail.btn-book-now:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.45);
        }

        /* --- Modal Styles --- */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 28px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          position: relative;
          animation: modalUp 0.3s ease;
        }
        @keyframes modalUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; cursor: pointer; color: #6b7280;
        }

        /* --- Package Highlights --- */
        .highlights-section {
          margin-top: 60px;
          text-align: center;
        }
        .highlights-top-badge {
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }
        .highlights-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 40px 0;
          color: #1a1a1a;
        }
        .highlights-title span { color: #d4af37; }
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .highlights-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
        }

        .highlight-card {
          background: #f8fafc;
          padding: 24px 20px;
          border-radius: 16px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          border: 1px solid #f1f3f5;
        }
        .highlight-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
          border-color: rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 768px) {
          .detail-title { font-size: 32px; }
          .main-image-wrapper { height: 320px; }
          .form-row-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="detail-page">
        <div className="detail-container">
          <Link to="/#offers" className="back-link">
            <ArrowLeft size={16} /> Back to offers
          </Link>

          <div className="detail-hero">
            {/* Left Image Column */}
            <div className="detail-images">
              <div className="main-image-wrapper">
                <img src={activeImage} alt={offer.title} />
                {offer.discount && <div className="badge-discount">{offer.discount}</div>}
                {offer.seasonalBadge && <div className="badge-seasonal">{offer.seasonalBadge}</div>}
              </div>
              {/* Thumbnail strip */}
              {galleryImages.length > 1 && (
                <div className="thumbnail-strip">
                  {galleryImages.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      className={activeImage === imgUrl ? 'active' : ''}
                      onClick={() => setActiveImage(imgUrl)}
                      alt={`Thumb ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Content Column */}
            <div className="detail-content">
              {offer.validUntil && (
                <div className="validity-pill">
                  <Clock size={14} /> Valid until {offer.validUntil}
                </div>
              )}
              <h1 className="detail-title">{offer.title}</h1>
              {offer.highlightSubtitle && (
                <div className="detail-highlight">{offer.highlightSubtitle}</div>
              )}
              <div className="divider-line">
                <div className="line"></div>
                <div className="dot"></div>
                <div className="line"></div>
              </div>
              <p className="detail-description">{offer.description}</p>

              <div className="info-cards">
                <div className="info-card">
                  <div className="label">Package Pricing</div>
                  <div className="value">{offer.price || 'Special Deal'}</div>
                  <div className="sub-value">{offer.perNightText}</div>
                  {offer.discountPercent && (
                    <div className="savings-text">Save {offer.discountPercent} with package</div>
                  )}
                </div>
                <div className="info-card">
                  <div className="label">Stay Length</div>
                  <div className="value">{offer.stayLength}</div>
                </div>
                <div className="info-card">
                  <div className="label">Guests Limit</div>
                  <div className="value">{offer.guests}</div>
                </div>
              </div>

              {/* ===== CHECK AVAILABILITY & BOOKING FORM ===== */}
              <div className="availability-box">
                <h4>Check Availability & Book Package</h4>
                <form onSubmit={handleCheckAvailability}>
                  <div className="form-row-grid">
                    <div className="form-field">
                      <label>Check-In Date</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => { setCheckIn(e.target.value); setAvailabilityStatus(null); }}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-field">
                      <label>Check-Out Date</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => { setCheckOut(e.target.value); setAvailabilityStatus(null); }}
                        required
                        min={checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="form-field" style={{ marginBottom: '16px' }}>
                    <label>Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => { setGuests(parseInt(e.target.value)); setAvailabilityStatus(null); }}
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`btn-check-avail ${availabilityStatus === 'available' ? 'btn-book-now' : ''}`}
                    disabled={isChecking || !checkIn || !checkOut}
                  >
                    {isChecking ? (
                      <>Checking Availability...</>
                    ) : availabilityStatus === 'available' ? (
                      <>Book Package Now <Calendar size={18} /></>
                    ) : (
                      <>Check Availability <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                {availabilityStatus === 'available' && (
                  <div style={{ marginTop: '14px', padding: '12px', background: '#dcfce7', color: '#16a34a', borderRadius: '10px', fontSize: '13.5px', fontWeight: 600, textAlign: 'center' }}>
                    ✅ Special package is available! Click <strong>Book Package Now</strong> above to complete.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Bottom Highlights Section */}
          {offer.highlights && offer.highlights.length > 0 && (
            <div className="highlights-section">
              <span className="highlights-top-badge">✦ Package Perks ✦</span>
              <h2 className="highlights-title">Package <span>Highlights</span></h2>
              <div className="highlights-grid">
                {offer.highlights.map((item) => (
                  <div key={item.number} className="highlight-card">
                    <div className="number-badge">{item.number}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="bottom-line"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ===== BOOKING CONFIRMATION MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', color: '#1a1a1a', margin: '0 0 8px' }}>Offer Booked!</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  🎉 Thank you {fullName}! Your booking for {offer.title} has been confirmed!
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif' }}>
                  Complete Package Reservation
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6b7280', margin: '0 0 16px' }}>
                  {offer.title} ({checkIn} to {checkOut})
                </p>

                <form onSubmit={handleConfirmBooking}>
                  <div className="form-field" style={{ marginBottom: '12px' }}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field" style={{ marginBottom: '12px' }}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field" style={{ marginBottom: '16px' }}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+251 91 234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-check-avail btn-book-now">
                    Confirm & Reserve Package
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OfferDetail;