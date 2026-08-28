// src/components/Amenities.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, ConciergeBell, Waves, CalendarDays } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// ── Static card data — titles & descriptions NEVER come from the API ──
const SECTION_DEFAULTS = [
  {
    id: 1,
    title: 'Restaurant & Bar',
    badge: 'Fine Dining',
    description: 'Savour world-class cuisine, craft cocktails, and live evening ambience in our elegant restaurant and rooftop bar.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    link: '/restaurant',
    Icon: UtensilsCrossed,
    accentColor: '#d4af37',
  },
  {
    id: 2,
    title: 'Hotel Services',
    badge: '24/7 Concierge',
    description: 'From airport transfers and room service to laundry and concierge — we handle every detail of your stay.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    link: '/hospitality',
    Icon: ConciergeBell,
    accentColor: '#0ea5e9',
  },
  {
    id: 3,
    title: 'Facilities & Wellness',
    badge: 'Rejuvenate',
    description: 'Unwind at our heated pool, revitalise in the spa, or power through in the state-of-the-art fitness centre.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop',
    link: '/facilities-wellness',
    Icon: Waves,
    accentColor: '#06b6d4',
  },
  {
    id: 4,
    title: 'Events & Conferences',
    badge: 'Premium Venues',
    description: 'Host unforgettable weddings, corporate events, and conferences in our stunning ballroom and garden pavilion.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop',
    link: '/events-conferences',
    Icon: CalendarDays,
    accentColor: '#ec4899',
  },
];

