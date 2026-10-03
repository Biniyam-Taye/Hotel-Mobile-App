// src/pages/SpaPage.jsx
import { Sparkles, Heart, Clock, Calendar } from 'lucide-react';

const SpaPage = () => {
  return (
    <>
      <style>{`
        .spa-page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        .spa-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          padding-left: 60px;
        }

        .spa-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }

        .spa-hero .content {
          position: relative;
          z-index: 2;
          text-align: left;
          color: #ffffff;
          max-width: 700px;
          padding: 0 24px;
        }

        .spa-hero .content .badge {
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

        .spa-hero .content h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 52px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .spa-hero .content p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }

        .spa-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        .spa-content .header {
          text-align: left;
          margin-bottom: 48px;
        }

        .spa-content .header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .spa-content .header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .spa-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .spa-feature {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .spa-feature svg {
          color: #d4af37;
          margin-bottom: 8px;
        }

        .spa-feature h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .spa-feature p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        @media (max-width: 768px) {
          .spa-hero {
            padding-left: 24px;
            justify-content: center;
          }
          .spa-hero .content {
            text-align: center;
          }
          .spa-hero .content p {
            margin: 0 auto;
          }
          .spa-hero { height: 300px; }
          .spa-hero .content h1 { font-size: 34px; }
          .spa-hero .content p { font-size: 16px; }
          .spa-content .header h2 { font-size: 28px; }
          .spa-content .header {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .spa-hero { height: 240px; }
          .spa-hero .content h1 { font-size: 26px; }
          .spa-content { padding: 40px 16px 60px; }
          .spa-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="spa-page">
        <div className="spa-hero">
          <div className="overlay"></div>
          <div className="content">
            <div className="badge">✦ Rejuvenate</div>
            <h1>Spa & Wellness</h1>
            <p>Signature treatments, sauna, and massage therapies – your sanctuary of relaxation.</p>
          </div>
        </div>

        <div className="spa-content">
          <div className="header">
            <div className="label">✦ Treatments</div>
            <h2>Recharge Your Senses</h2>
          </div>

          <div className="spa-features">
            <div className="spa-feature">
              <Sparkles size={32} />
              <h4>Massage Therapy</h4>
              <p>Swedish, deep tissue, and hot stone massages</p>
            </div>
            <div className="spa-feature">
              <Heart size={32} />
              <h4>Facial Treatments</h4>
              <p>Customized facials using organic products</p>
            </div>
            <div className="spa-feature">
              <Clock size={32} />
              <h4>Sauna & Steam</h4>
              <p>Detoxify and rejuvenate in our steam rooms</p>
            </div>
            <div className="spa-feature">
              <Calendar size={32} />
              <h4>Packages</h4>
              <p>Day packages including massage, lunch, and pool access</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaPage;