// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#1a1a1a',
      color: '#ffffff',
      padding: '60px 24px 0',
      marginTop: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: '#d4af37',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '20px',
                color: '#1a1a1a'
              }}>V</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>VILLA ALPHA</h3>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', margin: 0 }}>INTERNATIONAL HOTEL</p>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.7', maxWidth: '320px' }}>
              Experience unparalleled luxury and world-class hospitality at Villa Alpha.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><Link to="/rooms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Rooms & Suites</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/hospitality" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Hospitality</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/experience" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Experience</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><Link to="/faq" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>FAQ</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/privacy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/terms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Terms of Service</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Get in Touch</h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <MapPin size={18} color="#d4af37" />
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Address</strong><br />
                Main Road, Adama, Ethiopia
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <Phone size={18} color="#d4af37" />
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Phone</strong><br />
                +251 123 456 789
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <Mail size={18} color="#d4af37" />
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Email</strong><br />
                info@villalpha.com
              </div>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '20px', marginBottom: '8px' }}>Newsletter</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} style={{ display: 'flex', gap: '8px' }}>
              <input type="email" placeholder="Your email" required style={{
                flex: 1,
                padding: '10px 16px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.05)',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }} />
              <button type="submit" style={{
                padding: '10px 20px',
                background: '#d4af37',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Send size={16} /> Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0 }}>
            © 2026 VILLA ALPHA INTERNATIONAL HOTEL. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: '12px' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: '12px' }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: '12px' }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;