// src/pages/HospitalityPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, BedDouble, Utensils, HeartPulse, ConciergeBell, PartyPopper,
  Plane, Waves, Star, ShieldCheck, CheckCircle2, PhoneCall, ArrowRight,
  Clock, Award, Coffee, Gift, Compass, Car, ChevronRight, Check
} from 'lucide-react';

const HOSPITALITY_PILLARS = [
  {
    id: 'suites',
    number: '01',
    title: 'Luxury Accommodations & Royal Suites',
    tag: 'STAY IN ELEGANCE',
    description: 'Immerse yourself in supreme comfort with soundproof sanctuary suites, plush King beds, panoramic balcony vistas, marble bathrooms, and automated smart-room ambient controls.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    features: ['24/7 Personal Butler Service', 'Marble Bathrooms & Heated Jacuzzis', 'Smart Lighting & Climate Touchpads', 'In-Room Espresso & Wine Bar'],
    link: '/rooms',
    linkText: 'Explore Suites & Rooms',
  },
  {
    id: 'dining',
    number: '02',
    title: 'Fine Dining & Gastronomic Mastery',
    tag: 'SAVOR THE FLAVORS',
    description: 'Indulge in a culinary journey crafted by international chefs. From authentic Ethiopian coffee ceremonies to continental gourmet buffets and rooftop cocktail lounges.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    features: ['Rooftop Skyline Bar & Bistro', 'Traditional Ethiopian Coffee Rituals', '24-Hour Gourmet In-Room Dining', 'Sommelier Wine & Spirits Pairing'],
    link: '/restaurant',
    linkText: 'Discover Fine Dining',
  },
  {
    id: 'wellness',
    number: '03',
    title: 'Holistic Wellness & Spa Sanctuary',
    tag: 'REJUVENATE BODY & MIND',
    description: 'Reclaim inner peace with therapeutic deep-tissue massages, aromatherapy steam baths, infinity thermal pool access, and state-of-the-art cardio and strength training.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    features: ['Deep Tissue & Aromatherapy Massage', 'Eucalyptus Steam & Finnish Sauna', 'Temperature-Controlled Infinity Pool', 'Private Personal Fitness Trainers'],
    link: '/facilities-wellness',
    linkText: 'Explore Wellness & Spa',
  },
  {
    id: 'concierge',
    number: '04',
    title: '24/7 VIP Concierge & Valet Chauffeur',
    tag: 'UNRIVALED CONVENIENCE',
    description: 'Enjoy effortless travel with airport limousine transfers, private city excursions, express dry cleaning, and dedicated personal assistants for all your requests.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    features: ['Airport Limousine & Shuttle Pickups', 'Private Chauffeured Mercedes Fleet', 'Express Same-Day Laundry & Pressing', '24/7 Personal Booking Assistant'],
    link: '/contact',
    linkText: 'Request VIP Concierge',
  },
  {
    id: 'events',
    number: '05',
    title: 'Grand Ballrooms & Corporate Conference Hubs',
    tag: 'HOST WITH PRESTIGE',
    description: 'Transform your weddings, galas, and high-level executive summits into unforgettable occasions in our grand ballrooms equipped with cutting-edge audiovisual systems.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    features: ['Grand Ballroom (Up to 800 Guests)', 'HD Projection & Live Stream Audio', 'Custom Catering & Banquet Menu', 'Dedicated Event Planners'],
    link: '/events-conferences',
    linkText: 'Plan Your Event',
  },
  {
    id: 'experiences',
    number: '06',
    title: 'Bespoke Curated Guest Experiences',
    tag: 'CREATE LASTING MEMORIES',
    description: 'Enhance your trip with exclusive tailored packages, private poolside champagne dinners, cultural city heritage tours, and VIP anniversary setups.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    features: ['Romantic Sunset Champagne Dinners', 'Guided Historical City Excursions', 'Tailored Anniversary & Birthday Decor', 'VIP Priority Access to All Amenities'],
    link: '/experience',
    linkText: 'Browse Experiences',
  },
];

