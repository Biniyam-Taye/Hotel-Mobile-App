import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, User, Mail, Phone, Lock } from 'lucide-react';
import { register } from '../../services/authApi';
import './Auth.css';

function Signup({ onSignupSuccess, onNavigateToLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!firstName || !lastName || !email || !password) {
        throw new Error('Please fill in all required fields');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const data = await register({ firstName, lastName, email, password, phone });
      setSuccess(true);

      // Store token and details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        onSignupSuccess(data.user, data.token, data.user.approvalStatus === 'pending');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glass-card" style={{ maxWidth: '500px' }}>
        {/* Top icon */}
        <div className="auth-icon-box">
          <UserPlus size={20} color="#1a1a1a" />
        </div>

        <h1 className="auth-heading">Create Account</h1>
        <p className="auth-subheading">
          Register to begin managing your hotel operations.
        </p>

        {error && (
          <div className="auth-error-box">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-success-box">
            <CheckCircle size={15} />
            <span>Account created successfully!</span>
          </div>
        )}

        <form className="auth-form-clean" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-input-group flex-1">
              <User size={16} className="auth-input-icon-lucide" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>
            <div className="auth-input-group flex-1">
              <User size={16} className="auth-input-icon-lucide" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <Mail size={16} className="auth-input-icon-lucide" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || success}
            />
          </div>

          <div className="auth-input-group">
            <Phone size={16} className="auth-input-icon-lucide" />
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <div className="auth-input-group">
            <Lock size={16} className="auth-input-icon-lucide" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || success}
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

          <button type="submit" className="auth-primary-btn" disabled={loading || success}>
            {loading ? <span className="auth-spinner" /> : 'Get Started'}
          </button>
        </form>

        <div className="auth-switch-row">
          <span>Already have an account?</span>
          <button type="button" className="auth-switch-link" onClick={onNavigateToLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
