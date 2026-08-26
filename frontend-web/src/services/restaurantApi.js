const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const formatPrice = (price) =>
  Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const fetchPublicMenu = async () => {
  const response = await fetch(`${API_BASE}/restaurant/menu`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load menu');
  }

  return result.data?.menu || [];
};