const SERVICES_GRID = [
  { icon: Clock, title: '24/7 Room Service', desc: 'Fresh gourmet meals and beverages delivered directly to your door at any hour.' },
  { icon: Car, title: 'Airport Limousine Pickup', desc: 'Seamless, luxury chauffeured transfer from airport arrival straight to hotel lobby.' },
  { icon: Sparkles, title: 'Express Laundry & Valet', desc: 'Professional eco-friendly dry cleaning, laundering, and garment pressing.' },
  { icon: ConciergeBell, title: 'Dedicated Personal Butler', desc: 'Attentive personal assistance for unpacking, itinerary planning, and room setup.' },
  { icon: Waves, title: 'Thermal Pool & Spa Access', desc: 'Complimentary access to heated infinity pool, steam room, and relaxation lounge.' },
  { icon: ShieldCheck, title: 'High-Level Security & Privacy', desc: 'Discrete, round-the-clock professional security and private entry suites.' },
  { icon: Coffee, title: 'Authentic Coffee Ceremony', desc: 'Experience traditional Ethiopian coffee roasting rituals served freshly in the lounge.' },
  { icon: Gift, title: 'Custom Loyalty Perks', desc: 'Exclusive room upgrades, late check-out options, and anniversary gifts for members.' },
];

const REVIEWS = [
  {
    name: 'Elena Rostova',
    role: 'International Ambassador',
    comment: 'The hospitality at Villa Alpha is simply world-class. From the moment the airport chauffeur greeted me to the personalized butler service, every detail surpassed expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Marcus Vance',
    role: 'Tech Executive & Frequent Guest',
    comment: 'I travel globally, and Villa Alpha ranks among the top 1% in genuine warmth and hospitality. The rooftop dining and spa treatments are unmatched in East Africa.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Dr. Sophia Williams',
    role: 'Conference Keynote Speaker',
    comment: 'Hosted our regional summit in the Grand Ballroom. The hospitality staff executed every request flawlessly. Exceptional food, immaculate suites, and 24/7 support.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

const HospitalityPage = () => {
  useEffect(() => {
    // Scroll reveal animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        /* ===== LIGHT LUXURY SHELL ===== */
        .hosp-page-light {
          background: #fdfbf7;
          color: #1a1a1a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          padding-top: 100px;
        }

        /* ===== SCROLL REVEAL ANIMATIONS ===== */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== HERO BANNER (LIGHT LUXURY) ===== */
        .hosp-hero-light {
          position: relative;
          padding: 110px 24px 90px;
          background: radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 65%),
                      linear-gradient(180deg, #ffffff 0%, #fdfbf7 100%);
          text-align: center;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }

        .hosp-badge-light {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 22px;
          background: #fef8eb;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 9999px;
          color: #b8860b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.08);
          transition: transform 0.3s;
        }

        .hosp-badge-light:hover {
          transform: translateY(-2px);
        }

        .hosp-hero-title-light {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          font-weight: 700;
          line-height: 1.15;
          color: #111827;
          max-width: 920px;
          margin: 0 auto 22px;
          letter-spacing: -0.5px;
        }

        .hosp-hero-title-light span {
          color: #b8860b;
          background: linear-gradient(135deg, #c9970c 0%, #92700a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hosp-hero-sub-light {
          font-size: 17.5px;
          color: #555e6d;
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .hosp-hero-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        /* ===== BUTTON HOVER EFFECTS ===== */
        .btn-gold-light {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          color: #ffffff;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 25px rgba(184, 134, 11, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-gold-light::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .btn-gold-light:hover::before {
          left: 100%;
        }

        .btn-gold-light:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 35px rgba(184, 134, 11, 0.45);
        }

        .btn-outline-dark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: #ffffff;
          border: 1.5px solid #111827;
          color: #111827;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.35s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .btn-outline-dark:hover {
          background: #111827;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(17, 24, 39, 0.25);
        }

        /* ===== METRICS COUNTER BAR (LIGHT MODE) ===== */
        .hosp-metrics-light {
          max-width: 1200px;
          margin: -45px auto 100px;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }

        .metrics-card-light {
          background: #ffffff;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 28px;
          padding: 36px 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          box-shadow: 0 15px 45px rgba(184, 134, 11, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .metrics-card-light:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 60px rgba(184, 134, 11, 0.14);
        }

        .metric-item-light {
          text-align: center;
          border-right: 1px solid #f3f4f6;
        }

        .metric-item-light:last-child {
          border-right: none;
        }

        .metric-val-light {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          color: #b8860b;
          margin-bottom: 4px;
          transition: transform 0.3s;
        }

        .metric-item-light:hover .metric-val-light {
          transform: scale(1.08);
        }

        .metric-label-light {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ===== SECTION HEADINGS ===== */
        .sec-head-light {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 65px;
          padding: 0 24px;
        }

        .sec-tag-light {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #b8860b;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }

        .sec-title-light {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px;
          line-height: 1.22;
        }

        .sec-desc-light {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== PILLARS SHOWCASE SECTION ===== */
        .pillars-sec-light {
          max-width: 1240px;
          margin: 0 auto 130px;
          padding: 0 24px;
        }

        .pillar-card-light {
          background: #ffffff;
          border: 1px solid #f1eeea;
          border-radius: 32px;
          padding: 44px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 50px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pillar-card-light:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 22px 60px rgba(184, 134, 11, 0.14);
        }

        .pillar-card-light.reverse {
          direction: rtl;
        }

        .pillar-card-light.reverse > * {
          direction: ltr;
        }

        .pillar-img-box {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
        }

        .pillar-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pillar-card-light:hover .pillar-img-box img {
          transform: scale(1.08) rotate(0.5deg);
        }

        .pillar-overlay-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 6px 16px;
          border-radius: 9999px;
          color: #b8860b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .pillar-num-light {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 700;
          color: rgba(212, 175, 55, 0.35);
          line-height: 1;
          margin-bottom: 6px;
        }

        .pillar-tag-light {
          font-size: 11px;
          font-weight: 800;
          color: #b8860b;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .pillar-title-light {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .pillar-desc-light {
          font-size: 15px;
          color: #555e6d;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .pillar-features-light {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .pillar-feature-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14.5px;
          color: #374151;
          font-weight: 500;
        }

        .pillar-feature-icon-light {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fef8eb;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #b8860b;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s, background 0.25s;
        }

        .pillar-feature-row:hover .pillar-feature-icon-light {
          transform: scale(1.15);
          background: #b8860b;
          color: #ffffff;
        }

        .pillar-link-light {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #b8860b;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .pillar-link-light:hover {
          color: #92700a;
          gap: 14px;
        }

        /* ===== SERVICES GRID SECTION (LIGHT MODE) ===== */
        .services-sec-light {
          background: #f7f4ed;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          padding: 110px 0;
          margin-bottom: 130px;
        }

        .services-container-light {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .services-grid-light {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .svc-card-light {
          background: #ffffff;
          border: 1px solid #eae6df;
          border-radius: 24px;
          padding: 32px 26px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        .svc-card-light:hover {
          background: #ffffff;
          border-color: rgba(212, 175, 55, 0.5);
          transform: translateY(-8px);
          box-shadow: 0 18px 45px rgba(184, 134, 11, 0.14);
        }

        .svc-icon-box-light {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: #fef8eb;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #b8860b;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: all 0.35s ease;
        }

        .svc-card-light:hover .svc-icon-box-light {
          transform: scale(1.12) rotate(3deg);
          background: linear-gradient(135deg, #d4af37, #b8860b);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(184, 134, 11, 0.3);
        }

        .svc-feature-title-light {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px;
        }

        .svc-feature-desc-light {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== TESTIMONIALS (LIGHT MODE) ===== */
        .reviews-sec-light {
          max-width: 1240px;
          margin: 0 auto 130px;
          padding: 0 24px;
        }

        .reviews-grid-light {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .review-card-light {
          background: #ffffff;
          border: 1px solid #f0ebe1;
          border-radius: 28px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.35s ease;
        }

        .review-card-light:hover {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow: 0 18px 45px rgba(184, 134, 11, 0.12);
        }

        .review-stars-light {
          display: flex;
          gap: 4px;
          color: #d4af37;
          margin-bottom: 18px;
        }

        .review-text-light {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.75;
          font-style: italic;
          margin-bottom: 28px;
        }

        .review-author-light {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .review-avatar-light {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #d4af37;
          box-shadow: 0 4px 12px rgba(184, 134, 11, 0.2);
        }

        .author-name-light {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .author-role-light {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        /* ===== CALL TO ACTION BANNER (LIGHT MODE) ===== */
        .hosp-cta-light {
          max-width: 1240px;
          margin: 0 auto 110px;
          padding: 0 24px;
        }

        .cta-box-light {
          background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
          border-radius: 36px;
          padding: 80px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(17, 24, 39, 0.25);
          color: #ffffff;
        }

        .cta-box-light::before {
          content: '';
          position: absolute;
          top: -50%; right: -20%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-title-light {
          font-family: 'Playfair Display', serif;
          font-size: 44px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .cta-desc-light {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.75);
          max-width: 620px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .metrics-card-light { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .metric-item-light { border-right: none; }
          .services-grid-light { grid-template-columns: repeat(2, 1fr); }
          .reviews-grid-light { grid-template-columns: 1fr; }
          .pillar-card-light, .pillar-card-light.reverse { grid-template-columns: 1fr; gap: 36px; padding: 32px; direction: ltr; }
          .pillar-card-light.reverse > * { direction: ltr; }
        }

        @media (max-width: 640px) {
          .hosp-hero-title-light { font-size: 38px; }
          .metrics-card-light { grid-template-columns: 1fr; padding: 28px 20px; }
          .services-grid-light { grid-template-columns: 1fr; }
          .sec-title-light { font-size: 32px; }
          .cta-title-light { font-size: 32px; }
          .pillar-card-light { padding: 24px; }
        }
      `}</style>

      <div className="hosp-page-light">
        {/* ===== HERO BANNER ===== */}
        <section className="hosp-hero-light reveal-on-scroll">
          <div className="hosp-badge-light">
            <Sparkles size={14} /> VILLA ALPHA HOSPITALITY SHOWCASE
          </div>
          <h1 className="hosp-hero-title-light">
            The Art of Unrivaled <span>Luxury &amp; Warmth</span>
          </h1>
          <p className="hosp-hero-sub-light">
            From imperial royal suites and gourmet gastronomy to 24/7 VIP concierge care and holistic spa sanctuaries — experience true Ethiopian hospitality elevated to international perfection.
          </p>
          <div className="hosp-hero-btns">
            <a href="#pillars" className="btn-gold-light">
              Explore Our Hospitality <ArrowRight size={16} />
            </a>
            <Link to="/rooms" className="btn-outline-dark">
              Book A Suite
            </Link>
          </div>
        </section>

        {/* ===== METRICS COUNTER BAR ===== */}
        <section className="hosp-metrics-light reveal-on-scroll">
          <div className="metrics-card-light">
            <div className="metric-item-light">
              <div className="metric-val-light">100%</div>
              <div className="metric-label-light">Guest Satisfaction</div>
            </div>
            <div className="metric-item-light">
              <div className="metric-val-light">24/7</div>
              <div className="metric-label-light">VIP Butler Service</div>
            </div>
            <div className="metric-item-light">
              <div className="metric-val-light">5 ★</div>
              <div className="metric-label-light">Luxury Standard</div>
            </div>
            <div className="metric-item-light">
              <div className="metric-val-light">50+</div>
              <div className="metric-label-light">Tailored Offerings</div>
            </div>
          </div>
        </section>

        {/* ===== HOSPITALITY PILLARS SHOWCASE ===== */}
        <section id="pillars" className="pillars-sec-light">
          <div className="sec-head-light reveal-on-scroll">
            <span className="sec-tag-light">✦ OUR SIX PILLARS OF EXCELLENCE</span>
            <h2 className="sec-title-light">Hospitality Redefined At Villa Alpha</h2>
            <p className="sec-desc-light">
              Every moment of your stay is curated with precision, elegance, and genuine care. Discover what makes our hospitality world-renowned.
            </p>
          </div>

          {HOSPITALITY_PILLARS.map((p, idx) => (
            <div
              key={p.id}
              className={`pillar-card-light reveal-on-scroll ${idx % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="pillar-img-box">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="pillar-overlay-tag">PILLAR {p.number}</div>
              </div>

              <div className="pillar-content">
                <div className="pillar-num-light">{p.number}</div>
                <span className="pillar-tag-light">{p.tag}</span>
                <h3 className="pillar-title-light">{p.title}</h3>
                <p className="pillar-desc-light">{p.description}</p>

                <div className="pillar-features-light">
                  {p.features.map((feat, i) => (
                    <div key={i} className="pillar-feature-row">
                      <div className="pillar-feature-icon-light">
                        <Check size={13} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link to={p.link} className="pillar-link-light">
                  {p.linkText} <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ===== SERVICES GRID SECTION ===== */}
        <section className="services-sec-light">
          <div className="services-container-light">
            <div className="sec-head-light reveal-on-scroll">
              <span className="sec-tag-light">✦ COMPREHENSIVE AMENITIES</span>
              <h2 className="sec-title-light">Tailored Hospitality Services</h2>
              <p className="sec-desc-light">
                Whether traveling for leisure or executive business, our dedicated staff provides non-stop support for a flawless stay.
              </p>
            </div>

            <div className="services-grid-light">
              {SERVICES_GRID.map((s, idx) => {
                const IconComponent = s.icon;
                return (
                  <div key={idx} className="svc-card-light reveal-on-scroll">
                    <div className="svc-icon-box-light">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="svc-feature-title-light">{s.title}</h3>
                    <p className="svc-feature-desc-light">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== REVIEWS & TESTIMONIALS ===== */}
        <section className="reviews-sec-light">
          <div className="sec-head-light reveal-on-scroll">
            <span className="sec-tag-light">✦ GUEST PRAISE</span>
            <h2 className="sec-title-light">What Our Guests Say About Our Hospitality</h2>
            <p className="sec-desc-light">
              Hear directly from our global dignitaries, corporate leaders, and returning guests.
            </p>
          </div>

          <div className="reviews-grid-light">
            {REVIEWS.map((r, idx) => (
              <div key={idx} className="review-card-light reveal-on-scroll">
                <div>
                  <div className="review-stars-light">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                  <p className="review-text-light">"{r.comment}"</p>
                </div>
                <div className="review-author-light">
                  <img src={r.avatar} alt={r.name} className="review-avatar-light" />
                  <div>
                    <h4 className="author-name-light">{r.name}</h4>
                    <p className="author-role-light">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CALL TO ACTION FOOTER BANNER ===== */}
        <section className="hosp-cta-light reveal-on-scroll">
          <div className="cta-box-light">
            <h2 className="cta-title-light">Experience Hospitality at Its Finest</h2>
            <p className="cta-desc-light">
              Your unforgettable retreat awaits. Reserve your stay today and allow our concierge team to prepare your royal welcome.
            </p>
            <div className="hosp-hero-btns">
              <Link to="/rooms" className="btn-gold-light">
                Book Your Stay Now <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-dark" style={{ background: 'transparent', borderColor: '#ffffff', color: '#ffffff' }}>
                <PhoneCall size={16} /> Contact Concierge
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HospitalityPage;