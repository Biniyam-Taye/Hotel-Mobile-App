// src/components/About.jsx
import { useState } from 'react';
import aboutImage from '../assets/hotelphoto.png';
import { Eye, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from './common/ScrollReveal';

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
          padding: 96px 24px;
          background: #ffffff;
          overflow: hidden;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Header */
        .about-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .about-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
          background: rgba(212, 175, 55, 0.08);
          padding: 6px 18px;
          border-radius: 9999px;
        }

        .about-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 14px;
        }

        .about-header p {
          color: #6b7280;
          font-size: 16.5px;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Content Grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        .about-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }

        .about-image-wrapper img {
          width: 100%;
          height: 440px;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .about-image-wrapper:hover img {
          transform: scale(1.05);
        }

        .about-image-wrapper .image-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(212, 175, 55, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 12px 24px;
          border-radius: 12px;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .about-text .subtitle {
          color: #d4af37;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .about-text h3 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 34px;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.25;
        }

        .about-text .description {
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
        }

        /* Vision & Mission Cards */
        .vision-mission {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 12px;
        }

        .vm-card {
          padding: 24px;
          background: #f8f9fa;
          border-radius: 16px;
          border-left: 4px solid #d4af37;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        }

        .vm-card:hover {
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .vm-card .vm-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.12);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 10px;
        }

        .vm-card h4 {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 6px 0;
        }

        .vm-card p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
        }

        /* Read More Button */
        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #d4af37;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          padding: 8px 0;
          width: fit-content;
        }

        /* Responsive */
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }

          .about-image-wrapper img {
            height: 520px;
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
            height: 300px;
          }

          .about-text h3 {
            font-size: 26px;
          }
        }
      `}</style>

      {/* ===== ABOUT HTML ===== */}
      <section className="about-section" id="about">
        <div className="about-container">
          {/* Header */}
          <ScrollReveal variant="fade-up">
            <div className="about-header">
              <div className="label">✦ ABOUT VILLA ALPHA</div>
              <h2>Discover <span style={{ color: '#d4af37' }}>Our Story</span></h2>
              <p>
                Learn more about our commitment to luxury, comfort, and 
                world-class hospitality.
              </p>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="about-grid">
            {/* Image */}
            <ScrollReveal variant="slide-right" duration={0.8}>
              <div className="about-image-wrapper">
                <img src={aboutImage} alt="Villa Alpha Hotel" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="image-badge"
                >
                  <Award size={18} />
                  Since 1998
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal variant="slide-left" duration={0.8}>
              <div className="about-text">
                <div className="subtitle">✦ Our Story</div>
                <h3>Luxury Redefined Since 1998</h3>

                <p className="description">
                  Villa Alpha International Hotel has been a symbol of luxury and 
                  hospitality in the heart of the city for over two decades. 
                  Our commitment to excellence has made us a preferred choice for 
                  discerning travelers from around the world.
                </p>

                <p className="description">
                  From our elegantly appointed rooms to our world-class amenities, 
                  every detail is designed to provide an unforgettable experience.
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="description" style={{ marginBottom: '12px' }}>
                        Our dedicated team of professionals works tirelessly to ensure 
                        that every guest feels valued and pampered. Whether you're 
                        visiting for business or pleasure, Villa Alpha offers an 
                        oasis of tranquility and sophistication.
                      </p>
                      <p className="description">
                        We take pride in our heritage and continuously strive to 
                        exceed expectations, setting new standards in luxury hospitality.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="read-more-btn" 
                  onClick={toggleReadMore}
                >
                  {isExpanded ? (
                    <>Read Less <ChevronUp size={18} /></>
                  ) : (
                    <>Read More <ChevronDown size={18} /></>
                  )}
                </motion.button>

                {/* Vision & Mission Cards */}
                <StaggerContainer staggerChildren={0.2} className="vision-mission">
                  <StaggerItem variant="fade-up">
                    <div className="vm-card">
                      <div className="vm-icon">
                        <Eye size={20} />
                      </div>
                      <h4>Our Vision</h4>
                      <p>
                        To be the leading luxury hotel destination, setting global 
                        standards in hospitality and guest satisfaction.
                      </p>
                    </div>
                  </StaggerItem>

                  <StaggerItem variant="fade-up">
                    <div className="vm-card">
                      <div className="vm-icon">
                        <Target size={20} />
                      </div>
                      <h4>Our Mission</h4>
                      <p>
                        To deliver exceptional experiences through personalized service, 
                        elegant surroundings, and unwavering commitment to excellence.
                      </p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;