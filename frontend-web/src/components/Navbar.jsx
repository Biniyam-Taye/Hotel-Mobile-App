// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ===== TRANSPARENT CURVED NAVBAR ===== */
        .navbar {
          position: fixed;
          top: 20px; 
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 12px 28px;
          border-radius: 50px;
          width: 90%;
          max-width: 1200px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.08);
          box-sizing: border-box;
          transition: background 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(16px);
        }

        .navbar-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: #d4af37;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 800;
          font-size: 15px;
        }

        .logo-text {
          line-height: 1.2;
        }

        .logo-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .logo-subtitle {
          font-size: 7px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 3px;
          margin: 0;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: color 0.3s;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: #d4af37;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .auth-buttons a {
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .btn-login {
          padding: 6px 14px;
          color: rgba(255,255,255,0.85);
        }

        .btn-login:hover {
          color: #d4af37;
        }

        .btn-signup {
          padding: 6px 20px;
          background: #d4af37;
          color: #1a1a1a;
          border-radius: 9999px;
          transition: all 0.3s;
          font-weight: 600;
        }

        .btn-signup:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 992px) {
          .nav-links {
            gap: 16px;
          }
          .nav-links a {
            font-size: 11px;
          }
          .btn-login {
            font-size: 11px;
            padding: 4px 10px;
          }
          .btn-signup {
            font-size: 11px;
            padding: 4px 14px;
          }
          .navbar {
            padding: 10px 20px;
            width: 95%;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            top: 12px;
            padding: 10px 16px;
            border-radius: 30px;
            width: 96%;
            background: rgba(0,0,0,0.5);
          }

          .nav-links {
            display: none;
          }

          .auth-buttons {
            display: none;
          }

          .menu-toggle {
            display: block;
          }

          .mobile-menu {
            display: none;
            margin-top: 12px;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            padding: 20px;
            flex-direction: column;
            gap: 12px;
          }

          .mobile-menu.open {
            display: flex;
          }

          .mobile-menu a {
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            padding: 8px 0;
            font-weight: 500;
            font-size: 14px;
            transition: color 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .mobile-menu a:hover {
            color: #d4af37;
          }

          .mobile-divider {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .mobile-divider a {
            text-align: center;
            padding: 10px;
          }

          .mobile-divider .btn-signup-mobile {
            background: #d4af37;
            color: #1a1a1a;
            border-radius: 9999px;
            font-weight: 600;
          }
        }

        @media (max-width: 480px) {
          .logo-title {
            font-size: 12px;
          }
          .logo-subtitle {
            font-size: 6px;
            letter-spacing: 2px;
          }
          .logo-icon {
            width: 28px;
            height: 28px;
            font-size: 11px;
          }
          .navbar {
            top: 10px;
            padding: 8px 12px;
            border-radius: 20px;
            width: 98%;
          }
        }
      `}</style>

      <nav className="navbar" id="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <div className="logo-icon">V</div>
            <div className="logo-text">
              <h1 className="logo-title">VILLA ALPHA</h1>
              <p className="logo-subtitle">INTERNATIONAL HOTEL</p>
            </div>
          </Link>

          <div className="nav-links">
            <Link to="/rooms">Rooms</Link>
            <Link to="/hospitality">Hospitality</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/signup" className="btn-signup">Sign Up</Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>Rooms</Link>
          <Link to="/hospitality" onClick={() => setIsMenuOpen(false)}>Hospitality</Link>
          <Link to="/experience" onClick={() => setIsMenuOpen(false)}>Experience</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <div className="mobile-divider">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="btn-signup-mobile" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      </nav>

      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
            } else {
              navbar.classList.remove('scrolled');
            }
          });
        `
      }} />
    </>
  );
};

export default Navbar;