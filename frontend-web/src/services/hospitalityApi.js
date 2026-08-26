const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const formatPrice = (price) =>
  Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parseJson = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Request failed');
  }
  return result;
};

const HOTEL_NAME = 'Villa Alpha International Hotel';

export const mapHotelService = (service) => ({
  id: `service-${service._id}`,
  provider: HOTEL_NAME,
  title: service.name,
  description: service.description,
  price: Number(service.price) || 0,
  displayPrice: service.pricingNote || `ETB ${formatPrice(service.price || 0)}`,
  priceSuffix: service.pricingNote ? '' : '/ person',
  category: service.category || 'other',
  image: service.image,
  badge: service.badge,
  amenities: service.badge ? [service.badge] : [],
  popular: false,
  dateAdded: service.createdAt,
  location: 'Hotel Service',
});

export const mapFacility = (facility) => ({
  id: `facility-${facility._id}`,
  provider: HOTEL_NAME,
  title: facility.name,
  description: facility.description,
  price: 0,
  displayPrice: facility.operatingHours ? `Open: ${facility.operatingHours}` : 'Open daily',
  priceSuffix: '',
  category: 'Wellness',
  image: facility.image,
  badge: facility.badge,
  amenities: facility.badge ? [facility.badge] : [],
  popular: false,
  dateAdded: facility.createdAt,
  location: facility.operatingHours || 'On-site',
});

export const mapEventSpace = (space) => ({
  id: `event-${space._id}`,
  provider: HOTEL_NAME,
  title: space.name,
  description: space.description || `${space.category?.name || 'Event space'} · Up to ${space.maxGuests} guests`,
  price: Number(space.discountedPrice ?? space.price) || 0,
  displayPrice: `ETB ${formatPrice(space.discountedPrice ?? space.price)}`,
  priceSuffix: '/ day',
  category: 'Events',
  image: space.image,
  badge: space.badge,
  amenities: space.amenities || [],
  popular: Boolean(space.isFeatured),
  maxGuests: space.maxGuests,
  dateAdded: space.createdAt,
  location: space.category?.name || 'Event Space',
});

export const fetchHotelServices = async () => {
  const response = await fetch(`${API_BASE}/services/public/hotel`);
  const result = await parseJson(response);
  return (result.data?.services || []).map(mapHotelService);
};

export const fetchFacilities = async () => {
  const response = await fetch(`${API_BASE}/facilities/public`);
  const result = await parseJson(response);
  return (result.data?.facilities || []).map(mapFacility);
};

export const fetchEventSpaces = async () => {
  const response = await fetch(`${API_BASE}/events/spaces/public`);
  const result = await parseJson(response);
  return (result.data?.spaces || []).map(mapEventSpace);
};

export const fetchHospitalityItems = async () => {
  const [hotelServices, facilities, eventSpaces] = await Promise.all([
    fetchHotelServices(),
    fetchFacilities(),
    fetchEventSpaces(),
  ]);

  return [...hotelServices, ...facilities, ...eventSpaces];
};

export const fetchRestaurantHighlight = async () => {
  const response = await fetch(`${API_BASE}/restaurant/menu`);
  const result = await parseJson(response);
  const menu = result.data?.menu || [];

  for (const category of menu) {
    if (category.items?.length) {
      return category.items[0];
    }
  }
  return null;
};

export const buildSectionCard = (section, items, featuredField = 'popular') => {
  if (!items.length) {
    return {
      id: section.id,
      title: section.title,
      badge: section.badge,
      description: section.description,
      image: section.image,
      link: section.link,
    };
  }

  const featured = items.find((item) => item[featuredField]) || items[0];

  return {
    id: section.id,
    badge: featured.badge || featured.amenities?.[0] || section.badge,
    description: featured.description || section.description,
    image: featured.image && !featured.image.startsWith('default-')
      ? featured.image
      : section.image,
    link: section.link,
  };
};
