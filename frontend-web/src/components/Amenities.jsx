// src/components/Amenities.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  fetchHotelServices,
  fetchFacilities,
  fetchEventSpaces,
  fetchRestaurantHighlight,
  buildSectionCard,
} from '../services/hospitalityApi';

const SECTION_DEFAULTS = {
  restaurant: {
    id: 1,
    title: 'Restaurant & Bar',
    badge: 'FINE DINING',
    description: 'Savor world-class cuisine and signature cocktails in an elegant atmosphere.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
    link: '/restaurant',
  },
  services: {
    id: 2,
    title: 'Hotel Services',
    badge: '24/7 CONCIERGE',
    description: 'Experience 24/7 concierge support, luggage assistance, and personalized attention.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop',
    link: '/hospitality',
  },
  facilities: {
    id: 3,
    title: 'Facilities & Wellness',
    badge: 'REJUVENATE',
    description: 'Relax with a pampering spa day, access our state-of-the-art gym, or unwind by the pool.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop',
    link: '/facilities-wellness',
  },
  events: {
    id: 4,
    title: 'Events & Conference',
    badge: 'PREMIUM VENUES',
    description: 'Host memorable meetings, weddings, and conferences in our versatile premium venues.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop',
    link: '/events-conferences',
  },
};

const Amenities = () => {
  const [cards, setCards] = useState([
    { ...SECTION_DEFAULTS.restaurant },
    { ...SECTION_DEFAULTS.services },
    { ...SECTION_DEFAULTS.facilities },
    { ...SECTION_DEFAULTS.events },
  ]);

  useEffect(() => {
    const loadCards = async () => {
      const [servicesResult, facilitiesResult, eventsResult, menuResult] = await Promise.allSettled([
        fetchHotelServices(),
        fetchFacilities(),
        fetchEventSpaces(),
        fetchRestaurantHighlight(),
      ]);

      const hotelServices = servicesResult.status === 'fulfilled' ? servicesResult.value : [];
      const facilities = facilitiesResult.status === 'fulfilled' ? facilitiesResult.value : [];
      const eventSpaces = eventsResult.status === 'fulfilled' ? eventsResult.value : [];
      const menuHighlight = menuResult.status === 'fulfilled' ? menuResult.value : null;

      const restaurantCard = menuHighlight
        ? {
            ...SECTION_DEFAULTS.restaurant,
            description: menuHighlight.description || SECTION_DEFAULTS.restaurant.description,
            image: menuHighlight.image && !menuHighlight.image.startsWith('default-')
              ? menuHighlight.image
              : SECTION_DEFAULTS.restaurant.image,
          }
        : { ...SECTION_DEFAULTS.restaurant };

      setCards([
        restaurantCard,
        buildSectionCard(SECTION_DEFAULTS.services, hotelServices),
        buildSectionCard(SECTION_DEFAULTS.facilities, facilities),
        buildSectionCard(SECTION_DEFAULTS.events, eventSpaces, 'popular'),
      ]);
    };

    loadCards();
  }, []);

  return (
    <section className="amenities-section" id="amenities">
      <div className="amenities-container">
        <div className="amenities-header">
          <div className="label">✦ Curated Experiences ✦</div>
          <h2>Hotel <span>Hospitality</span></h2>
          <p>
            Discover dining, spa, massage, tours, and premium services from our partner hotels —
            crafted for unforgettable stays.
          </p>
        </div>

        <div className="amenities-grid">
          {cards.map((card) => (
            <div key={card.id} className="amenity-card">
              <div className="card-image">
                <img src={card.image} alt={card.title} loading="lazy" />
                <span className="badge">{card.badge}</span>
              </div>
              <div className="card-body">
                <h3 className="title">{card.title}</h3>
                <p className="description">{card.description}</p>
                <Link to={card.link} className="explore-link">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-all-wrapper">
          <Link to="/hospitality" className="explore-all-btn">
            Explore All Hospitality <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        .amenities-section {
          padding: 80px 24px;
          background: #f6f7f9;
          font-family: 'Poppins', sans-serif;
        }
        .amenities-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .amenities-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .amenities-header .label {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8941e;
          background: rgba(184, 148, 30, 0.08);
          padding: 6px 24px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .amenities-header h2 {
          font-family: 'Georgia', serif;
          font-size: 42px;
          font-weight: 700;
          color: #0e0e0e;
          margin-bottom: 8px;
        }
        .amenities-header h2 span { color: #b8941e; }
        .amenities-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .amenity-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #eaeef2;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(0,0,0,0.02);
        }
        .amenity-card:hover {
          transform: translateY(-6px);
          border-color: rgba(184,148,30,0.15);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
        }
        .amenity-card .card-image {
          height: 200px;
          overflow: hidden;
          background: #eef0f2;
          position: relative;
        }
        .amenity-card .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .amenity-card:hover .card-image img { transform: scale(1.05); }
        .amenity-card .card-image .badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .amenity-card .card-body {
          padding: 18px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .amenity-card .card-body .title {
          font-size: 19px;
          font-weight: 700;
          color: #0e0e0e;
          margin: 0 0 10px;
          font-family: 'Georgia', serif;
        }

        .amenity-card .card-body .description {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .amenity-card .card-body .explore-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 13px;
          color: #b8941e;
          text-decoration: none;
          transition: gap 0.3s ease;
          margin-top: auto;
          align-self: flex-start;
        }
        .amenity-card .card-body .explore-link:hover { gap: 12px; }
        .amenity-card .card-body .explore-link svg {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }
        .amenity-card .card-body .explore-link:hover svg { transform: translateX(4px); }

        .explore-all-wrapper {
          display: flex;
          justify-content: center;
        }
        .explore-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          background: #b8941e;
          color: #ffffff;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid #b8941e;
        }
        .explore-all-btn:hover {
          background: transparent;
          color: #b8941e;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(184,148,30,0.15);
        }
        .explore-all-btn svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }
        .explore-all-btn:hover svg { transform: translateX(4px); }

        @media (max-width: 1024px) {
          .amenities-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .amenities-section { padding: 60px 16px; }
          .amenities-header h2 { font-size: 30px; }
          .amenities-grid { grid-template-columns: 1fr; }
          .amenity-card .card-image { height: 180px; }
          .explore-all-btn { padding: 12px 24px; font-size: 14px; }
        }
        @media (max-width: 480px) {
          .amenities-header h2 { font-size: 24px; }
          .amenity-card .card-image { height: 160px; }
        }
      `}</style>
    </section>
  );
};

export default Amenities;
