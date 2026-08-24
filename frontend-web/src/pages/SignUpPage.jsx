// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Simple validation
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      alert('❌ You must agree to the Terms & Conditions.');
      return;
    }

    // Here you would add your actual API call to register the user
    console.log('Signing up with:', { name, email, password });
    alert('✅ Account created successfully! Please log in.');
    navigate('/login'); // Redirect to login page after signup
  };

  return (
    <>
      <style>{`
        .signup-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          background: #ffffff;
          padding: 40px 24px;
        }

        .signup-card {
          background: #ffffff;
          padding: 48px 40px;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .signup-card .signup-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .signup-card .signup-subtitle {
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

        .terms-group {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #4b5563;
          margin: 8px 0 24px 0;
          text-align: left;
        }

        .terms-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          min-width: 18px;
          accent-color: #d4af37;
          cursor: pointer;
          margin-top: 2px;
        }

        .terms-group a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
        }
        .terms-group a:hover {
          text-decoration: underline;
        }

        .btn-signup {
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

        .btn-signup:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }

        .login-prompt {
          margin-top: 24px;
          font-size: 14px;
          color: #6b7280;
        }

        .login-prompt a {
          color: #d4af37;
          font-weight: 600;
          text-decoration: none;
        }

        .login-prompt a:hover {
          text-decoration: underline;
        }

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
          .signup-card {
            padding: 32px 20px;
          }
          .signup-card .signup-title {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="signup-page">
        <div className="signup-card">
          <h1 className="signup-title">Create an <span style={{ color: '#d4af37' }}>Account</span></h1>
          <p className="signup-subtitle">Join Villa Alpha and start booking your luxury stays.</p>

          <form onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="icon" />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="icon" />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Create a password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="icon" />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="terms-group">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required 
              />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </label>
            </div>

            <button type="submit" className="btn-signup">Sign Up</button>
          </form>

          <div className="login-prompt">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>

        {/* Back to Home link */}
        <div className="back-home">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;