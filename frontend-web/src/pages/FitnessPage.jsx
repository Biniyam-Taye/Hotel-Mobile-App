// src/pages/FitnessPage.jsx
import { Dumbbell, Clock, Users, Activity } from 'lucide-react';

const FitnessPage = () => {
  return (
    <>
      <style>{`
        .fitness-page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        .fitness-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          padding-left: 60px;
        }

        .fitness-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }

        .fitness-hero .content {
          position: relative;
          z-index: 2;
          text-align: left;
          color: #ffffff;
          max-width: 700px;
          padding: 0 24px;
        }

        .fitness-hero .content .badge {
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

        .fitness-hero .content h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 52px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .fitness-hero .content p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }

        .fitness-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        .fitness-content .header {
          text-align: left;
          margin-bottom: 48px;
        }

        .fitness-content .header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .fitness-content .header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .fitness-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .fitness-feature {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .fitness-feature svg {
          color: #d4af37;
          margin-bottom: 8px;
        }

        .fitness-feature h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .fitness-feature p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        @media (max-width: 768px) {
          .fitness-hero {
            padding-left: 24px;
            justify-content: center;
          }
          .fitness-hero .content {
            text-align: center;
          }
          .fitness-hero .content p {
            margin: 0 auto;
          }
          .fitness-hero { height: 300px; }
          .fitness-hero .content h1 { font-size: 34px; }
          .fitness-hero .content p { font-size: 16px; }
          .fitness-content .header h2 { font-size: 28px; }
          .fitness-content .header {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .fitness-hero { height: 240px; }
          .fitness-hero .content h1 { font-size: 26px; }
          .fitness-content { padding: 40px 16px 60px; }
          .fitness-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="fitness-page">
        <div className="fitness-hero">
          <div className="overlay"></div>
          <div className="content">
            <div className="badge">✦ Energize</div>
            <h1>Fitness Gym</h1>
            <p>State‑of‑the‑art equipment, open 24/7 – stay fit while you travel.</p>
          </div>
        </div>

        <div className="fitness-content">
          <div className="header">
            <div className="label">✦ Facilities</div>
            <h2>Your Ultimate Workout Space</h2>
          </div>

          <div className="fitness-features">
            <div className="fitness-feature">
              <Dumbbell size={32} />
              <h4>Modern Equipment</h4>
              <p>Cardio, strength, and free weights</p>
            </div>
            <div className="fitness-feature">
              <Clock size={32} />
              <h4>24/7 Access</h4>
              <p>Open around the clock for your convenience</p>
            </div>
            <div className="fitness-feature">
              <Users size={32} />
              <h4>Group Classes</h4>
              <p>Yoga, spin, and HIIT sessions available</p>
            </div>
            <div className="fitness-feature">
              <Activity size={32} />
              <h4>Personal Training</h4>
              <p>Certified trainers to guide your fitness journey</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FitnessPage;