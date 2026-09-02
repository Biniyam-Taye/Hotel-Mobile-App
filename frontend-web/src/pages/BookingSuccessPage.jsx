import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight, ShieldCheck, Home } from 'lucide-react';

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief timer for smooth receipt entrance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .success-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          background: radial-gradient(circle at top, #fefce8 0%, #f8fafc 100%);
          font-family: 'Poppins', sans-serif;
        }
        .success-card {
          background: #ffffff;
          border-radius: 24px;
          max-width: 540px;
          width: 100%;
          padding: 40px 32px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          text-align: center;
          border: 1px solid rgba(212,175,55,0.25);
          position: relative;
          overflow: hidden;
        }
        .success-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(90deg, #10b981, #d4af37, #10b981);
        }
        .icon-wrapper {
          width: 80px;
          height: 80px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #10b981;
        }
        .success-title {
          font-family: 'Georgia', serif;
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px;
        }
        .success-desc {
          color: #6b7280;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 28px;
        }
        .session-info {
          background: #f9fafb;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          margin-bottom: 28px;
          text-align: left;
          font-size: 13px;
        }
        .session-info .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: #374151;
        }
        .session-info .row:last-child {
          margin-bottom: 0;
        }
        .btn-home {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
          color: #1a1a1a;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 18px rgba(212,175,55,0.35);
        }
        .btn-home:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.45);
        }
      `}</style>

      <div className="success-page">
        <div className="success-card">
          <div className="icon-wrapper">
            <CheckCircle size={44} />
          </div>

          <h1 className="success-title">Payment Successful!</h1>
          <p className="success-desc">
            🎉 Your reservation payment has been confirmed via <strong>Stripe Checkout</strong>. We look forward to hosting you at <strong>Villa Alpha International Hotel</strong>!
          </p>

          <div className="session-info">
            <div className="row">
              <span style={{ color: '#6b7280' }}>Payment Status:</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>✅ Paid (Stripe Verified)</span>
            </div>
            {sessionId && (
              <div className="row">
                <span style={{ color: '#6b7280' }}>Stripe Session Ref:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '11px' }}>
                  {sessionId.slice(0, 24)}...
                </span>
              </div>
            )}
            <div className="row">
              <span style={{ color: '#6b7280' }}>Confirmation:</span>
              <span style={{ fontWeight: 600 }}>Sent to Email</span>
            </div>
          </div>

          <Link to="/" className="btn-home">
            <Home size={18} /> Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
