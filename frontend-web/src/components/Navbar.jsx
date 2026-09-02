// src/components/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

        .logo-text { line-height: 1.2; }

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

        .nav-links a:hover { color: #d4af37; }

        /* ---- Auth area ---- */
        .auth-area {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .auth-area a {
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .btn-nav-login {
          padding: 6px 14px;
          color: rgba(255,255,255,0.85);
        }

        .btn-nav-login:hover { color: #d4af37; }

        .btn-nav-signup {
          padding: 6px 20px;
          background: #d4af37;
          color: #1a1a1a !important;
          border-radius: 9999px;
          font-weight: 600 !important;
        }

        .btn-nav-signup:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
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
          animation: dropIn 0.18s ease both;
          z-index: 100;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
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

        .mobile-menu { display: none; }

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
            background: rgba(0,0,0,0.5);
          }
          .nav-links { display: none; }
          .auth-area { display: none; }
          .menu-toggle { display: block; }

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

          .mobile-menu.open { display: flex; }

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
        }

        @media (max-width: 480px) {
          .logo-title { font-size: 12px; }
          .logo-subtitle { font-size: 6px; letter-spacing: 2px; }
          .logo-icon { width: 28px; height: 28px; font-size: 11px; }
          .navbar { top: 10px; padding: 8px 12px; border-radius: 20px; width: 98%; }
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

          {/* Desktop auth area */}
          <div className="auth-area">
            {user ? (
              <div className="user-dropdown-wrapper" ref={dropdownRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar-circle">{getUserInitials()}</div>
                  <span className="user-name-text">
                    {getDisplayName()}
                  </span>
                  <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="user-dropdown-menu">
                    <Link
                      to="/my-orders"
                      className="user-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <ShoppingBag size={15} /> My Orders
                    </Link>
                    <Link
                      to="/my-orders"
                      className="user-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                      style={{ display: 'none' }}
                    >
                      <User size={15} /> Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="user-dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-nav-login">Login</Link>
                <Link to="/signup" className="btn-nav-signup">Sign Up</Link>
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

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
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
        </div>
      </nav>

      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (navbar) {
              if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
              } else {
                navbar.classList.remove('scrolled');
              }
            }
          });
        `
      }} />
    </>
  );
};

export default Navbar;