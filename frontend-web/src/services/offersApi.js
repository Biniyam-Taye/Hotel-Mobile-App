// src/services/offersApi.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const parseJson = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Request failed');
  }
  return result;
};

/**
 * Map a raw backend Offer document into the shape Offers.jsx and OfferDetail.jsx expect.
 */
export const mapOffer = (offer) => ({
  id: offer._id,
  title: offer.title,
  subtitle: offer.subtitle || '',
  highlightSubtitle: offer.subtitle || '',
  description: offer.description,
  discount: offer.discountTag || '',
  typeTag: offer.typeTag || '',
  image:
    offer.image && !offer.image.startsWith('default-')
      ? offer.image
      : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  detailImages: (offer.detailImages || []).map((d) =>
    typeof d === 'string' ? d : d.url
  ),
  highlights: (offer.highlights || []).map((h, i) => ({
    number: i + 1,
    title: h.title || '',
    desc: h.description || '',
  })),
  validUntil: offer.validUntil
    ? new Date(offer.validUntil).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '',
  price: offer.packagePricing || '',
  originalPrice: '',
  perNightText: offer.stayLength ? `stay of ${offer.stayLength}` : 'per stay',
  stayLength: offer.stayLength || 'Flexible',
  guests: offer.guests || 'Flexible',
  popular: offer.isPopular || false,
  seasonalBadge: offer.typeTag || 'Special Offer',
  discountPercent: offer.discountTag || '',
  status: offer.status,
});

/**
 * Fetch all active, non-expired offers (public — no auth required).
 * Endpoint: GET /api/v1/promotions/offers/public
 */
export const fetchPublicOffers = async () => {
  const response = await fetch(`${API_BASE}/promotions/offers/public`);
  const result = await parseJson(response);
  return (result.data?.offers || []).map(mapOffer);
};

/**
 * Fetch a single offer by ID.
 * Endpoint: GET /api/v1/promotions/offers/:id
 */
export const fetchOfferById = async (id) => {
  const response = await fetch(`${API_BASE}/promotions/offers/${id}`);
  const result = await parseJson(response);
  return mapOffer(result.data?.offer);
};
