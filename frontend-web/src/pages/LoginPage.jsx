// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          padding: 40px 24px;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .auth-page::before {
          content: '';
          position: absolute;
          top: -30%;
          left: -20%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-page::after {
          content: '';
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 24px;
          padding: 52px 48px;
          width: 100%;
          max-width: 460px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
          justify-content: center;
        }

        .auth-logo-icon {
          width: 38px;
          height: 38px;
          background: #d4af37;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          color: #1a1a1a;
        }

        .auth-logo-text {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .auth-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px 0;
          text-align: center;
          letter-spacing: -0.5px;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          text-align: center;
          margin: 0 0 36px 0;
        }

        .auth-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fca5a5;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .auth-form-group {
          margin-bottom: 20px;
        }

        .auth-form-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .auth-input-wrapper {
          position: relative;
        }

        .auth-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
        }

        .auth-input-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 0;
        }

        .auth-input-toggle:hover {
          color: #d4af37;
        }

        .auth-input {
          width: 100%;
          padding: 14px 16px 14px 46px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .auth-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .auth-input:focus {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.04);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }

        .auth-input.has-toggle {
          padding-right: 46px;
        }

        .auth-form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          margin-bottom: 28px;
        }

        .auth-form-options label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
        }

        .auth-form-options input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: #d4af37;
        }

        .auth-form-options a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 500;
          font-size: 13px;
        }

        .auth-form-options a:hover {
          color: #f0cc5a;
        }

        .auth-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          color: #1a1a1a;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .auth-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f0cc5a, #d4af37);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .auth-btn:hover:not(:disabled)::before {
          opacity: 1;
        }

        .auth-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212,175,55,0.35);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-btn span {
          position: relative;
          z-index: 1;
        }

        .auth-divider {
          text-align: center;
          margin: 28px 0;
          position: relative;
          color: rgba(255,255,255,0.2);
          font-size: 12px;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .auth-divider::before { left: 0; }
        .auth-divider::after { right: 0; }

        .auth-switch {
          text-align: center;
          font-size: 14px;
          color: rgba(255,255,255,0.35);
        }

        .auth-switch a {
          color: #d4af37;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .auth-switch a:hover {
          color: #f0cc5a;
        }

        .auth-back {
          text-align: center;
          margin-top: 24px;
        }

        .auth-back a {
          color: rgba(255,255,255,0.25);
          font-size: 13px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .auth-back a:hover {
          color: #d4af37;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(26,26,26,0.3);
          border-top-color: #1a1a1a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }

        @media (max-width: 520px) {
          .auth-card {
            padding: 36px 24px;
          }
          .auth-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">V</div>
            <span className="auth-logo-text">VILLA ALPHA</span>
          </div>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to manage your bookings & orders</p>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label>Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={17} className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label>Password</label>
              <div className="auth-input-wrapper">
                <Lock size={17} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input has-toggle"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="auth-form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              <span>
                {loading && <span className="auth-spinner" />}
                {loading ? 'Signing In...' : 'Sign In'}
              </span>
            </button>
          </form>

          <div className="auth-divider">or</div>

          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Create one free</Link>
          </div>
        </div>

        <div className="auth-back">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;