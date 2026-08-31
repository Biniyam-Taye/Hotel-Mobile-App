// Manager/src/services/offerApi.js
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

/** Map a raw DB offer document to the shape the UI expects */
export const mapOffer = (offer) => ({
  id: offer._id,
  title: offer.title,
  subtitle: offer.subtitle || '',
  description: offer.description,
  discountTag: offer.discountTag || '',
  typeTag: offer.typeTag || '',
  mainImage: offer.image && !offer.image.startsWith('default-') ? offer.image : '',
  detailImages: (offer.detailImages || []).map((d) => (typeof d === 'string' ? d : d.url)),
  highlights: (offer.highlights || []).map((h) => ({
    id: h._id || String(Date.now()),
    title: h.title || '',
    description: h.description || '',
  })),
  validUntil: offer.validUntil ? offer.validUntil.split('T')[0] : '',
  packagePricing: offer.packagePricing || '',
  stayLength: offer.stayLength || '',
  guests: offer.guests || '',
  status: offer.status || 'Active',
  isPopular: offer.isPopular || false,
});

/** GET /api/v1/promotions/offers  (admin — all offers) */
export const fetchOffers = async () => {
  const response = await fetch(`${API_BASE}/promotions/offers?limit=100`, {
    headers: authHeaders(),
  });
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapOffer);
};

/** POST /api/v1/promotions/offers */
export const createOffer = async (formValues, mainImageFile, detailImageFiles = []) => {
  const formData = buildOfferFormData(formValues, mainImageFile, detailImageFiles);
  const response = await fetch(`${API_BASE}/promotions/offers`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapOffer(result.data.offer);
};

/** PUT /api/v1/promotions/offers/:id */
export const updateOffer = async (id, formValues, mainImageFile, detailImageFiles = []) => {
  const formData = buildOfferFormData(formValues, mainImageFile, detailImageFiles);
  const response = await fetch(`${API_BASE}/promotions/offers/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  const result = await parseJson(response);
  return mapOffer(result.data.offer);
};

/** DELETE /api/v1/promotions/offers/:id */
export const deleteOffer = async (id) => {
  const response = await fetch(`${API_BASE}/promotions/offers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJson(response);
};

/**
 * Build a multipart FormData for create / update.
 * Image files are passed separately so the caller can pass real File objects.
 */
const buildOfferFormData = (formValues, mainImageFile, detailImageFiles = []) => {
  const formData = new FormData();

  if (formValues.title) formData.append('title', formValues.title.trim());
  if (formValues.subtitle) formData.append('subtitle', formValues.subtitle.trim());
  if (formValues.description) formData.append('description', formValues.description.trim());
  if (formValues.discountTag) formData.append('discountTag', formValues.discountTag.trim());
  if (formValues.typeTag) formData.append('typeTag', formValues.typeTag.trim());
  if (formValues.validUntil) formData.append('validUntil', formValues.validUntil);
  if (formValues.packagePricing) formData.append('packagePricing', formValues.packagePricing.trim());
  if (formValues.stayLength) formData.append('stayLength', formValues.stayLength.trim());
  if (formValues.guests) formData.append('guests', formValues.guests.trim());
  if (formValues.status) formData.append('status', formValues.status);

  if (formValues.highlights?.length) {
    formData.append('highlights', JSON.stringify(formValues.highlights));
  }

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
