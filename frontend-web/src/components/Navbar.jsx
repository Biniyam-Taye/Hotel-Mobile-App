// src/components/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Logo from './common/Logo';
import { ScrollProgressBar } from './common/ScrollReveal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll handler for translucent -> dark background shift
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const getDisplayName = () => {
    if (!user) return 'Account';
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    return user.email?.split('@')[0] || 'Account';
  };

  const getUserInitials = () => {
    if (!user) return 'G';
    const first = (user.firstName || user.name || user.email || '')[0] || '';
    const last = (user.lastName || '')[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      <style>{`
        /* ===== TRANSPARENT CURVED NAVBAR ===== */
        .navbar {
          position: fixed;
          top: 18px;
          left: 50%;
          z-index: 1000;
          background: rgba(10, 15, 26, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 10px 32px;
          border-radius: 9999px;
          width: 92%;
          max-width: 1240px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 20px rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.22);
          box-sizing: border-box;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .navbar.scrolled {
          top: 12px;
          background: rgba(10, 15, 26, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(212, 175, 55, 0.15);
          padding: 8px 28px;
        }

        .navbar-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link-item {
          position: relative;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 600;
          transition: color 0.3s ease;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          white-space: nowrap;
          padding: 6px 0;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #f5d879);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link-item:hover { color: #d4af37; }
        .nav-link-item:hover::after { width: 80%; }

        /* ---- Auth area ---- */
        .auth-area {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .auth-area a {
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 600;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          white-space: nowrap;
        }

        .btn-nav-login {
          padding: 7px 16px;
          color: rgba(255,255,255,0.85);
        }

        .btn-nav-login:hover { color: #d4af37; }

        .btn-nav-signup {
          padding: 9px 24px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d879 100%);
          color: #1a1a1a !important;
          border-radius: 9999px;
          font-weight: 700 !important;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-nav-signup:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.55);
        }

        /* ---- User dropdown ---- */
        .user-dropdown-wrapper {
          position: relative;
        }

        .user-avatar-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(212,175,55,0.12);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 9999px;
          padding: 5px 14px 5px 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: #d4af37;
        }

        .user-avatar-btn:hover {
          background: rgba(212,175,55,0.2);
          border-color: rgba(212,175,55,0.5);
        }

        .user-avatar-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
          color: #1a1a1a;
          flex-shrink: 0;
        }

        .user-name-text {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          color: rgba(255,255,255,0.5);
          transition: transform 0.2s;
          flex-shrink: 0;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: rgba(10,10,20,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 16px;
          padding: 8px;
          min-width: 190px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          z-index: 100;
        }

        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          transition: all 0.15s;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }

        .user-dropdown-item:hover {
          background: rgba(212,175,55,0.1);
          color: #d4af37;
        }

        .user-dropdown-item.danger:hover {
          background: rgba(239,68,68,0.1);
          color: #f87171;
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 6px 0;
        }

        /* ---- Hamburger ---- */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-menu {
          margin-top: 12px;
          background: rgba(10, 10, 18, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid rgba(212,175,55,0.2);
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

        .mobile-menu a:hover { color: #d4af37; }

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

        .mobile-btn-signup {
          background: #d4af37;
          color: #1a1a1a !important;
          border-radius: 9999px;
          font-weight: 600 !important;
        }

        .mobile-btn-orders {
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 9999px;
          color: #d4af37 !important;
        }

        .mobile-logout-btn {
          background: none;
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          border-radius: 9999px;
          padding: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          font-family: inherit;
          transition: all 0.2s;
        }

        .mobile-logout-btn:hover {
          background: rgba(239,68,68,0.1);
        }

        @media (max-width: 992px) {
          .nav-links { gap: 16px; }
          .nav-links a { font-size: 11px; }
          .btn-nav-login { font-size: 11px; padding: 4px 10px; }
          .btn-nav-signup { font-size: 11px; padding: 4px 14px; }
          .navbar { padding: 10px 20px; width: 95%; }
        }

        @media (max-width: 768px) {
          .navbar {
            top: 12px;
            padding: 10px 16px;
            border-radius: 30px;
            width: 96%;
          }
          .nav-links { display: none; }
          .auth-area { display: none; }
          .menu-toggle { display: block; }
        }

        @media (max-width: 480px) {
          .logo-title { font-size: 12px; }
          .logo-subtitle { font-size: 6px; letter-spacing: 2px; }
          .logo-icon { width: 28px; height: 28px; font-size: 11px; }
          .navbar { top: 10px; padding: 8px 12px; border-radius: 20px; width: 98%; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        id="navbar"
      >
        <div className="navbar-container">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="medium" />
          </Link>

          <div className="nav-links">
            {['Rooms', 'Hospitality', 'Experience', 'About'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="nav-link-item">
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block' }}
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Desktop auth area */}
          <div className="auth-area">
            {user ? (
              <div className="user-dropdown-wrapper" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="user-avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar-circle">{getUserInitials()}</div>
                  <span className="user-name-text">
                    {getDisplayName()}
                  </span>
                  <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="user-dropdown-menu"
                    >
                      <Link
                        to="/my-orders"
                        className="user-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <ShoppingBag size={15} /> My Orders
                      </Link>
                      <div className="dropdown-divider" />
                      <button className="user-dropdown-item danger" onClick={handleLogout}>
                        <LogOut size={15} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/login" className="btn-nav-login">Login</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="btn-nav-signup">Sign Up</Link>
                </motion.div>
              </>
            )}
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu"
            >
              <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>Rooms</Link>
              <Link to="/hospitality" onClick={() => setIsMenuOpen(false)}>Hospitality</Link>
              <Link to="/experience" onClick={() => setIsMenuOpen(false)}>Experience</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>

              <div className="mobile-divider">
                {user ? (
                  <>
                    <Link to="/my-orders" className="mobile-btn-orders" onClick={() => setIsMenuOpen(false)}>
                      🛍️ My Orders
                    </Link>
                    <button className="mobile-logout-btn" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="mobile-btn-signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;