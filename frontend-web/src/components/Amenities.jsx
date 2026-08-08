// src/components/Amenities.jsx
import { ArrowRight } from 'lucide-react';

const Amenities = () => {
  return (
    <>
      <style>{`
        .amenities-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .amenities-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .amenities-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .amenities-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .amenities-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .amenities-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ===== RESTAURANT CARD - FULL SCREEN ===== */
        .restaurant-card-wrapper {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-bottom: 30px;
        }

        .restaurant-card {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          height: 500px;
          background-color: #1a1a1a;
          cursor: default;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .restaurant-card:hover {
          transform: scale(1.01);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }

        .restaurant-card .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .restaurant-card:hover .card-image {
          transform: scale(1.05);
        }

        .restaurant-card .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.8) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 50px 60px;
          color: #ffffff;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          left: 50%;
          transform: translateX(-50%);
        }

        .restaurant-card .card-overlay .badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(4px);
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.25);
          margin-bottom: 10px;
          align-self: flex-start;
        }

        .restaurant-card .card-overlay h3 {
          font-size: 38px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: 0.5px;
        }

        .restaurant-card .card-overlay .description {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          margin: 0 0 4px 0;
          line-height: 1.6;
          max-width: 600px;
        }

        .restaurant-card .card-overlay .description2 {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          margin: 0 0 16px 0;
          line-height: 1.6;
          max-width: 600px;
        }

        .restaurant-card .card-overlay .learn-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d4af37;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: gap 0.3s ease;
          text-decoration: none;
          align-self: flex-start;
        }

        .restaurant-card .card-overlay .learn-more:hover {
          gap: 14px;
        }

        /* ===== SECTION DIVIDER / INTRO ===== */
        .amenities-divider {
          text-align: center;
          padding: 40px 24px 30px;
        }

        .amenities-divider .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .amenities-divider h3 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        /* ===== COMBINED CARD ===== */
        .combined-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-radius: 16px;
          overflow: hidden;
          background: #1a1a1a;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .combined-item {
          position: relative;
          height: 280px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.4s ease;
        }

        .combined-item:hover {
          transform: scale(1.02);
          z-index: 2;
        }

        .combined-item .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .combined-item:hover .item-image {
          transform: scale(1.06);
        }

        .combined-item .item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 28px;
          color: #ffffff;
        }

        .combined-item .item-overlay .badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.15);
          padding: 3px 12px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.15);
          margin-bottom: 6px;
          align-self: flex-start;
        }

        .combined-item .item-overlay h4 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .combined-item .item-overlay p {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.5;
        }

        .combined-item .item-overlay .explore-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          color: #d4af37;
          font-weight: 600;
          font-size: 13px;
          transition: gap 0.3s ease;
          text-decoration: none;
          align-self: flex-start;
        }

        .combined-item .item-overlay .explore-link:hover {
          gap: 12px;
        }

        @media (min-width: 768px) {
          .combined-card {
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .combined-item {
            height: 320px;
          }
          .combined-item:not(:last-child) {
            border-right: 1px solid rgba(255,255,255,0.06);
          }
        }

        @media (min-width: 1024px) {
          .restaurant-card {
            height: 550px;
          }
          .restaurant-card .card-overlay h3 {
            font-size: 44px;
          }
          .combined-item {
            height: 360px;
          }
          .combined-item .item-overlay h4 {
            font-size: 22px;
          }
        }

        @media (max-width: 768px) {
          .restaurant-card .card-overlay {
            padding: 30px 24px;
          }
          .restaurant-card .card-overlay h3 {
            font-size: 28px;
          }
          .restaurant-card .card-overlay .description {
            font-size: 14px;
          }
          .restaurant-card .card-overlay .description2 {
            font-size: 13px;
          }
          .amenities-divider h3 {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .amenities-section {
            padding: 60px 0;
          }
          .amenities-header h2 {
            font-size: 28px;
          }
          .restaurant-card {
            height: 320px;
          }
          .restaurant-card .card-overlay {
            padding: 20px 16px;
          }
          .restaurant-card .card-overlay h3 {
            font-size: 22px;
          }
          .restaurant-card .card-overlay .description {
            font-size: 13px;
          }
          .restaurant-card .card-overlay .description2 {
            font-size: 12px;
          }
          .combined-item {
            height: 220px;
          }
          .combined-item .item-overlay {
            padding: 16px 18px;
          }
          .combined-item .item-overlay h4 {
            font-size: 16px;
          }
          .combined-item .item-overlay p {
            font-size: 12px;
          }
          .amenities-container {
            padding: 0 16px;
          }
          .amenities-divider h3 {
            font-size: 22px;
          }
        }
      `}</style>

      <section className="amenities-section" id="amenities">
        <div className="amenities-container">
          <div className="amenities-header">
            <div className="label">✦ Premium Amenities</div>
            <h2>World‑Class Facilities</h2>
            <p>
              Experience luxury at its finest – from gourmet dining to rejuvenating wellness,
              every detail is crafted for your comfort.
            </p>
          </div>
        </div>

        {/* ===== RESTAURANT & BAR - FULL SCREEN ===== */}
        <div className="restaurant-card-wrapper">
          <div className="restaurant-card">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
              alt="Restaurant & Bar"
              className="card-image"
            />
            <div className="card-overlay">
              <span className="badge">✦ Gourmet Dining</span>
              <h3>Restaurant & Bar</h3>
              <p className="description">
                Exquisite dining with local and international cuisine, paired with a sophisticated bar.
              </p>
              <p className="description2">
                Our world‑class chefs craft every dish using the finest ingredients, 
                while our bartenders create signature cocktails in an elegant setting.
              </p>
              <a href="/restaurant" className="learn-more">
                Explore Menu <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ===== SIMPLE DIVIDER: ONLY THE HEADING ===== */}
        <div className="amenities-container">
          <div className="amenities-divider">
            <div className="label">✦ Wellness & Leisure</div>
            <h3>Recharge, Relax, Rejuvenate</h3>
          </div>
        </div>

        {/* ===== COMBINED CARD: Pool + Spa + Gym ===== */}
        <div className="amenities-container">
          <div className="combined-card">
            {/* Pool */}
            <div className="combined-item">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Swimming Pool"
                className="item-image"
              />
              <div className="item-overlay">
                <span className="badge">✦ Relax</span>
                <h4>Swimming Pool</h4>
                <p>Outdoor pool with sun loungers and poolside bar.</p>
                <a href="/pool" className="explore-link">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Spa */}
            <div className="combined-item">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Spa & Wellness"
                className="item-image"
              />
              <div className="item-overlay">
                <span className="badge">✦ Rejuvenate</span>
                <h4>Spa & Wellness</h4>
                <p>Signature treatments, sauna, and massage therapies.</p>
                <a href="/spa" className="explore-link">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Gym - FIXED: changed from /gym to /fitness */}
            <div className="combined-item">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Fitness Gym"
                className="item-image"
              />
              <div className="item-overlay">
                <span className="badge">✦ Energize</span>
                <h4>Fitness Gym</h4>
                <p>State‑of‑the‑art equipment, open 24/7 for you.</p>
                <a href="/fitness" className="explore-link">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;