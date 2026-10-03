// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from './common/ScrollReveal';
import Logo from './common/Logo';

const Footer = () => {
  return (
    <>
      <style>{`
        /* ===== FOOTER BASE STYLES ===== */
        .footer {
          background: #121216;
          color: #ffffff;
          padding: 72px 24px 0;
          margin-top: 40px;
          overflow: hidden;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* ===== BRAND ===== */
        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .footer-brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          color: #1a1a1a;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .footer-brand-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .footer-brand-subtitle {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 3px;
          margin: 0;
        }

        .footer-brand-description {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.7;
          max-width: 320px;
        }

        /* ===== HEADINGS ===== */
        .footer-heading {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 18px;
          color: #ffffff;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-list li {
          margin-bottom: 10px;
        }

        /* ===== HOVER EFFECTS ===== */
        .footer-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }

        .footer-link:hover {
          color: #d4af37 !important;
          transform: translateX(4px);
        }

        .footer-legal-link {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-size: 12.5px;
          transition: color 0.3s ease;
        }

        .footer-legal-link:hover {
          color: #d4af37 !important;
        }

        /* ===== CONTACT ITEMS ===== */
        .contact-item {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
        }

        .contact-item svg {
          color: #d4af37;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-text {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.6;
        }

        .contact-text strong {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        /* ===== NEWSLETTER ===== */
        .newsletter-form {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .newsletter-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          color: #ffffff;
          font-size: 13.5px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .newsletter-input:focus {
          border-color: #d4af37;
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .newsletter-btn {
          padding: 10px 22px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* ===== BOTTOM BAR ===== */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 0;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-bottom p {
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-btn {
            width: 100%;
            justify-content: center;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 48px 16px 0;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>

      {/* ===== FOOTER HTML ===== */}
      <footer className="footer">
        <div className="footer-container">
          {/* Main Grid with Staggered Scroll Reveal */}
          <StaggerContainer staggerChildren={0.12} className="footer-grid">
            {/* Brand */}
            <StaggerItem variant="fade-up">
              <div className="footer-brand">
                <div className="footer-brand-logo" style={{ marginBottom: '16px' }}>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Logo size="large" />
                  </Link>
                </div>
                <p className="footer-brand-description">
                  Experience unparalleled luxury and world-class hospitality at Villa Alpha.
                </p>
              </div>
            </StaggerItem>

            {/* Quick Links */}
            <StaggerItem variant="fade-up">
              <div>
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-list">
                  <li><Link to="/rooms" className="footer-link">Rooms & Suites</Link></li>
                  <li><Link to="/hospitality" className="footer-link">Hospitality</Link></li>
                  <li><Link to="/experience" className="footer-link">Experience</Link></li>
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                </ul>
              </div>
            </StaggerItem>

            {/* Support */}
            <StaggerItem variant="fade-up">
              <div>
                <h4 className="footer-heading">Support</h4>
                <ul className="footer-list">
                  <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                  <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                </ul>
              </div>
            </StaggerItem>

            {/* Contact & Newsletter */}
            <StaggerItem variant="fade-up">
              <div>
                <h4 className="footer-heading">Get in Touch</h4>

                <div className="contact-item">
                  <MapPin size={18} />
                  <div className="contact-text">
                    <strong>Address</strong><br />
                    Main Road, Adama, Ethiopia
                  </div>
                </div>

                <div className="contact-item">
                  <Phone size={18} />
                  <div className="contact-text">
                    <strong>Phone</strong><br />
                    +251 123 456 789
                  </div>
                </div>

                <div className="contact-item">
                  <Mail size={18} />
                  <div className="contact-text">
                    <strong>Email</strong><br />
                    info@villalpha.com
                  </div>
                </div>

                <h4 className="footer-heading" style={{ marginTop: '20px' }}>Newsletter</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '0 0 8px' }}>
                  Subscribe for exclusive offers & updates
                </p>

                <form className="newsletter-form" onSubmit={(e) => {
                  e.preventDefault();
                  alert('🎉 Thank you for subscribing!');
                }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="newsletter-input"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="newsletter-btn"
                  >
                    <Send size={15} /> Subscribe
                  </motion.button>
                </form>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Bottom Bar */}
          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="footer-bottom">
              <p>
                © {new Date().getFullYear()} VILLA ALPHA INTERNATIONAL HOTEL. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
                <Link to="/contact" className="footer-legal-link">Contact</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </>
  );
};

export default Footer;