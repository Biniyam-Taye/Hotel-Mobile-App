// src/components/Experiences.jsx
import React from 'react';

const Experiences = () => {
  const experiences = [
    {
      title: 'Gourmet Dining',
      description: 'Savor exquisite cuisine prepared by award-winning chefs using locally sourced ingredients.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Spa & Wellness',
      description: 'Rejuvenate with our signature spa treatments, sauna, and wellness programs.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'City Tours',
      description: 'Explore the city with our guided tours to historical landmarks and hidden gems.',
      // BRAND NEW RELIABLE URL
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760c47aa?w=600' 
    },
    {
      title: 'Cultural Events',
      description: 'Immerse yourself in local culture with live music, art exhibitions, and workshops.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <>
      <style>{`
        /* Import Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

        .exp-section {
          padding: 80px 24px;
          background: #ffffff;
          font-family: 'Poppins', sans-serif;
        }

        .exp-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* --- HEADER --- */
        .exp-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .exp-header .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f3f4f6;
          padding: 8px 20px 8px 16px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 20px;
        }

        .exp-header .badge .dot {
          width: 8px;
          height: 8px;
          background: #d4af37;
          border-radius: 50%;
          display: block;
        }

        .exp-header h2 {
          font-family: 'Playfair Display', 'Times New Roman', serif;
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 20px 0;
          line-height: 1.2;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .exp-header h2 .gold {
          color: #d4af37;
        }

        .exp-header p {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          color: #6b7280;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* --- CARDS --- */
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .exp-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #f3f4f6;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
        }

        .exp-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .exp-card .exp-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .exp-card .exp-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }

        .exp-card:hover .exp-image-wrapper img {
          transform: scale(1.08);
        }

        .exp-card .exp-content {
          padding: 24px 24px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .exp-card .exp-content h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 10px 0;
        }

        .exp-card .exp-content h3::after {
          content: '';
          display: block;
          width: 40px;
          height: 3px;
          background: #d4af37;
          margin-top: 8px;
          border-radius: 2px;
        }

        .exp-card .exp-content p {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }

        /* --- RESPONSIVE --- */
        @media (min-width: 768px) {
          .exp-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .exp-grid { grid-template-columns: repeat(4, 1fr); }
          .exp-header h2 { font-size: 52px; }
        }

        @media (max-width: 640px) {
          .exp-section { padding: 60px 16px; }
          .exp-header h2 { font-size: 32px; flex-direction: column; gap: 4px; }
          .exp-header p { font-size: 16px; }
          .exp-card .exp-image-wrapper { height: 180px; }
        }
      `}</style>

      <section className="exp-section">
        <div className="exp-container">
          <div className="exp-header">
            <div className="badge">
              <span className="dot"></span>
              Immersive Activities
            </div>
            <h2>
              <span>Unforgettable</span>
              <span className="gold">Experiences</span>
            </h2>
            <p>
              Elevate your stay with our curated selection of breathtaking activities, serene spa retreats, 
              and world-class culinary adventures.
            </p>
          </div>

          <div className="exp-grid">
            {experiences.map((item, index) => (
              <div key={index} className="exp-card">
                <div className="exp-image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="exp-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Experiences;