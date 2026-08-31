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

export const mapCategoryForList = (category) => ({
  id: category._id,
  name: category.name,
});

export const mapMenuItemForList = (item) => ({
  id: item._id,
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  category: item.category?.name || 'Unknown',
  categoryId: item.category?._id || item.category,
  status: item.isAvailable ? 'Available' : 'Sold Out',
  isPopular: item.isPopular,
});

export const fetchFoodCategories = async () => {
  const response = await fetch(`${API_BASE}/restaurant/categories?limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapCategoryForList);
};

export const fetchMenuItems = async () => {
  const response = await fetch(`${API_BASE}/restaurant/items?limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapMenuItemForList);
};

export const buildMenuItemFormData = (formValues, imageFile) => {
  const formData = new FormData();
  formData.append('name', formValues.name.trim());
  formData.append('description', formValues.description.trim());
  formData.append('price', String(formValues.price));
  formData.append('categoryName', formValues.category);
  formData.append('isAvailable', String(formValues.status === 'Available'));
  if (imageFile) formData.append('image', imageFile);
  return formData;
};

export const createMenuItem = async (formValues, imageFile) => {
  const formData = buildMenuItemFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/restaurant/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapMenuItemForList(result.data.food);
};

export const updateMenuItem = async (id, formValues, imageFile) => {
  const formData = buildMenuItemFormData(formValues, imageFile);
  const response = await fetch(`${API_BASE}/restaurant/items/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapMenuItemForList(result.data.food);
};

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${API_BASE}/restaurant/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};
