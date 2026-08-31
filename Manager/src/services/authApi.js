// Manager/src/services/authApi.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const parseJson = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await parseJson(response);
  return result.data; // contains user and token
};

export const register = async (userData) => {
  // Ensure we register with role 'manager'
  const payload = {
    ...userData,
    role: 'manager',
  };

  const response = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await parseJson(response);
  return result.data; // contains user and token
};

export const getMe = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${API_BASE}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await parseJson(response);
  return result.data.user;
};
