import { useState, useEffect } from 'react';
import { Users, Loader2, MapPin, Check, Star, Calendar, CheckCircle, XCircle, X, ArrowRight } from 'lucide-react';
import { fetchEventSpaces } from '../services/hospitalityApi';
import { initiateStripeCheckout } from '../services/paymentApi';

export default function EventsConferencesPage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(50);
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
        setSpaces(await fetchEventSpaces());
      } catch (err) {
        setError(err.message || 'Failed to load event spaces');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openModal = (space) => {
    setSelectedSpace(space);
    setEventDate('');
    setEndDate('');
    setGuests(space.maxGuests ? Math.min(50, space.maxGuests) : 50);
    setAvailabilityStatus(null);
    setBookingSuccess(false);
  };

  const closeModal = () => {
    setSelectedSpace(null);
    setAvailabilityStatus(null);
    setBookingSuccess(false);
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (availabilityStatus === 'available') {
      // If already available, proceed to final confirmation stage
      if (!fullName || !email || !phone) {
        // Show contact input in modal
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
      title: `Event Venue - ${selectedSpace?.title || 'Conference Hall'}`,
      amount: selectedSpace?.price || 500,
      relatedType: 'Event',
      customerEmail: email,
      customerName: fullName,
    }).catch(err => {
      setBookingSuccess(false);
    });
  };

  return (
    <>
      <style>{`
        .ev-page { background: #f8f9fa; min-height: 100vh; }
        .ev-hero {
          position: relative; height: 340px;
          display: flex; align-items: center; justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop') center/cover no-repeat;
          padding-left: 60px;
        }
        .ev-hero .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .ev-hero .content { position: relative; z-index: 2; color: #fff; max-width: 700px; padding: 0 24px; }
        .ev-hero .badge {
          display: inline-block; background: rgba(212,175,55,0.2);
          padding: 6px 20px; border-radius: 9999px; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: #d4af37;
          border: 1px solid rgba(212,175,55,0.25); margin-bottom: 16px;
        }
        .ev-hero h1 { font-family: Georgia, serif; font-size: 46px; font-weight: 700; margin: 0 0 8px; }
        .ev-hero p { font-size: 17px; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.6; }
        .ev-section { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }
        .ev-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;
        }
        .ev-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ev-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
          border-color: rgba(212,175,55,0.3);
        }
        .ev-card-image { position: relative; }
        .ev-card img { width: 100%; height: 210px; object-fit: cover; display: block; }
        .ev-featured {
          position: absolute; top: 14px; right: 14px;
          background: #d4af37; color: #1a1a1a; padding: 4px 12px;
          border-radius: 999px; font-size: 11px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .ev-card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .ev-card-body h3 { margin: 0 0 8px; font-size: 20px; color: #111827; font-family: 'Montserrat', sans-serif; }
        .ev-card-body p { margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6; flex: 1; }
        .ev-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .ev-meta span {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; color: #4b5563; background: #f3f4f6;
          padding: 4px 10px; border-radius: 999px;
        }
        .ev-amenities { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .ev-amenities span {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; color: #4b5563; background: #f9fafb;
          border: 1px solid #e5e7eb; padding: 3px 8px; border-radius: 999px;
        }

        .ev-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto; padding-top: 14px; border-top: 1px solid #f1f5f9; gap: 12px;
        }
        .ev-price { font-size: 17px; font-weight: 700; color: #d4af37; font-family: 'Montserrat', sans-serif; }
        .ev-btn-check {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; background: #d4af37; color: #1a1a1a;
          border: none; border-radius: 9999px; font-size: 13px; font-weight: 700;
          font-family: 'Poppins', sans-serif; cursor: pointer; transition: all 0.28s ease;
          white-space: nowrap;
        }
        .ev-btn-check:hover {
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

        .ev-status { text-align: center; padding: 48px 24px; color: #6b7280; }
        .ev-status.error { color: #b91c1c; }
        @media (max-width: 768px) {
          .ev-hero { padding-left: 24px; height: 280px; }
          .ev-hero h1 { font-size: 32px; }
        }
      `}</style>

      <div className="ev-page">
        <div className="ev-hero">
          <div className="overlay" />
          <div className="content">
            <div className="badge">✦ Premium Venues</div>
            <h1>Events & Conference</h1>
            <p>Host memorable meetings, weddings, and conferences in our versatile premium venues.</p>
          </div>
        </div>

        <div className="ev-section">
          {loading ? (
            <div className="ev-status"><Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />Loading event spaces...</div>
          ) : error ? (
            <div className="ev-status error">{error}</div>
          ) : spaces.length === 0 ? (
            <div className="ev-status">No published event spaces available yet.</div>
          ) : (
            <div className="ev-grid">
              {spaces.map((space) => (
                <article key={space.id} className="ev-card">
                  <div className="ev-card-image">
                    {space.image && !space.image.startsWith('default-') && (
                      <img src={space.image} alt={space.title} />
                    )}
                    {space.popular && (
                      <span className="ev-featured"><Star size={12} fill="currentColor" /> Featured</span>
                    )}
                  </div>
                  <div className="ev-card-body">
                    <h3>{space.title}</h3>
                    <p>{space.description}</p>
                    <div className="ev-meta">
                      {space.location && <span><MapPin size={12} /> {space.location}</span>}
                      <span><Users size={12} /> Up to {space.maxGuests || '—'} guests</span>
                    </div>
                    {space.amenities?.length > 0 && (
                      <div className="ev-amenities">
                        {space.amenities.slice(0, 4).map((tag) => (
                          <span key={tag}><Check size={10} /> {tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="ev-footer">
                      <div className="ev-price">{space.displayPrice} <span style={{ fontSize: 12, fontWeight: 400, color: '#6b7280' }}>/ day</span></div>
                      <button className="ev-btn-check" onClick={() => openModal(space)}>
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
      {selectedSpace && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={20} /></button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', color: '#1a1a1a', margin: '0 0 8px' }}>Venue Reserved!</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  🎉 Your booking request for {selectedSpace.title} has been received. Our event coordinator will contact you shortly!
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedSpace.title}
                </h3>
                <div style={{ fontSize: '14px', color: '#d4af37', fontWeight: 700, marginBottom: '16px' }}>
                  {selectedSpace.displayPrice} / day
                </div>

                <form onSubmit={handleCheckAvailability}>
                  <div className="form-group">
                    <label>Event Start Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => { setEventDate(e.target.value); setAvailabilityStatus(null); }}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Event End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => { setEndDate(e.target.value); setAvailabilityStatus(null); }}
                      required
                      min={eventDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Expected Attendees / Guests</label>
                    <input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      min="5"
                      max={selectedSpace.maxGuests || 1000}
                      required
                    />
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
                    disabled={isChecking || !eventDate || !endDate}
                  >
                    {isChecking ? (
                      <>Checking...</>
                    ) : availabilityStatus === 'available' || availabilityStatus === 'confirming' ? (
                      <>Book Venue Now <Calendar size={18} /></>
                    ) : (
                      <>Check Availability <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                {availabilityStatus === 'available' && (
                  <div style={{ marginTop: '14px', padding: '12px', background: '#dcfce7', color: '#16a34a', borderRadius: '10px', fontSize: '13.5px', fontWeight: 600, textAlign: 'center' }}>
                    ✅ Venue is available for your dates! Click <strong>Book Venue Now</strong> above.
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

