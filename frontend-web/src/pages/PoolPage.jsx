// src/pages/PoolPage.jsx
import { Droplets, Clock, Sun, Users } from 'lucide-react';

const PoolPage = () => {
  return (
    <>
      <style>{`
        .pool-page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        .pool-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align content to the left */
          background: url('https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          padding-left: 60px; /* Add left padding for spacing */
        }

        .pool-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }

        .pool-hero .content {
          position: relative;
          z-index: 2;
          text-align: left; /* Left-align text */
          color: #ffffff;
          max-width: 700px;
          padding: 0 24px;
        }

        .pool-hero .content .badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          padding: 6px 20px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.25);
          margin-bottom: 16px;
        }

        .pool-hero .content h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 52px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .pool-hero .content p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0; /* Remove auto margin to align left */
          line-height: 1.6;
        }

        .pool-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        .pool-content .header {
          text-align: left; /* Left-align header as well */
          margin-bottom: 48px;
        }

        .pool-content .header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .pool-content .header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .pool-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .pool-feature {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .pool-feature svg {
          color: #d4af37;
          margin-bottom: 8px;
        }

        .pool-feature h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .pool-feature p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        @media (max-width: 768px) {
          .pool-hero {
            padding-left: 24px;
            justify-content: center;
          }
          .pool-hero .content {
            text-align: center;
          }
          .pool-hero .content p {
            margin: 0 auto;
          }
          .pool-hero { height: 300px; }
          .pool-hero .content h1 { font-size: 34px; }
          .pool-hero .content p { font-size: 16px; }
          .pool-content .header h2 { font-size: 28px; }
          .pool-content .header {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .pool-hero { height: 240px; }
          .pool-hero .content h1 { font-size: 26px; }
          .pool-content { padding: 40px 16px 60px; }
          .pool-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pool-page">
        <div className="pool-hero">
          <div className="overlay"></div>
          <div className="content">
            <div className="badge">✦ Relax</div>
            <h1>Swimming Pool</h1>
            <p>Outdoor pool with sun loungers and poolside bar – open daily for your relaxation.</p>
          </div>
        </div>

        <div className="pool-content">
          <div className="header">
            <div className="label">✦ Amenities</div>
            <h2>Dive into Luxury</h2>
          </div>

          <div className="pool-features">
            <div className="pool-feature">
              <Clock size={32} />
              <h4>Opening Hours</h4>
              <p>7:00 AM – 9:00 PM Daily</p>
            </div>
            <div className="pool-feature">
              <Sun size={32} />
              <h4>Sun Loungers</h4>
              <p>Complimentary towels &amp; lounge chairs</p>
            </div>
            <div className="pool-feature">
              <Users size={32} />
              <h4>Poolside Bar</h4>
              <p>Refreshing drinks &amp; light snacks</p>
            </div>
            <div className="pool-feature">
              <Droplets size={32} />
              <h4>Temperature</h4>
              <p>Heated to a comfortable 28°C</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolPage;