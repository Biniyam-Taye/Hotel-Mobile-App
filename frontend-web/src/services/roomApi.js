const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const formatPrice = (price) =>
  Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const mapRoomForCustomer = (room) => {
  const hasDiscount =
    room.discountedPrice != null && room.discountedPrice < room.price;
  const priceETB = hasDiscount ? room.discountedPrice : room.price;

  return {
    id: room._id,
    name: room.name,
    priceETB: Math.round(priceETB),
    originalPriceETB: hasDiscount ? Math.round(room.price) : null,
    capacity: room.maxGuests,
    bedType: room.bedType || '',
    size: room.roomSize ? `${room.roomSize} m²` : '',
    rating: room.rating ?? 4.5,
    reviews: room.reviewCount ?? 0,
    location: room.location || 'Adama',
    shortDescription: room.description || '',
    longDescription: room.description || '',
    features: room.amenities || [],
    amenities: room.amenities || [],
    image: room.mainImage,
    popular: room.isPopular || room.isFeatured,
    gallery: [room.mainImage, ...(room.detailImages || [])].filter(Boolean),
    discount: hasDiscount
      ? Math.round(((room.price - room.discountedPrice) / room.price) * 100)
      : 0,
    guests: room.maxGuests,
    bed: room.bedType || '',
  };
};

const parseJson = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const fetchPublishedRooms = async () => {
  const response = await fetch(`${API_BASE}/rooms?published=true&limit=100`);
  const result = await parseJson(response);
  return (result.data?.data || []).map(mapRoomForCustomer);
};

export const fetchRoomById = async (id) => {
  const response = await fetch(`${API_BASE}/rooms/${id}`);
  const result = await parseJson(response);
  const room = result.data?.room;
  if (!room || room.publishStatus !== 'Published') {
    return null;
  }
  return mapRoomForCustomer(room);
};
