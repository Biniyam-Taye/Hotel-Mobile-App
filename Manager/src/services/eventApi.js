import { eventAmenitiesList } from '../data/hospitalityMockData';

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

const amenityNamesToIds = (names = []) =>
  names
    .map((name) => eventAmenitiesList.find((a) => a.name === name)?.id)
    .filter(Boolean);

const amenityIdsToNames = (ids = []) =>
  ids
    .map((id) => eventAmenitiesList.find((a) => a.id === id)?.name)
    .filter(Boolean);

export const mapCategoryForList = (category) => ({
  id: category._id,
  name: category.name,
  description: category.description,
});

export const mapSpaceForList = (space) => ({
  id: space._id,
  spaceNumber: space.spaceNumber,
  name: space.name,
  categoryId: space.category?._id || space.category,
  price: space.price,
  discountedPrice: space.discountedPrice,
  maxGuests: space.maxGuests,
  floor: space.floor,
  status: space.status,
  isFeatured: space.isFeatured,
  image: space.image,
  publishStatus: space.publishStatus,
  spaceSize: space.spaceSize,
  description: space.description,
  amenities: amenityNamesToIds(space.amenities),
  specialRates: (space.specialRates || []).map((rate) => ({
    id: rate._id,
    date: rate.date,
    price: rate.price,
    label: rate.label,
  })),
  badge: space.badge,
});

export const fetchEventCategories = async () => {
  const response = await fetch(`${API_BASE}/events/categories?limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapCategoryForList);
};

export const fetchEventSpaces = async () => {
  const params = new URLSearchParams({ limit: '100', section: 'events_conference' });
  const response = await fetch(`${API_BASE}/events/spaces?${params}`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapSpaceForList);
};

export const buildEventSpaceFormData = (formValues, imageFile) => {
  const formData = new FormData();
  formData.append('spaceNumber', formValues.spaceNumber.trim());
  formData.append('name', formValues.name.trim());
  formData.append('categoryId', formValues.categoryId);
  formData.append('price', String(formValues.price));
  formData.append('maxGuests', String(formValues.maxGuests));
  formData.append('floor', String(formValues.floor || 1));
  formData.append('status', formValues.status);
  formData.append('publishStatus', formValues.publishStatus);
  formData.append('isFeatured', String(Boolean(formValues.isFeatured)));
  formData.append('section', 'events_conference');

  if (formValues.discountedPrice !== '' && formValues.discountedPrice != null) {
    formData.append('discountedPrice', String(formValues.discountedPrice));
  }

  if (formValues.spaceSize) formData.append('spaceSize', String(formValues.spaceSize));
  if (formValues.description) formData.append('description', formValues.description.trim());
  if (formValues.badge) formData.append('badge', formValues.badge.trim());

  formData.append('amenities', JSON.stringify(amenityIdsToNames(formValues.amenities || [])));
  formData.append('specialRates', JSON.stringify(formValues.specialRates || []));
  if (imageFile) formData.append('image', imageFile);

  return formData;
};

export const createEventSpace = async (formValues, imageFile) => {
  const formData = buildEventSpaceFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/events/spaces`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapSpaceForList(result.data.space);
};

export const updateEventSpace = async (id, formValues, imageFile) => {
  const formData = buildEventSpaceFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/events/spaces/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapSpaceForList(result.data.space);
};

export const deleteEventSpace = async (id) => {
  const response = await fetch(`${API_BASE}/events/spaces/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};
