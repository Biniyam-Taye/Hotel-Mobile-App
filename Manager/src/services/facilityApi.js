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
  const token = localStorage.getItem('token') || ADMIN_TOKEN || '';
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const mapFacilityForList = (facility) => ({
  id: facility._id,
  title: facility.name,
  description: facility.description,
  hours: facility.operatingHours,
  status: facility.status,
  image: facility.image,
  badge: facility.badge,
  icon: facility.icon,
});

export const fetchFacilities = async () => {
  const params = new URLSearchParams({ limit: '100', section: 'facilities_wellness' });
  const response = await fetch(`${API_BASE}/facilities?${params}`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapFacilityForList);
};

export const buildFacilityFormData = (formValues, imageFile) => {
  const formData = new FormData();
  formData.append('title', formValues.title.trim());
  formData.append('description', formValues.description.trim());
  formData.append('hours', formValues.hours.trim());
  formData.append('status', formValues.status);
  formData.append('section', 'facilities_wellness');

  if (formValues.badge) formData.append('badge', formValues.badge.trim());
  if (formValues.icon) formData.append('icon', formValues.icon.trim());
  if (imageFile) formData.append('image', imageFile);

  return formData;
};

export const createFacility = async (formValues, imageFile) => {
  const formData = buildFacilityFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/facilities`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapFacilityForList(result.data.facility);
};

export const updateFacility = async (id, formValues, imageFile) => {
  const formData = buildFacilityFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/facilities/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapFacilityForList(result.data.facility);
};

export const deleteFacility = async (id) => {
  const response = await fetch(`${API_BASE}/facilities/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};
