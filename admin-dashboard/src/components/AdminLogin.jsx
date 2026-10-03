import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, Building2 } from 'lucide-react';
import './AdminLogin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      const user = data.data.user;
      const token = data.data.token;

      if (user.role !== 'admin') {
        throw new Error('Access denied. This portal is for hotel owners only.');
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      onLoginSuccess(user, token);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-wrapper">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="admin-auth-card">
        {/* Logo / Brand */}
        <div className="admin-auth-header">
          <div className="admin-auth-icon">
            <Building2 size={28} color="#fa5a2a" />
          </div>
          <h1 className="admin-auth-title">Hotel Owner Portal</h1>
          <p className="admin-auth-subtitle">Sign in to manage your hotel operations</p>
        </div>

        {/* Credentials hint */}
        <div className="admin-credentials-hint">
          <span>🔑</span>
          <span>Default: <strong>admin@hotel.com</strong> / <strong>password123</strong></span>
        </div>

        {error && (
          <div className="admin-auth-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-email">Email Address</label>
            <div className="admin-input-wrap">
              <Mail size={17} className="admin-input-icon" />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@hotel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-wrap">
              <Lock size={17} className="admin-input-icon" />
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="admin-auth-btn" disabled={loading}>
            {loading ? (
              <span className="admin-btn-spinner" />
            ) : (
              <>
                <LogIn size={17} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <p className="admin-auth-footer">
          Authorized personnel only. This portal is restricted to hotel owners.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
