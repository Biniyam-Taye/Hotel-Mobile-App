// src/components/Hero.jsx
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);

  // Array of high-quality hotel images (3rd image fixed)
  const slides = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play logic - Fast 3-second sliding interval
  useEffect(() => {
    if (isPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000); // Slide changes every 3 seconds
    } else {
      clearInterval(slideInterval.current);
    }

    return () => clearInterval(slideInterval.current);
  }, [isPlaying]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('rooms');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        /* Google Fonts Import */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@400;500;600&family=Poppins:wght@300;400;500;600&display=swap');

        .hero {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          color: #ffffff;
          padding: 0 48px;
          overflow: hidden;
        }

        /* SLIDER TRACK - Physical horizontal sliding */
        .hero-slider {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth slide motion */
        }

        .hero-slide {
          flex: 0 0 100%; /* Each slide takes full screen width */
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1);
          transition: transform 8s cubic-bezier(0.4, 0, 0.2, 1); /* Slow cinematic zoom */
          will-change: transform;
        }

        .hero-slide.active {
          transform: scale(1.15); /* Slowly zooms in while visible */
        }

        /* DARK OVERLAY */
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
          padding: 20px;
        }

        /* H1 TYPOGRAPHY */
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: 4.2rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .hero-title .gold {
          color: #d4af37;
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 1.6rem;
          letter-spacing: 8px;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .hero-sub {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 400;
          margin: 1.5rem 0 2.5rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: #d4af37;
          color: #1a1a1a;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }

        .hero-btn:hover {
          background: #c5a028;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.6);
        }

        /* SLIDER CONTROLS (Arrows) */
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          width: 54px;
          height: 54px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          opacity: 0.8;
        }

        .slider-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
          opacity: 1;
        }

        .slider-btn.prev { left: 24px; }
        .slider-btn.next { right: 24px; }

        /* PAGINATION DOTS */
        .slider-dots {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 12px;
        }

        .slider-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .slider-dot.active {
          background: #d4af37;
          border-color: #d4af37;
          transform: scale(1.2);
        }

        .slider-dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        /* Scroll indicator */
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

        .scroll-indicator:hover { color: #ffffff; }

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

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1024px) {
          .hero { padding: 0 32px; }
          .hero-content { max-width: 500px; }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 0 24px;
            justify-content: center;
            text-align: center;
          }
          .hero-content { max-width: 100%; }
          .hero-title { font-size: 2.8rem; }
          .hero-title .gold { font-size: 1.2rem; letter-spacing: 5px; }
          .hero-sub { font-size: 1.1rem; line-height: 1.7; }
          .hero-btn { padding: 14px 32px; font-size: 1rem; }
          
          .slider-btn { width: 40px; height: 40px; font-size: 18px; }
          .slider-btn.prev { left: 12px; }
          .slider-btn.next { right: 12px; }
          
          .slider-dots { bottom: 80px; gap: 8px; }
          .slider-dot { width: 10px; height: 10px; }
          .scroll-indicator { bottom: 20px; }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: 100vh;
            padding: 0 16px;
            justify-content: center;
            text-align: center;
          }
          .hero-title { font-size: 2.2rem; }
          .hero-title .gold { font-size: 1rem; letter-spacing: 3px; }
          .hero-sub { font-size: 1rem; line-height: 1.6; }
          .hero-btn { padding: 12px 24px; font-size: 0.9rem; }
          
          .slider-btn { display: none; } /* Hide side arrows on small screens */
          
          .slider-dots { bottom: 70px; gap: 6px; }
          .slider-dot { width: 8px; height: 8px; }
          .scroll-indicator .mouse { width: 20px; height: 32px; }
          .scroll-indicator .mouse .wheel { height: 6px; }
        }
      `}</style>

      {/* Hovering stops the auto-play so users can read at their own pace */}
      <section 
        className="hero" 
        onMouseEnter={() => setIsPlaying(false)} 
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* 1. SLIDER TRACK (Physical slide) */}
        <div 
          className="hero-slider" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
        </div>
        
        {/* 2. DARK OVERLAY */}
        <div className="overlay"></div>

        {/* 3. CONTENT */}
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

        {/* 4. SLIDER CONTROLS */}
        <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous Slide">
          ‹
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Next Slide">
          ›
        </button>

        {/* 5. PAGINATION DOTS */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 6. SCROLL INDICATOR */}
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