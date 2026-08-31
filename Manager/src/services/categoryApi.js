import { amenitiesList } from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const authHeaders = (contentType = 'application/json') => {
  const headers = {};
  const token = localStorage.getItem('token') || '';
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  return headers;
};

export const formatPrice = (price) =>
  Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parseJson = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const mapAmenityNamesToIds = (amenities = []) =>
  amenities.map((value) => {
    const byId = amenitiesList.find((a) => a.id === value);
    if (byId) return byId.id;
    const byName = amenitiesList.find((a) => a.name === value);
    return byName?.id || value;
  });

const mapCategoryForList = (category) => ({
  ...category,
  id: category._id,
  amenities: mapAmenityNamesToIds(category.amenities),
});

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE}/room-categories?limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapCategoryForList);
};

export const createCategory = async (payload) => {
  const response = await fetch(`${API_BASE}/room-categories`, {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify(payload),
  });
  const result = await parseJson(response);
  return mapCategoryForList(result.data.category);
};

export const updateCategory = async (id, payload) => {
  const response = await fetch(`${API_BASE}/room-categories/${id}`, {
    method: 'PUT',
    headers: authHeaders('application/json'),
    body: JSON.stringify(payload),
  });
  const result = await parseJson(response);
  return mapCategoryForList(result.data.category);
};

export const toggleCategoryStatus = async (id) => {
  const response = await fetch(`${API_BASE}/room-categories/${id}/toggle-status`, {
    method: 'PATCH',
    headers: authHeaders(null),
  });
  const result = await parseJson(response);
  return mapCategoryForList(result.data.category);
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_BASE}/room-categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(null),
  });
  await parseJson(response);
};

export const buildCategoryPayload = (formData) => {
  const amenityNames = (formData.amenities || []).map((amenityId) => {
    const match = amenitiesList.find((a) => a.id === amenityId);
    return match?.name || amenityId;
  });

  return {
    name: formData.name.trim(),
    description: formData.description.trim(),
    basePrice: Math.round(Number(formData.basePrice)),
    maxGuests: Number(formData.maxGuests) || 2,
    bedConfiguration: formData.bedConfiguration || '',
    roomSize: formData.roomSize || '',
    image: formData.image || '',
    amenities: amenityNames,
    status: formData.status || 'Active',
  };
};
