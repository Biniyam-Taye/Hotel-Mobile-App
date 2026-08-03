// src/components/Navbar.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ===== TRANSPARENT NAVBAR ===== */
        .navbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 20px 24px;
          background: transparent;
          transition: background 0.3s ease;
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          backdrop-filter: blur(10px);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af37;
          font-weight: bold;
          font-size: 18px;
        }

        .logo-title {
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 3px;
          margin: 0;
        }

        /* Desktop Nav Links - WHITE TEXT */
        .nav-links {
          display: none;
          align-items: center;
          gap: 32px;
        }

        .nav-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #d4af37;
        }

        /* Auth Buttons - WHITE TEXT */
        .auth-buttons {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .auth-buttons a {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-login {
          padding: 8px 20px;
          color: rgba(255, 255, 255, 0.8);
        }

        .btn-login:hover {
          color: #d4af37;
        }

        .btn-signup {
          padding: 8px 20px;
          background: #d4af37;
          color: #1a1a1a;
          border-radius: 9999px;
          transition: all 0.3s;
        }

        .btn-signup:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* Mobile Menu Button - WHITE */
        .menu-toggle {
          display: block;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
        }

        /* Mobile Menu - DARK */
        .mobile-menu {
          display: none;
          margin-top: 16px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 8px 0;
          transition: color 0.3s;
        }

        .mobile-menu a:hover {
          color: #d4af37;
        }

        .mobile-divider {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-divider a {
          text-align: center;
          padding: 8px;
        }

        .mobile-divider .btn-signup-mobile {
          background: #d4af37;
          color: #1a1a1a;
          border-radius: 9999px;
          padding: 10px;
          text-align: center;
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
          .auth-buttons {
            display: flex;
          }
          .menu-toggle {
            display: none;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <nav className="navbar" id="navbar">
        <div className="navbar-container">
          {/* Logo - WHITE TEXT */}
          <a href="/" className="logo">
            <div className="logo-icon">V</div>
            <div>
              <h1 className="logo-title">VILLA ALPHA</h1>
              <p className="logo-subtitle">INTERNATIONAL HOTEL</p>
            </div>
          </a>

          {/* Desktop Nav Links - WHITE TEXT */}
          <div className="nav-links">
            <a href="/rooms">Rooms& Suites</a>
            <a href="/hospitality">Hospitality</a>
            <a href="/experience">Experience</a>
            <a href="/about">About</a>
          </div>

          {/* Auth Buttons - WHITE TEXT */}
          <div className="auth-buttons">
            <a href="/login" className="btn-login">Login</a>
            <a href="/signup" className="btn-signup">Sign Up</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="/rooms">Rooms</a>
          <a href="/hospitality">Hospitality</a>
          <a href="/experience">Experience</a>
          <a href="/about">About</a>
          <div className="mobile-divider">
            <a href="/login">Login</a>
            <a href="/signup" className="btn-signup-mobile">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Scroll effect script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
              navbar.classList.add('navbar-scrolled');
            } else {
              navbar.classList.remove('navbar-scrolled');
            }
          });
        `
      }} />
    </>
  );
};

export default Navbar;