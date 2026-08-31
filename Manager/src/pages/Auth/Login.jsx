import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, AlertCircle, Mail, Lock } from 'lucide-react';
import { login } from '../../services/authApi';
import './Auth.css';

function Login({ onLoginSuccess, onNavigateToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!email || !password) throw new Error('Please fill in all fields');
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user, data.token);
    } catch (err) {
      if (err.message === 'PENDING_APPROVAL') {
        setError('Your account is waiting for owner approval.');
      } else if (err.message === 'ACCOUNT_SUSPENDED') {
        setError('Your account has been suspended. Contact the hotel owner.');
      } else {
        setError(err.message || 'Login failed. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glass-card">
        {/* Top icon */}
        <div className="auth-icon-box">
          <LogIn size={20} color="#1a1a1a" />
        </div>

        <h1 className="auth-heading">Sign in with email</h1>
        <p className="auth-subheading">
          Access your hotel management suite.<br />Manage rooms, bookings & more.
        </p>

        {error && (
          <div className="auth-error-box">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form-clean" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <Mail size={16} className="auth-input-icon-lucide" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <Lock size={16} className="auth-input-icon-lucide" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="auth-eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="auth-forgot-row">
            <span />
            <button type="button" className="auth-forgot-link">Forgot password?</button>
          </div>

          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Get Started'}
          </button>
        </form>

        <div className="auth-switch-row">
          <span>Don't have an account?</span>
          <button type="button" className="auth-switch-link" onClick={onNavigateToSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
