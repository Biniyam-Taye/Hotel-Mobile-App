const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || '';

const parseJson = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const authHeaders = () => {
  const headers = {};
  if (ADMIN_TOKEN) {
    headers.Authorization = `Bearer ${ADMIN_TOKEN}`;
  }
  return headers;
};

export const mapServiceForList = (service) => ({
  id: service._id,
  title: service.name,
  description: service.description,
  price: service.pricingNote || (service.price ? `$${service.price}` : ''),
  status: service.isAvailable ? 'Active' : 'Inactive',
  image: service.image,
  badge: service.badge,
  icon: service.icon,
  category: service.category,
  numericPrice: service.price,
});

export const fetchHotelServices = async (search = '') => {
  const params = new URLSearchParams({ limit: '100', section: 'hotel_service' });
  if (search) params.set('search', search);

  const response = await fetch(`${API_BASE}/services?${params}`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapServiceForList);
};

export const buildServiceFormData = (formValues, imageFile) => {
  const formData = new FormData();
  formData.append('title', formValues.title.trim());
  formData.append('description', formValues.description.trim());
  formData.append('pricingNote', formValues.price.trim());
  formData.append('status', formValues.status);
  formData.append('section', 'hotel_service');

  if (formValues.numericPrice !== undefined && formValues.numericPrice !== '') {
    formData.append('price', String(formValues.numericPrice));
  }

  if (formValues.badge) formData.append('badge', formValues.badge.trim());
  if (formValues.icon) formData.append('icon', formValues.icon.trim());
  if (formValues.category) formData.append('category', formValues.category);
  if (imageFile) formData.append('image', imageFile);

  return formData;
};

export const createHotelService = async (formValues, imageFile) => {
  const formData = buildServiceFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/services`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapServiceForList(result.data.service);
};

export const updateHotelService = async (id, formValues, imageFile) => {
  const formData = buildServiceFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/services/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapServiceForList(result.data.service);
};

export const deleteHotelService = async (id) => {
  const response = await fetch(`${API_BASE}/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};
