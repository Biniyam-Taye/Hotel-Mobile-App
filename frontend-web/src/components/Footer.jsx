// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <style>{`
        /* ===== FOOTER BASE STYLES ===== */
        .footer {
          background: #1a1a1a;
          color: #ffffff;
          padding: 60px 24px 0;
          margin-top: 40px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
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
          background: #d4af37;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          color: #1a1a1a;
        }

        .footer-brand-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .footer-brand-subtitle {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 3px;
          margin: 0;
        }

        .footer-brand-description {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          line-height: 1.7;
          max-width: 320px;
        }

        /* ===== HEADINGS ===== */
        .footer-heading {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
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
          color: rgba(255,255,255,0.4);
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
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          font-size: 12px;
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
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          line-height: 1.6;
        }

        .contact-text strong {
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }

        /* ===== NEWSLETTER ===== */
        .newsletter-form {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .newsletter-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          background: rgba(255,255,255,0.05);
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .newsletter-input:focus {
          border-color: #d4af37;
          background: rgba(255,255,255,0.08);
        }

        .newsletter-btn {
          padding: 10px 20px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        /* ===== BOTTOM BAR ===== */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-bottom p {
          color: rgba(255,255,255,0.2);
          font-size: 13px;
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        /* ===== RESPONSIVE ===== */
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

          .footer-brand-description {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 40px 16px 0;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      {/* ===== FOOTER HTML ===== */}
      <footer className="footer">
        <div className="footer-container">
          {/* Main Grid */}
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-brand-logo">
                <div className="footer-brand-icon">V</div>
                <div>
                  <h3 className="footer-brand-title">VILLA ALPHA</h3>
                  <p className="footer-brand-subtitle">INTERNATIONAL HOTEL</p>
                </div>
              </div>
              <p className="footer-brand-description">
                Experience unparalleled luxury and world-class hospitality at Villa Alpha.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                <li><Link to="/rooms" className="footer-link">Rooms & Suites</Link></li>
                <li><Link to="/hospitality" className="footer-link">Hospitality</Link></li>
                <li><Link to="/experience" className="footer-link">Experience</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
              </ul>
            </div>

            {/* Support - THIS IS THE CODE YOU ASKED FOR */}
            <div>
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-list">
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
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
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: '0 0 8px' }}>
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
                <button type="submit" className="newsletter-btn">
                  <Send size={16} /> Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
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
        </div>
      </footer>
    </>
  );
};

export default Footer;