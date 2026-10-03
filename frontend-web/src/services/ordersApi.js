// src/services/ordersApi.js
const API_BASE = 'http://localhost:5000/api/v1';

export const fetchMyOrders = async (token) => {
  const res = await fetch(`${API_BASE}/payments/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
  return data.data || [];
};
