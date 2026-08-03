// src/components/Hero.jsx
import hotelImage from '../assets/hotelphoto.png';

const Hero = () => {
  return (
    <>
      <style>{`
        /* ===== HERO SECTION - FULL SCREEN IMAGE ===== */
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url(${hotelImage}) center/cover no-repeat;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: #ffffff;
          max-width: 800px;
          padding: 0 24px;
        }

        /* Badge / Tag */
        .hero-badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.15);
          backdrop-filter: blur(4px);
          padding: 8px 24px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 2px;
          color: #d4af37;
          margin-bottom: 24px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          text-transform: uppercase;
        }

        /* Main Title */
        .hero-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 72px;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }

        .hero-title .gold {
          color: #d4af37;
        }

        /* Subtitle */
        .hero-sub {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          max-width: 560px;
          margin: 0 auto 36px;
          line-height: 1.8;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 14px 44px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          letter-spacing: 0.5px;
        }

        .btn-primary:hover {
          background: #c5a028;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
        }

        .btn-secondary {
          padding: 14px 44px;
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          letter-spacing: 0.5px;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
          transform: translateY(-3px);
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: floatDown 2s ease-in-out infinite;
        }

        .scroll-indicator .mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .scroll-indicator .mouse .wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          animation: scrollWheel 1.5s ease-in-out infinite;
        }

        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }

        @keyframes floatDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 44px;
          }
          .hero-sub {
            font-size: 16px;
          }
          .hero-badge {
            font-size: 11px;
            padding: 6px 18px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }
          .hero-sub {
            font-size: 14px;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            text-align: center;
            padding: 12px 24px;
          }
          .scroll-indicator {
            display: none;
          }
        }
      `}</style>

      {/* ===== HERO HTML ===== */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">✦ LUXURY COLLECTION</div>
          <h1 className="hero-title">
            VILLA ALPHA<br />
            <span className="gold">INTERNATIONAL HOTEL</span>
          </h1>
          <p className="hero-sub">
            Where elegance meets comfort — experience world-class hospitality
            in the heart of the city.
          </p>
          <div className="hero-buttons">
            <a href="/rooms" className="btn-primary">Explore Suites</a>
            <a href="/about" className="btn-secondary">About Us</a>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
};

export default Hero;