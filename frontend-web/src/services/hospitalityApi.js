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
  category: 'Services',
  image: service.image,
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
  amenities: space.amenities || [],
  popular: Boolean(space.isFeatured),
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
