// src/components/About.jsx
import { useState } from 'react';
import aboutImage from '../assets/hotelphoto.png'; // Replace with your about image
import { Eye, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <style>{`
        /* ===== ABOUT SECTION ===== */
        .about-section {
          padding: 80px 24px;
          background: #ffffff;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Header */
        .about-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .about-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .about-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .about-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Content Grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        .about-image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }

        .about-image-wrapper img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }

        .about-image-wrapper .image-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(212, 175, 55, 0.9);
          backdrop-filter: blur(4px);
          padding: 10px 20px;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-text .subtitle {
          color: #d4af37;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .about-text h3 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          color: #1a1a1a;
          margin: 0;
        }

        .about-text .description {
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
        }

        .about-text .description.expanded {
          max-height: none;
        }

        .about-text .description.collapsed {
          max-height: 120px;
          overflow: hidden;
          position: relative;
        }

        .about-text .description.collapsed::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(transparent, #ffffff);
        }

        /* Vision & Mission Cards */
        .vision-mission {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 8px;
        }

        .vm-card {
          padding: 20px 24px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #d4af37;
        }

        .vm-card .vm-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 8px;
        }

        .vm-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .vm-card p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        /* Read More Button */
        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #d4af37;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.3s;
        }

        .read-more-btn:hover {
          color: #a16207;
        }

        /* Responsive */
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }

          .about-image-wrapper img {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 16px;
          }

          .about-header h2 {
            font-size: 30px;
          }

          .vision-mission {
            grid-template-columns: 1fr;
          }

          .about-image-wrapper img {
            height: 280px;
          }

          .about-text h3 {
            font-size: 26px;
          }

          .about-image-wrapper .image-badge {
            font-size: 12px;
            padding: 8px 16px;
          }
        }

        @media (max-width: 480px) {
          .about-header h2 {
            font-size: 24px;
          }

          .about-text h3 {
            font-size: 22px;
          }

          .vm-card {
            padding: 16px;
          }
        }
      `}</style>

      {/* ===== ABOUT HTML ===== */}
      <section className="about-section" id="about">
        <div className="about-container">
          {/* Header */}
          <div className="about-header">
            <div className="label">✦ ABOUT VILLA ALPHA</div>
            <h2>Discover Our Story</h2>
            <p>
              Learn more about our commitment to luxury, comfort, and 
              world-class hospitality.
            </p>
          </div>

          {/* Content */}
          <div className="about-grid">
            {/* Image */}
            <div className="about-image-wrapper">
              <img src={aboutImage} alt="Villa Alpha Hotel" />
              <div className="image-badge">
                <Award size={16} />
                Since 1998
              </div>
            </div>

            {/* Text */}
            <div className="about-text">
              <div className="subtitle">✦ Our Story</div>
              <h3>Luxury Redefined Since 1998</h3>

              <p className={`description ${isExpanded ? 'expanded' : 'collapsed'}`}>
                Villa Alpha International Hotel has been a symbol of luxury and 
                hospitality in the heart of the city for over two decades. 
                Our commitment to excellence has made us a preferred choice for 
                discerning travelers from around the world.
              </p>

              <p className={`description ${isExpanded ? 'expanded' : 'collapsed'}`}>
                From our elegantly appointed rooms to our world-class amenities, 
                every detail is designed to provide an unforgettable experience. 
                We believe that true luxury lies in the details — the warmth of 
                our welcome, the comfort of our beds, and the excellence of our service.
              </p>

              {isExpanded && (
                <>
                  <p className="description expanded">
                    Our dedicated team of professionals works tirelessly to ensure 
                    that every guest feels valued and pampered. Whether you're 
                    visiting for business or pleasure, Villa Alpha offers an 
                    oasis of tranquility and sophistication.
                  </p>
                  <p className="description expanded">
                    We take pride in our heritage and continuously strive to 
                    exceed expectations, setting new standards in luxury hospitality.
                  </p>
                </>
              )}

              <button className="read-more-btn" onClick={toggleReadMore}>
                {isExpanded ? (
                  <>Read Less <ChevronUp size={18} /></>
                ) : (
                  <>Read More <ChevronDown size={18} /></>
                )}
              </button>

              {/* Vision & Mission */}
              <div className="vision-mission">
                <div className="vm-card">
                  <div className="vm-icon">
                    <Eye size={18} />
                  </div>
                  <h4>Our Vision</h4>
                  <p>
                    To be the leading luxury hotel destination, setting global 
                    standards in hospitality and guest satisfaction.
                  </p>
                </div>
                <div className="vm-card">
                  <div className="vm-icon">
                    <Target size={18} />
                  </div>
                  <h4>Our Mission</h4>
                  <p>
                    To deliver exceptional experiences through personalized service, 
                    elegant surroundings, and unwavering commitment to excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;