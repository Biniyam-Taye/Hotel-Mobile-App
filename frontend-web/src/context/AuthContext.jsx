// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5000/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('va_token');
    const storedUser = localStorage.getItem('va_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('va_token');
        localStorage.removeItem('va_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    // Backend returns: { data: { user: {...}, token: '...' } }
    const jwt = data.data?.token;
    const userData = data.data?.user;
    if (!jwt || !userData) throw new Error('Invalid server response');

    setToken(jwt);
    setUser(userData);
    localStorage.setItem('va_token', jwt);
    localStorage.setItem('va_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    setError(null);
    // Split name into firstName + lastName for the user model
    const parts = name.trim().split(' ').filter(Boolean);
    const firstName = parts[0] || name;
    // Ensure lastName is at least 2 characters
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : 'Guest';

    const res = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, role: 'customer' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('va_token');
    localStorage.removeItem('va_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};