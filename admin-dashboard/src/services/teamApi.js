const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || 'Request failed');
  }
  return json?.data;
};

// Get all managers
export const fetchManagers = async () => {
  const res = await fetch(`${API_BASE}/users/managers`, {
    headers: authHeaders(),
  });
  const data = await handleResponse(res);
  return data.managers;
};

// Approve a manager
export const approveManagerApi = async (id) => {
  const res = await fetch(`${API_BASE}/users/managers/${id}/approve`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  return handleResponse(res);
};

// Suspend a manager
export const suspendManagerApi = async (id) => {
  const res = await fetch(`${API_BASE}/users/managers/${id}/suspend`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  return handleResponse(res);
};

// Delete a manager
export const removeManagerApi = async (id) => {
  const res = await fetch(`${API_BASE}/users/managers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
};
