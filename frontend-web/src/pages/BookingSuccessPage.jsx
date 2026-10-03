import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Home, 
  Printer, 
  ShoppingBag, 
  Copy, 
  Check, 
  CreditCard, 
  Mail, 
  Clock, 
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [details, setDetails] = useState({
    orderId: sessionId ? `VA-${sessionId.slice(-8).toUpperCase()}` : 'VA-OFFICIAL-REF',
    title: 'Hotel Reservation & Hospitality Services',
    amount: 200,
    currency: 'usd',
    customerName: 'Valued Guest',
    customerEmail: 'Sent to registered email',
    relatedType: 'Booking',
    paymentMethod: 'Credit / Debit Card (Stripe)',
    status: 'succeeded',
    createdAt: new Date(),
  });

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/payments/session/${sessionId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setDetails(prev => ({
              ...prev,
              ...json.data,
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching session details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const copyRefToClipboard = () => {
    if (details.orderId || sessionId) {
      navigator.clipboard.writeText(details.orderId || sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(details.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

        .success-page-wrapper {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 10%, #fefce8 0%, #f1f5f9 60%, #e2e8f0 100%);
          font-family: 'Poppins', sans-serif;
        }

        .success-card-container {
          background: #ffffff;
          border-radius: 28px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 25px 70px rgba(0,0,0,0.12), 0 0 0 1px rgba(212, 175, 55, 0.25);
          overflow: hidden;
          position: relative;
        }

        /* Top Luxury Header Bar */
        .card-top-bar {
          background: linear-gradient(135deg, #1a1a24 0%, #0d0d12 100%);
          padding: 24px 32px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #d4af37;
        }

        .brand-pill {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 800;
          font-size: 15px;
        }

        .brand-title {
          font-family: 'Cinzel', serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          margin: 0;
          color: #ffffff;
        }

        .brand-subtitle {
          font-size: 7.5px;
          color: #d4af37;
          letter-spacing: 2px;
          margin: 0;
          text-transform: uppercase;
        }

        .receipt-badge {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Card Content Area */
        .card-body {
          padding: 36px 36px 40px;
          text-align: center;
        }

        /* Animated Success Check Circle */
        .success-icon-ring {
          width: 88px;
          height: 88px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.22) 100%);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #10b981;
          position: relative;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
        }

        .success-main-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
        }

        .success-subtext {
          color: #6b7280;
          font-size: 14.5px;
          line-height: 1.6;
          margin: 0 0 28px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-subtext strong {
          color: #1a1a1a;
        }

        /* Official Receipt Box */
        .receipt-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 28px;
          text-align: left;
        }

        .receipt-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1.5px dashed #cbd5e1;
          margin-bottom: 16px;
        }

        .receipt-box-title {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ref-code-chip {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
          font-family: monospace;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ref-code-chip:hover {
          border-color: #d4af37;
          background: #fefce8;
          color: #a16207;
        }

        /* Detail Rows */
        .receipt-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 13.5px;
        }

        .receipt-row:last-child {
          margin-bottom: 0;
        }

        .receipt-label {
          color: #64748b;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .receipt-value {
          color: #0f172a;
          font-weight: 600;
          text-align: right;
        }

        .amount-highlight {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #d4af37;
        }

        /* Email Banner */
        .email-notice {
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
          color: #854d0e;
          margin-bottom: 28px;
          text-align: left;
        }

        /* Action Buttons Grid */
        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .btn-action-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          border: 1.5px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .btn-action-outline:hover {
          background: #f8fafc;
          border-color: #d4af37;
          color: #1a1a1a;
          transform: translateY(-1px);
        }

        .btn-action-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 50%, #c5a028 100%);
          color: #1a1a1a;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(212,175,55,0.4);
          transition: all 0.3s ease;
          border: none;
          font-family: 'Poppins', sans-serif;
        }

        .btn-action-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,175,55,0.55);
        }

        @media (max-width: 640px) {
          .card-body { padding: 24px 20px 28px; }
          .card-top-bar { padding: 18px 20px; }
          .success-main-heading { font-size: 24px; }
          .action-buttons-grid { grid-template-columns: 1fr; }
          .receipt-box { padding: 16px; }
          .amount-highlight { font-size: 19px; }
        }

        /* Print style optimizations */
        @media print {
          .card-top-bar { background: #1a1a24 !important; -webkit-print-color-adjust: exact; }
          .action-buttons-grid, .btn-action-primary, .email-notice { display: none !important; }
          .success-page-wrapper { padding: 0; background: white; }
          .success-card-container { box-shadow: none; border: 1px solid #ccc; }
        }
      `}</style>

      <div className="success-page-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="success-card-container"
        >
          {/* Top Brand Header */}
          <div className="card-top-bar">
            <div className="brand-pill">
              <div className="brand-icon">V</div>
              <div>
                <h2 className="brand-title">VILLA ALPHA</h2>
                <p className="brand-subtitle">INTERNATIONAL HOTEL</p>
              </div>
            </div>
            <div className="receipt-badge">
              <ShieldCheck size={14} /> Paid &amp; Verified
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body">
            {/* Success Ring */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
              className="success-icon-ring"
            >
              <CheckCircle size={48} />
            </motion.div>

            <h1 className="success-main-heading">Payment Confirmed!</h1>
            <p className="success-subtext">
              Thank you for choosing <strong>Villa Alpha International Hotel</strong>. Your reservation payment has been processed and verified via <strong>Stripe Checkout</strong>.
            </p>

            {/* Official Transaction Receipt Box */}
            <div className="receipt-box">
              <div className="receipt-box-header">
                <span className="receipt-box-title">
                  <Sparkles size={14} color="#d4af37" /> Official Receipt
                </span>
                <button 
                  className="ref-code-chip" 
                  onClick={copyRefToClipboard}
                  title="Click to copy reference"
                >
                  {details.orderId}
                  {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                </button>
              </div>

              <div className="receipt-row">
                <span className="receipt-label">
                  <Award size={14} /> Service / Reservation
                </span>
                <span className="receipt-value" style={{ maxWidth: '220px' }}>
                  {details.title}
                </span>
              </div>

              <div className="receipt-row">
                <span className="receipt-label">
                  <CreditCard size={14} /> Amount Paid
                </span>
                <span className="receipt-value amount-highlight">
                  ${Number(details.amount).toFixed(2)} USD
                </span>
              </div>

              <div className="receipt-row">
                <span className="receipt-label">
                  <ShieldCheck size={14} /> Payment Status
                </span>
                <span className="receipt-value" style={{ color: '#10b981', fontWeight: 700 }}>
                  ✓ Paid (Stripe Verified)
                </span>
              </div>

              <div className="receipt-row">
                <span className="receipt-label">
                  <Clock size={14} /> Date &amp; Time
                </span>
                <span className="receipt-value" style={{ fontSize: '12.5px', color: '#475569' }}>
                  {formattedDate}
                </span>
              </div>

              {sessionId && (
                <div className="receipt-row" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                  <span className="receipt-label" style={{ fontSize: '11.5px' }}>
                    Stripe Session Ref
                  </span>
                  <span className="receipt-value" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
                    {sessionId.slice(0, 22)}...
                  </span>
                </div>
              )}
            </div>

            {/* Email Notification Banner */}
            <div className="email-notice">
              <Mail size={18} style={{ color: '#d4af37', flexShrink: 0 }} />
              <div>
                <strong>Confirmation Sent:</strong> Receipt and reservation voucher sent to{' '}
                <span style={{ fontWeight: 600, textDecoration: 'underline' }}>
                  {details.customerEmail || 'your email'}
                </span>.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-grid">
              <button className="btn-action-outline" onClick={handlePrint}>
                <Printer size={16} /> Print Receipt
              </button>
              <Link to="/my-orders" className="btn-action-outline">
                <ShoppingBag size={16} /> View My Orders
              </Link>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/" className="btn-action-primary">
                <Home size={18} /> Return to Homepage <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
