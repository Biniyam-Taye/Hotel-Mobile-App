// src/components/Amenities.jsx
import { Link, ArrowRight } from 'lucide-react';

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
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .combined-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          border-radius: 16px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
          border: none;
        }

        .combined-item {
          position: relative;
          height: 280px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .combined-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
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
          background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%);
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

        /* --- MATCHING GOLD EXPLORE ALL BUTTON --- */
        .explore-all-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 60px;
        }

        .explore-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 36px;
          border: 2px solid #d4af37;
          border-radius: 9999px;
          color: #d4af37;
          background: transparent;
          font-weight: 700;
          font-size: 18px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .explore-all-btn:hover {
          background: #d4af37;
          color: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .explore-all-btn .arrow-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #d4af37;
          transition: all 0.3s ease;
        }

        .explore-all-btn:hover .arrow-circle {
          background: #1a1a1a;
          border-color: #1a1a1a;
          color: #d4af37;
        }

        @media (min-width: 1024px) {
          .combined-card {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          .combined-item {
            height: 360px;
          }
          .combined-item .item-overlay h4 {
            font-size: 22px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .combined-card {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .combined-item {
            height: 320px;
          }
        }

        @media (max-width: 767px) {
          .amenities-section {
            padding: 60px 0;
          }
          .amenities-header h2 {
            font-size: 28px;
          }
          .amenities-container {
            padding: 0 16px;
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
          .combined-card {
            gap: 16px;
          }
          .explore-all-btn {
            font-size: 15px;
            padding: 14px 24px;
          }
        }
      `}</style>

      <section className="amenities-section" id="amenities">
        <div className="amenities-container">
          <div className="amenities-header">
            {/* FIXED HOSPITALITY COLOR TO GOLD */}
            <h2>Hotel <span style={{ color: '#d4af37' }}>Hospitality</span></h2>
            <p>
              Discover dining, spa, massage, tours, and premium services from our partner hotels — crafted for unforgettable stays.
            </p>
          </div>
        </div>

        <div className="amenities-container">
          <div className="combined-card">
            <div className="combined-item">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Restaurant & Bar"
                className="item-image"
              />
              <div className="item-overlay">
                <span className="badge">✦ Fine Dining</span>
                <h4>Restaurant & Bar</h4>
                <p>Exquisite local and international cuisine, paired with a sophisticated bar.</p>
                <a href="/restaurant" className="explore-link">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            </div>

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

          <div className="explore-all-wrapper">
            <Link to="/hospitality" className="explore-all-btn">
              Explore All Hospitality
              <span className="arrow-circle">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;