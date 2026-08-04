// src/components/Stats.jsx
import { useState, useEffect, useRef } from 'react';
import { Award, Users, Hotel, Calendar, Star, Coffee, Heart, Globe } from 'lucide-react';

const Stats = () => {
  const [counts, setCounts] = useState({
    experience: 0,
    clients: 0,
    rooms: 0,
    awards: 0
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Target values
  const targets = {
    experience: 16,
    clients: 1000,
    rooms: 120,
    awards: 7,
  };

  // Intersection Observer to trigger animation when visible
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

  // Counting animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = {};
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

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const statsData = [
    {
      icon: Calendar,
      value: counts.experience,
      label: 'Years of Experience',
      suffix: '+',
      color: '#d4af37'
    },
    {
      icon: Users,
      value: counts.clients,
      label: 'Happy Clients',
      suffix: '+',
      color: '#d4af37'
    },
    {
      icon: Hotel,
      value: counts.rooms,
      label: 'Luxury Rooms',
      suffix: '+',
      color: '#d4af37'
    },
    {
      icon: Award,
      value: counts.awards,
      label: 'Awards Won',
      suffix: '',
      color: '#d4af37'
    }
  ];

  return (
    <>
      <style>{`
        /* ===== STATS / ABOUT SECTION ===== */
        .stats-section {
          padding: 80px 24px;
          background: #f8f9fa;
          position: relative;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Header */
        .stats-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .stats-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .stats-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .stats-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .stat-card {
          background: #ffffff;
          padding: 34px 20px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.04);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 50%;
          margin-bottom: 12px;
          color: #d4af37;
        }

        .stat-number {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 44px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.1;
        }

        .stat-number .suffix {
          color: #d4af37;
          font-size: 28px;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
          font-weight: 500;
        }

        /* Responsive */
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .stat-number {
            font-size: 52px;
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
            font-size: 32px;
          }
          .stat-card {
            padding: 24px 12px;
          }
        }
      `}</style>

      {/* ===== STATS HTML ===== */}
      <section className="stats-section" ref={sectionRef}>
        <div className="stats-container">
          {/* Header */}
          <div className="stats-header">
            <div className="label"> </div>
            <h2>Excellence in Hospitality</h2>
            <p>
              Since our founding, we've been dedicated to providing 
              unforgettable experiences for our guests.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-number">
                  {formatNumber(stat.value)}
                  {stat.suffix && <span className="suffix">{stat.suffix}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;