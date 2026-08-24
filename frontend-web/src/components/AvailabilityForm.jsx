// src/components/AvailabilityForm.jsx
import { useState } from 'react';
import { Calendar, Users, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const AvailabilityForm = ({ roomName, roomPrice }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setAvailabilityStatus(null);

    // Simulate API call
    setTimeout(() => {
      // Random availability for demo
      const isAvailable = Math.random() > 0.3;
      setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
      setIsChecking(false);
    }, 1000);
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
          font-weight: 600;
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
              onChange={(e) => setGuests(parseInt(e.target.value))}
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
            className="btn-check"
            disabled={isChecking || !checkIn || !checkOut}
          >
            {isChecking ? (
              <>
                <span className="spinner"></span> Checking...
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
            <span style={{ fontWeight: 600 }}>{nights} nights</span> · Total: <span style={{ fontWeight: 700, color: '#d4af37' }}>ETB {totalPrice.toLocaleString()}</span>
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
                Room is available for your selected dates.
                {nights > 0 && totalPrice > 0 && (
                  <> Total: <strong>ETB {totalPrice.toLocaleString()}</strong></>
                )}
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
    </>
  );
};

export default AvailabilityForm;