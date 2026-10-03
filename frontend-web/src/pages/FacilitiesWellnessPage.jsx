import { useState, useEffect } from 'react';
import { Clock, Loader2, Calendar, CheckCircle, XCircle, X, ArrowRight, Users } from 'lucide-react';
import { fetchFacilities } from '../services/hospitalityApi';
import { initiateStripeCheckout } from '../services/paymentApi';

export default function FacilitiesWellnessPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking Modal State
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [guests, setGuests] = useState(1);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        setFacilities(await fetchFacilities());
      } catch (err) {
        setError(err.message || 'Failed to load facilities');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openModal = (facility) => {
    setSelectedFacility(facility);
    setBookingDate('');
    setTimeSlot('Morning (09:00 AM - 12:00 PM)');
    setGuests(1);
    setAvailabilityStatus(null);
    setBookingSuccess(false);
  };

  const closeModal = () => {
    setSelectedFacility(null);
    setAvailabilityStatus(null);
    setBookingSuccess(false);
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (availabilityStatus === 'available') {
      if (!fullName || !email || !phone) {
        setAvailabilityStatus('confirming');
        return;
      }
      handleConfirmBooking(e);
      return;
    }

    setIsChecking(true);
    setAvailabilityStatus(null);

    setTimeout(() => {
      setAvailabilityStatus('available');
      setIsChecking(false);
    }, 700);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);

    initiateStripeCheckout({
      title: `Wellness Facility - ${selectedFacility?.title || 'Spa Service'}`,
      amount: selectedFacility?.price || 120,
      relatedType: 'Facility',
      customerEmail: email,
      customerName: fullName,
    }).catch(err => {
      setBookingSuccess(false);
    });
  };

  return (
    <>
      <style>{`
        .fw-page { background: #f8f9fa; min-height: 100vh; }
        .fw-hero {
          position: relative; height: 340px;
          display: flex; align-items: center; justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop') center/cover no-repeat;
          padding-left: 60px;
        }
        .fw-hero .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .fw-hero .content { position: relative; z-index: 2; color: #fff; max-width: 700px; padding: 0 24px; }
        .fw-hero .badge {
          display: inline-block; background: rgba(212,175,55,0.2);
          padding: 6px 20px; border-radius: 9999px; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: #d4af37;
          border: 1px solid rgba(212,175,55,0.25); margin-bottom: 16px;
        }
        .fw-hero h1 { font-family: Georgia, serif; font-size: 46px; font-weight: 700; margin: 0 0 8px; }
        .fw-hero p { font-size: 17px; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.6; }
        .fw-section { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }
        .fw-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;
        }
        .fw-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fw-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
          border-color: rgba(212,175,55,0.3);
        }
        .fw-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .fw-card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .fw-card-body h3 { margin: 0 0 8px; font-size: 20px; color: #111827; font-family: 'Montserrat', sans-serif; }
        .fw-card-body p { margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6; flex: 1; }
        
        .fw-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto; padding-top: 14px; border-top: 1px solid #f1f5f9; gap: 12px;
        }
        .fw-hours {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #374151; background: #f3f4f6;
          padding: 6px 12px; border-radius: 999px; font-weight: 500;
        }
        .fw-btn-check {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 16px; background: #d4af37; color: #1a1a1a;
          border: none; border-radius: 9999px; font-size: 13px; font-weight: 700;
          font-family: 'Poppins', sans-serif; cursor: pointer; transition: all 0.28s ease;
          white-space: nowrap;
        }
        .fw-btn-check:hover {
          background: #c5a028; transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(212,175,55,0.35);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal-card {
          background: #ffffff; border-radius: 20px; max-width: 480px;
          width: 100%; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          position: relative; animation: modalUp 0.3s ease;
        }
        @keyframes modalUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px; background: none;
          border: none; cursor: pointer; color: #6b7280; transition: color 0.2s;
        }
        .modal-close:hover { color: #1a1a1a; }
        .form-group { margin-bottom: 14px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; }
        .form-group input, .form-group select {
          width: 100%; padding: 10px 14px; border: 1px solid #d1d5db;
          border-radius: 10px; font-size: 14px; font-family: 'Poppins', sans-serif;
          box-sizing: border-box; background: #f9fafb;
        }
        .btn-action {
          width: 100%; padding: 13px; background: #d4af37; color: #1a1a1a;
          border: none; border-radius: 9999px; font-weight: 700; font-size: 15px;
          cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-top: 10px;
        }
        .btn-action.btn-book-now {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff;
          box-shadow: 0 4px 18px rgba(16,185,129,0.35);
        }

        .fw-status { text-align: center; padding: 48px 24px; color: #6b7280; }
        .fw-status.error { color: #b91c1c; }
        @media (max-width: 768px) {
          .fw-hero { padding-left: 24px; height: 280px; }
          .fw-hero h1 { font-size: 32px; }
        }
      `}</style>

      <div className="fw-page">
        <div className="fw-hero">
          <div className="overlay" />
          <div className="content">
            <div className="badge">✦ Rejuvenate</div>
            <h1>Facilities & Wellness</h1>
            <p>Relax with spa treatments, fitness facilities, and premium wellness amenities managed by our team.</p>
          </div>
        </div>

        <div className="fw-section">
          {loading ? (
            <div className="fw-status"><Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />Loading facilities...</div>
          ) : error ? (
            <div className="fw-status error">{error}</div>
          ) : facilities.length === 0 ? (
            <div className="fw-status">No facilities available yet.</div>
          ) : (
            <div className="fw-grid">
              {facilities.map((item) => (
                <article key={item.id} className="fw-card">
                  {item.image && !item.image.startsWith('default-') && (
                    <img src={item.image} alt={item.title} />
                  )}
                  <div className="fw-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="fw-footer">
                      {item.displayPrice ? (
                        <div className="fw-hours"><Clock size={14} /> {item.displayPrice}</div>
                      ) : (
                        <div />
                      )}
                      <button className="fw-btn-check" onClick={() => openModal(item)}>
                        <Calendar size={14} /> Check Availability
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== AVAILABILITY & BOOKING MODAL ===== */}
      {selectedFacility && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={20} /></button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', color: '#1a1a1a', margin: '0 0 8px' }}>Service Booked!</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  🎉 Your reservation for {selectedFacility.title} has been confirmed. We look forward to seeing you!
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedFacility.title}
                </h3>
                {selectedFacility.displayPrice && (
                  <div style={{ fontSize: '14px', color: '#d4af37', fontWeight: 700, marginBottom: '16px' }}>
                    {selectedFacility.displayPrice}
                  </div>
                )}

                <form onSubmit={handleCheckAvailability}>
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => { setBookingDate(e.target.value); setAvailabilityStatus(null); }}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time Slot</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => { setTimeSlot(e.target.value); setAvailabilityStatus(null); }}
                    >
                      <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 05:00 PM)">Afternoon (12:00 PM - 05:00 PM)</option>
                      <option value="Evening (05:00 PM - 09:00 PM)">Evening (05:00 PM - 09:00 PM)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Guests / People</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 People</option>
                      <option value={3}>3 People</option>
                      <option value={4}>4+ People</option>
                    </select>
                  </div>

                  {availabilityStatus === 'confirming' && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                      <div className="form-group">
                        <label>Your Full Name</label>
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
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn-action ${(availabilityStatus === 'available' || availabilityStatus === 'confirming') ? 'btn-book-now' : ''}`}
                    disabled={isChecking || !bookingDate}
                  >
                    {isChecking ? (
                      <>Checking...</>
                    ) : availabilityStatus === 'available' || availabilityStatus === 'confirming' ? (
                      <>Book Now <Calendar size={18} /></>
                    ) : (
                      <>Check Availability <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                {availabilityStatus === 'available' && (
                  <div style={{ marginTop: '14px', padding: '12px', background: '#dcfce7', color: '#16a34a', borderRadius: '10px', fontSize: '13.5px', fontWeight: 600, textAlign: 'center' }}>
                    ✅ Service is available! Click <strong>Book Now</strong> above to complete reservation.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

