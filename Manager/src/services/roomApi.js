// Manager/src/services/roomApi.js
import { amenitiesList } from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || '';

export const formatPrice = (price) =>
  Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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

const mapAmenityNamesToIds = (amenities = []) =>
  amenities.map((value) => {
    const byId = amenitiesList.find((a) => a.id === value);
    if (byId) return byId.id;
    const byName = amenitiesList.find((a) => a.name === value);
    return byName?.id || value;
  });

const mapRoomForList = (room) => ({
  ...room,
  id: room._id,
  image: room.mainImage,
  amenities: mapAmenityNamesToIds(room.amenities),
});

export const fetchRooms = async () => {
  const response = await fetch(`${API_BASE}/rooms?limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapRoomForList);
};

export const createRoom = async (payload, mainImageFile, detailImageFiles = []) => {
  const formData = buildRoomFormData(payload, mainImageFile, detailImageFiles);
  const response = await fetch(`${API_BASE}/rooms`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapRoomForList(result.data.room);
};

export const updateRoom = async (id, payload, mainImageFile, detailImageFiles = []) => {
  const formData = buildRoomFormData(payload, mainImageFile, detailImageFiles);
  const response = await fetch(`${API_BASE}/rooms/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapRoomForList(result.data.room);
};

export const deleteRoom = async (id) => {
  const response = await fetch(`${API_BASE}/rooms/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};

const buildRoomFormData = (payload, mainImageFile, detailImageFiles = []) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    if (key === 'amenities' || key === 'detailImages') {
      formData.append(key, JSON.stringify(payload[key]));
    } else if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, String(payload[key]));
    }
  });

  if (mainImageFile instanceof File) {
    formData.append('image', mainImageFile);
  }

  detailImageFiles.forEach((file) => {
    if (file instanceof File) {
      formData.append('detailImages', file);
    }
  });

  return formData;
};

export const buildRoomPayload = (formData, categories) => {
  const category = categories.find((c) => c.id === formData.categoryId);
  const amenityNames = (formData.amenities || []).map((amenityId) => {
    const match = amenitiesList.find((a) => a.id === amenityId);
    return match?.name || amenityId;
  });

  return {
    roomNumber: String(formData.roomNumber).trim(),
    name: formData.name?.trim() || `Room ${formData.roomNumber}`,
    categoryId: formData.categoryId,
    categoryName: category?.name || '',
    price: Math.round(Number(formData.price)),
    discountedPrice: formData.discountedPrice
      ? Math.round(Number(formData.discountedPrice))
      : null,
    maxGuests: Number(formData.maxGuests) || 2,
    floor: Number(formData.floor) || 1,
    status: formData.status || 'Available',
    publishStatus: formData.publishStatus || 'Draft',
    isFeatured: Boolean(formData.isFeatured),
    isPopular: Boolean(formData.isFeatured),
    mainImage: formData.mainImage || '',
    detailImages: (formData.detailImages || []).filter(Boolean),
    location: formData.location || 'Adama',
    bedType: formData.bedType || '',
    roomSize: formData.roomSize ? Number(formData.roomSize) : null,
    description: formData.description || '',
    amenities: amenityNames,
  };
};
