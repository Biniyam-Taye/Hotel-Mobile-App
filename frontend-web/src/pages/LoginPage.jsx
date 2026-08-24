// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would add your actual authentication logic (e.g., API call)
    console.log('Logging in with:', { email, password });
    alert('✅ Login successful! Redirecting to home...');
    navigate('/'); // Redirect to home page after login
  };

  return (
    <>
      <style>{`
        .login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          background: #ffffff;
          padding: 40px 24px;
        }

        .login-card {
          background: #ffffff;
          padding: 48px 40px;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .login-card .login-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .login-card .login-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 32px 0;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper .icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .form-control {
          width: 100%;
          padding: 12px 14px 12px 44px; /* Left padding for icon */
          border: 1px solid #d1d5db;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .form-control:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .form-options label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4b5563;
          cursor: pointer;
        }

        .form-options input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: #d4af37;
          cursor: pointer;
        }

        .form-options a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .form-options a:hover {
          color: #c5a028;
        }

        .btn-login {
          width: 100%;
          padding: 16px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .btn-login:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }

        .signup-prompt {
          margin-top: 24px;
          font-size: 14px;
          color: #6b7280;
        }

        .signup-prompt a {
          color: #d4af37;
          font-weight: 600;
          text-decoration: none;
        }

        .signup-prompt a:hover {
          text-decoration: underline;
        }

        /* --- NEW BACK TO HOME LINK --- */
        .back-home {
          margin-top: 24px;
          font-size: 14px;
        }
        .back-home a {
          color: #d4af37;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .back-home a:hover {
          color: #c5a028;
          transform: translateX(-4px);
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 20px;
          }
          .login-card .login-title {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to manage your bookings.</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="icon" />
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="icon" />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="btn-login">Log In</button>
          </form>

          <div className="signup-prompt">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>

        {/* --- ADDED BACK TO HOME LINK --- */}
        <div className="back-home">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;