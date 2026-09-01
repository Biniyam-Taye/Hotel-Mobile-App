// src/components/AvailabilityForm.jsx
import { useState } from 'react';
import { Calendar, Users, ArrowRight, CheckCircle, XCircle, X } from 'lucide-react';

const AvailabilityForm = ({ roomName, roomPrice }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Booking Modal Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (availabilityStatus === 'available') {
      setShowBookingModal(true);
      return;
    }

    setIsChecking(true);
    setAvailabilityStatus(null);

    // Simulate API check
    setTimeout(() => {
      const isAvailable = Math.random() > 0.15; // High chance of available
      setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
      setIsChecking(false);
    }, 800);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBookingModal(false);
      setAvailabilityStatus(null);
      setCheckIn('');
      setCheckOut('');
      setFullName('');
      setEmail('');
      setPhone('');
    }, 2500);
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * (roomPrice || 0);

  // Get min date for check-out (day after check-in)
  const getMinCheckOut = () => {
    if (checkIn) {
      const date = new Date(checkIn);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <>
      <style>{`
        .availability-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
          max-width: 400px;
          width: 100%;
        }

        .availability-card .price-display {
          text-align: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .availability-card .price-display .amount {
          font-size: 32px;
          font-weight: 700;
          color: #d4af37;
        }

        .availability-card .price-display .per-night {
          font-size: 14px;
          color: #6b7280;
        }

        .availability-card .form-group {
          margin-bottom: 16px;
        }

        .availability-card .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }

        .availability-card .form-group input,
        .availability-card .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          background: #f9fafb;
          box-sizing: border-box;
        }

        .availability-card .form-group input:focus,
        .availability-card .form-group select:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);
          background: #ffffff;
        }

        .availability-card .btn-check {
          width: 100%;
          padding: 14px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
        }

        .availability-card .btn-check:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        .availability-card .btn-check.btn-book-now {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(16, 185, 129, 0.35);
        }

        .availability-card .btn-check.btn-book-now:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.45);
        }

        .availability-card .btn-check:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .availability-card .no-charge {
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
          margin-top: 12px;
        }

        /* ===== AVAILABILITY STATUS ===== */
        .availability-status {
          margin-top: 16px;
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          animation: slideDown 0.4s ease;
        }

        .availability-status.available {
          background: #dcfce7;
          color: #16a34a;
          border: 1px solid #86efac;
        }

        .availability-status.unavailable {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }

        .availability-status .details {
          font-weight: 400;
          font-size: 13px;
          margin-top: 2px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== LOADING SPINNER ===== */
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(26, 26, 26, 0.1);
          border-top-color: #1a1a1a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ===== MODAL STYLES ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
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
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: #1a1a1a;
        }

        .modal-summary {
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px 18px;
          margin: 16px 0;
          font-size: 13.5px;
          color: #4b5563;
        }

        @media (max-width: 480px) {
          .availability-card {
            padding: 18px 16px;
          }
          .availability-card .price-display .amount {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="availability-card">
        {/* Price Display */}
        <div className="price-display">
          <span className="amount">ETB {roomPrice?.toLocaleString() || '0'}</span>
          <span className="per-night"> / night</span>
        </div>

        {/* Form */}
        <form onSubmit={handleCheckAvailability}>
          <div className="form-group">
            <label>Check-In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setAvailabilityStatus(null);
              }}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label>Check-Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setAvailabilityStatus(null);
              }}
              required
              min={getMinCheckOut()}
            />
          </div>

          <div className="form-group">
            <label>Guests</label>
            <select
              value={guests}
              onChange={(e) => {
                setGuests(parseInt(e.target.value));
                setAvailabilityStatus(null);
              }}
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
            className={`btn-check ${availabilityStatus === 'available' ? 'btn-book-now' : ''}`}
            disabled={isChecking || !checkIn || !checkOut}
          >
            {isChecking ? (
              <>
                <span className="spinner"></span> Checking...
              </>
            ) : availabilityStatus === 'available' ? (
              <>
                Book Now <Calendar size={18} />
              </>
            ) : (
              <>
                Check Availability <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {nights > 0 && totalPrice > 0 && availabilityStatus === 'available' && (
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: '#4b5563' }}>
            <span style={{ fontWeight: 600 }}>{nights} nights</span> · Total: <span style={{ fontWeight: 700, color: '#10b981' }}>ETB {totalPrice.toLocaleString()}</span>
          </div>
        )}

        <div className="no-charge">
          <span>🔒 You won't be charged yet</span>
        </div>

        {/* Availability Status */}
        {availabilityStatus === 'available' && (
          <div className="availability-status available">
            <CheckCircle size={20} />
            <div>
              ✅ Available!
              <div className="details">
                Room is available for your selected dates. Click <strong>Book Now</strong> above to complete your booking.
              </div>
            </div>
          </div>
        )}

        {availabilityStatus === 'unavailable' && (
          <div className="availability-status unavailable">
            <XCircle size={20} />
            <div>
              ❌ Not Available
              <div className="details">
                Sorry, this room is not available for the selected dates.
                Please try different dates.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== BOOKING CONFIRMATION MODAL ===== */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', color: '#1a1a1a', margin: '0 0 8px' }}>Booking Confirmed!</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  🎉 Thank you {fullName}! Your reservation for {roomName} is confirmed. We look forward to hosting you!
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif' }}>
                  Complete Your Booking
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                  {roomName}
                </p>

                <div className="modal-summary">
                  <div><strong>Check-In:</strong> {checkIn}</div>
                  <div><strong>Check-Out:</strong> {checkOut} ({nights} nights)</div>
                  <div><strong>Guests:</strong> {guests}</div>
                  <div style={{ marginTop: '6px', fontSize: '15px', color: '#10b981', fontWeight: 700 }}>
                    Total: ETB {totalPrice.toLocaleString()}
                  </div>
                </div>

                <form onSubmit={handleConfirmBooking}>
                  <div className="availability-card" style={{ padding: 0, boxShadow: 'none', border: 'none', maxWidth: '100%' }}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+251 91 234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn-check btn-book-now">
                      Confirm & Reserve Room
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AvailabilityForm;