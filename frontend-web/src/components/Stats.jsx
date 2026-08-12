// src/components/Stats.jsx
import { useState, useEffect, useRef } from 'react';
import { Award, Users, Hotel, Calendar, Sparkles } from 'lucide-react';

const Stats = () => {
  const [counts, setCounts] = useState({
    experience: 0,
    clients: 0,
    rooms: 0,
    awards: 0
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const targets = {
    experience: 16,
    clients: 1000,
    rooms: 120,
    awards: 7,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        experience: Math.min(Math.floor(targets.experience * progress), targets.experience),
        clients: Math.min(Math.floor(targets.clients * progress), targets.clients),
        rooms: Math.min(Math.floor(targets.rooms * progress), targets.rooms),
        awards: Math.min(Math.floor(targets.awards * progress), targets.awards)
      });

      if (currentStep < steps) {
        setTimeout(animate, stepTime);
      }
    };

    animate();
  }, [isVisible]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const statsData = [
    {
      icon: Calendar,
      value: counts.experience,
      label: 'Years of Excellence',
      suffix: '+'
    },
    {
      icon: Users,
      value: counts.clients,
      label: 'Happy Guests',
      suffix: '+'
    },
    {
      icon: Hotel,
      value: counts.rooms,
      label: 'Luxury Suites',
      suffix: '+'
    },
    {
      icon: Award,
      value: counts.awards,
      label: 'Awards Won'
    }
  ];

  return (
    <>
      <style>{`
        /* ===== PREMIUM STATS WITH BACKGROUND IMAGE ===== */
        .stats-section {
          position: relative;
          padding: 80px 24px;
          background: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed;
          background-attachment: fixed;
          overflow: hidden;
        }

        /* Dark overlay */
        .stats-section .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 0;
        }

        /* Decorative gold line */
        .stats-section .gold-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, transparent, #d4af37, transparent);
          z-index: 1;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .stats-header {
          text-align: center;
          margin-bottom: 48px;
          color: #ffffff;
        }

        .stats-header .label {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(4px);
          padding: 6px 20px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.25);
          margin-bottom: 12px;
        }

        .stats-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
          position: relative;
          display: inline-block;
        }

        .stats-header h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #d4af37;
          border-radius: 2px;
        }

        .stats-header p {
          color: rgba(255,255,255,0.7);
          font-size: 16px;
          max-width: 600px;
          margin: 20px auto 0;
          line-height: 1.6;
        }

        /* Glass-morphism cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 34px 20px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }

        /* Inner glow on hover */
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #d4af37, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }

        /* Icon */
        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          background: rgba(212, 175, 55, 0.15);
          border-radius: 50%;
          margin-bottom: 14px;
          color: #d4af37;
          transition: all 0.4s ease;
          border: 1px solid rgba(212, 175, 55, 0.1);
        }

        .stat-card:hover .stat-icon {
          background: rgba(212, 175, 55, 0.25);
          transform: scale(1.05);
          border-color: rgba(212, 175, 55, 0.3);
        }

        /* Numbers - white for contrast */
        .stat-number {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .stat-number .suffix {
          color: #d4af37;
          font-size: 30px;
          font-weight: 400;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin-top: 6px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* Decorative dot */
        .stat-card .dot {
          position: absolute;
          bottom: 12px;
          right: 16px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
          opacity: 0.2;
          transition: all 0.4s ease;
        }

        .stat-card:hover .dot {
          opacity: 0.6;
          transform: scale(1.5);
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
          }
          .stat-number {
            font-size: 52px;
          }
          .stat-card {
            padding: 40px 24px;
          }
        }

        @media (max-width: 480px) {
          .stats-section {
            padding: 60px 16px;
          }
          .stats-header h2 {
            font-size: 28px;
          }
          .stat-number {
            font-size: 34px;
          }
          .stat-card {
            padding: 24px 12px;
          }
          .stat-icon {
            width: 56px;
            height: 56px;
          }
          .stat-icon svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>

      {/* ===== STATS HTML ===== */}
      <section className="stats-section" ref={sectionRef}>
        <div className="overlay"></div>
        <div className="gold-line"></div>

        <div className="stats-container">
          <div className="stats-header">
            <div className="label">
              <Sparkles size={14} /> Our Legacy
            </div>
            {/* REVERTED BACK TO MATCH THE ELEGANT WHITE/GOLD THEME */}
            <h2>Excellence in Hospitality</h2>
            <p>
              Since our founding, we've been dedicated to providing 
              unforgettable experiences for our guests.
            </p>
          </div>

          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={28} />
                </div>
                <div className="stat-number">
                  {formatNumber(stat.value)}
                  {stat.suffix && <span className="suffix">{stat.suffix}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;