// src/components/Hero.jsx
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('rooms');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align content to left */
          text-align: left;            /* Left align text */
          color: #ffffff;
          padding: 0 48px;             /* Left padding for content */
          background: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
            center/cover no-repeat;
          background-attachment: fixed;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          padding: 20px;
        }

        .hero-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 0.25rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .hero-title .gold {
          color: #d4af37;
          display: block;
          font-size: 1.8rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .hero-sub {
          font-size: 1.25rem;
          font-weight: 300;
          margin: 1rem 0 2rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: #d4af37;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }

        .hero-btn:hover {
          background: #c5a028;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.6);
        }

        /* Scroll indicator (centered at bottom) */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s;
          animation: bounce 2s infinite;
        }

        .scroll-indicator:hover {
          color: #ffffff;
        }

        .scroll-indicator .mouse {
          width: 24px;
          height: 38px;
          border: 2px solid currentColor;
          border-radius: 12px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .scroll-indicator .mouse .wheel {
          width: 4px;
          height: 8px;
          background: currentColor;
          border-radius: 2px;
          position: absolute;
          top: 8px;
          animation: scrollWheel 1.5s infinite;
        }

        .scroll-indicator span {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .hero {
            padding: 0 32px;
          }
          .hero-content {
            max-width: 500px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 0 24px;
            justify-content: center;  /* Center on tablets */
            text-align: center;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-title .gold {
            font-size: 1.4rem;
          }
          .hero-sub {
            font-size: 1.1rem;
          }
          .hero-btn {
            padding: 14px 32px;
            font-size: 1rem;
          }
          .scroll-indicator {
            bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: 100vh;
            padding: 0 16px;
            justify-content: center;
            text-align: center;
          }
          .hero-title {
            font-size: 2rem;
          }
          .hero-title .gold {
            font-size: 1.1rem;
          }
          .hero-sub {
            font-size: 1rem;
          }
          .hero-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
          .scroll-indicator .mouse {
            width: 20px;
            height: 32px;
          }
          .scroll-indicator .mouse .wheel {
            height: 6px;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            VILLA ALPHA<br />
            <span className="gold">INTERNATIONAL HOTEL</span>
          </h1>
          <p className="hero-sub">
            Where elegance meets comfort — experience world-class hospitality
            in the heart of the city.
          </p>
          <a href="#rooms" className="hero-btn">
            Explore Rooms <ArrowRight size={20} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={scrollToNextSection}>
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