const Amenities = () => {
  const [cards, setCards] = useState(SECTION_DEFAULTS);

  useEffect(() => {
    // Only update images from API — titles & descriptions stay static
    const updateImages = async () => {
      const fetchers = [
        async () => {
          try {
            const res = await fetch(`${API_BASE}/restaurant/menu`);
            const json = await res.json();
            const menu = json.data?.menu || [];
            for (const cat of menu) {
              const item = cat.items?.find(i => i.image && !i.image.startsWith('default-'));
              if (item) return item.image;
            }
          } catch { /* keep default */ }
          return null;
        },
        async () => {
          try {
            const res = await fetch(`${API_BASE}/services/public/hotel`);
            const json = await res.json();
            const svc = (json.data?.services || []).find(s => s.image && !s.image.startsWith('default-'));
            return svc?.image || null;
          } catch { return null; }
        },
        async () => {
          try {
            const res = await fetch(`${API_BASE}/facilities/public`);
            const json = await res.json();
            const fac = (json.data?.facilities || []).find(f => f.image && !f.image.startsWith('default-'));
            return fac?.image || null;
          } catch { return null; }
        },
        async () => {
          try {
            const res = await fetch(`${API_BASE}/events/spaces/public`);
            const json = await res.json();
            const sp = (json.data?.spaces || []).find(s => s.image && !s.image.startsWith('default-'));
            return sp?.image || null;
          } catch { return null; }
        },
      ];

      const images = await Promise.all(fetchers.map(f => f()));
      setCards(SECTION_DEFAULTS.map((card, i) =>
        images[i] ? { ...card, image: images[i] } : card
      ));
    };
    updateImages();
  }, []);

  return (
    <section className="am-section" id="amenities">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        .am-section {
          padding: 96px 24px 104px;
          background: linear-gradient(160deg, #f8f9fb 0%, #eff1f5 100%);
          font-family: 'Inter', sans-serif;
        }
        .am-container { max-width: 1240px; margin: 0 auto; }

        /* ── Header ── */
        .am-header { text-align: center; margin-bottom: 64px; }
        .am-lbl {
          display: inline-block;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #c9970c;
          background: rgba(201,151,12,0.09);
          padding: 6px 22px; border-radius: 999px;
          margin-bottom: 14px;
        }
        .am-header h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 46px; font-weight: 700;
          color: #0e0e0e; margin: 0 0 14px; line-height: 1.15;
        }
        .am-header h2 span { color: #c9970c; }
        .am-header p {
          font-size: 17px; color: #6b7280;
          max-width: 620px; margin: 0 auto; line-height: 1.75;
        }

        /* ── 4-column grid ── */
        .am-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
          margin-bottom: 56px;
        }

        /* ── Card ── */
        .am-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #e8ebf0;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
          transition: transform 0.32s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.32s ease,
                      border-color 0.32s ease;
          position: relative;
        }
        .am-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.10);
          border-color: rgba(201,151,12,0.25);
        }

        /* ── Image area ── */
        .am-img-wrap {
          height: 210px;
          overflow: hidden;
          position: relative;
          background: #e8ebf0;
        }
        .am-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.55s cubic-bezier(.22,.68,0,1.2);
        }
        .am-card:hover .am-img-wrap img { transform: scale(1.08); }

        /* dark gradient overlay on hover */
        .am-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .am-card:hover .am-img-wrap::after { opacity: 1; }

        /* badge */
        .am-badge {
          position: absolute; top: 16px; left: 16px; z-index: 2;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          color: #fff;
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          transition: background 0.3s ease;
        }
        .am-card:hover .am-badge { background: rgba(201,151,12,0.88); }

        /* icon chip — revealed on hover */
        .am-icon-chip {
          position: absolute; bottom: 14px; right: 14px; z-index: 2;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.96);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
          transform: scale(0.6) translateY(8px);
          opacity: 0;
          transition: transform 0.32s cubic-bezier(.22,.68,0,1.2),
                      opacity 0.32s ease;
        }
        .am-card:hover .am-icon-chip { transform: scale(1) translateY(0); opacity: 1; }

        /* ── Card body ── */
        .am-body {
          padding: 22px 22px 26px;
          display: flex; flex-direction: column; flex: 1;
        }

        /* title */
        .am-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 20px; font-weight: 700;
          color: #111827; margin: 0 0 10px; line-height: 1.25;
          transition: color 0.25s ease;
        }
        .am-card:hover .am-title { color: #c9970c; }

        /* description */
        .am-desc {
          font-size: 13.5px; color: #6b7280;
          line-height: 1.65; margin: 0 0 20px; flex: 1;
          transition: color 0.25s ease;
        }
        .am-card:hover .am-desc { color: #374151; }

        /* explore link */
        .am-link {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 700;
          color: #c9970c; text-decoration: none;
          padding: 9px 20px;
          border: 1.5px solid #e6c65a;
          border-radius: 999px;
          align-self: flex-start;
          transition: all 0.25s ease;
        }
        .am-link svg { transition: transform 0.25s ease; flex-shrink: 0; }
        .am-card:hover .am-link {
          background: #c9970c; color: #fff;
          border-color: #c9970c;
          box-shadow: 0 4px 18px rgba(201,151,12,0.32);
        }
        .am-card:hover .am-link svg { transform: translateX(4px); }

        /* ── Explore all ── */
        .am-all-wrap { display: flex; justify-content: center; }
        .am-all-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 44px;
          background: #111827; color: #fff;
          border-radius: 999px;
          font-size: 15px; font-weight: 700;
          text-decoration: none;
          border: 2px solid #111827;
          transition: all 0.28s ease;
          letter-spacing: 0.3px;
        }
        .am-all-btn svg { transition: transform 0.28s ease; }
        .am-all-btn:hover {
          background: transparent; color: #111827;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.10);
        }
        .am-all-btn:hover svg { transform: translateX(6px); }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .am-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .am-section { padding: 64px 16px 72px; }
          .am-header h2 { font-size: 32px; }
          .am-grid { grid-template-columns: 1fr; gap: 18px; }
          .am-img-wrap { height: 190px; }
        }
      `}</style>

      <div className="am-container">

        {/* Header */}
        <div className="am-header">
          <div className="am-lbl">✦ Curated Experiences ✦</div>
          <h2>Hotel <span>Hospitality</span></h2>
          <p>
            Discover dining, spa, massage, tours, and premium services —
            crafted for your most unforgettable stays.
          </p>
        </div>

        {/* Cards */}
        <div className="am-grid">
          {cards.map(({ id, title, badge, description, image, link, Icon, accentColor }) => (
            <div key={id} className="am-card">
              <div className="am-img-wrap">
                <img src={image} alt={title} loading="lazy" />
                <div className="am-badge">{badge}</div>
                <div className="am-icon-chip">
                  <Icon size={18} color={accentColor} />
                </div>
              </div>
              <div className="am-body">
                <h3 className="am-title">{title}</h3>
                <p className="am-desc">{description}</p>
                <Link to={link} className="am-link">
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="am-all-wrap">
          <Link to="/hospitality" className="am-all-btn">
            Explore All Hospitality <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Amenities;
