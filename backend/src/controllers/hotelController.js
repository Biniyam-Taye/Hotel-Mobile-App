import Hotel from '../models/Hotel.js';
import RoomType from '../models/RoomType.js';
import Review from '../models/Review.js';
import Favorite from '../models/Favorite.js';
import City from '../models/City.js';
import Offer from '../models/Offer.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import { HOTEL_STATUS } from '../utils/constants.js';
import { countOverlappingBookings } from '../services/bookingService.js';

export const getHotels = catchAsync(async (req, res) => {
  const {
    q,
    city,
    category,
    minPrice,
    maxPrice,
    minRating,
    checkIn,
    checkOut,
    guests,
    sort = 'rating',
    page = 1,
    limit = 20,
  } = req.query;

  const filter = { status: HOTEL_STATUS.ACTIVE };

  if (q) {
    filter.$text = { $search: q };
  }
  if (city) filter.city = new RegExp(`^${city}$`, 'i');
  if (category && category !== 'All') filter.category = category;
  if (minPrice) filter.priceFrom = { ...filter.priceFrom, $gte: Number(minPrice) };
  if (maxPrice) filter.priceFrom = { ...filter.priceFrom, $lte: Number(maxPrice) };
  if (minRating) filter.rating = { $gte: Number(minRating) };

  const sortMap = {
    rating: { rating: -1 },
    price_asc: { priceFrom: 1 },
    price_desc: { priceFrom: -1 },
    reviews: { reviewCount: -1 },
  };

  const skip = (Number(page) - 1) * Number(limit);
  let hotels = await Hotel.find(filter)
    .sort(sortMap[sort] || sortMap.rating)
    .skip(skip)
    .limit(Number(limit));

  // Availability filter
  if (checkIn && checkOut && guests) {
    const available = [];
    for (const hotel of hotels) {
      const roomTypes = await RoomType.find({
        hotelId: hotel._id,
        isActive: true,
        capacity: { $gte: Number(guests) },
      });
      let hasAvailability = false;
      for (const rt of roomTypes) {
        const booked = await countOverlappingBookings(rt._id, checkIn, checkOut);
        if (booked < rt.totalInventory) {
          hasAvailability = true;
          break;
        }
      }
      if (hasAvailability) available.push(hotel);
    }
    hotels = available;
  }

  let favoriteIds = new Set();
  if (req.user) {
    const favs = await Favorite.find({ userId: req.user._id }).select('hotelId');
    favoriteIds = new Set(favs.map((f) => f.hotelId.toString()));
  }

  const data = hotels.map((h) => h.toListJSON(favoriteIds.has(h._id.toString())));
  const total = await Hotel.countDocuments(filter);

  sendSuccess(res, data, 200, {
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

export const getHotelById = catchAsync(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) throw new ApiError(404, 'Hotel not found');

  const [roomTypes, reviews, isFavorite] = await Promise.all([
    RoomType.find({ hotelId: hotel._id, isActive: true }),
    Review.find({ hotelId: hotel._id })
      .populate('guestId', 'fullName avatarUrl')
      .sort({ createdAt: -1 })
      .limit(20),
    req.user
      ? Favorite.exists({ userId: req.user._id, hotelId: hotel._id })
      : false,
  ]);

  sendSuccess(res, {
    ...hotel.toListJSON(!!isFavorite),
    description: hotel.description,
    originalPrice: null,
    videoUrl: hotel.videoUrl,
    contact: hotel.contact,
    awards: hotel.awards,
    cancellationPolicy: hotel.cancellationPolicy,
    rules: hotel.rules,
    languages: hotel.languages,
    nearbyPlaces: hotel.nearbyPlaces,
    rooms: roomTypes.map((r) => r.toRoomJSON()),
    reviews: reviews.map((rev) => ({
      id: rev._id.toString(),
      userName: rev.guestId?.fullName ?? 'Guest',
      userAvatar: rev.guestId?.avatarUrl ?? '',
      rating: rev.rating,
      comment: rev.comment,
      date: rev.createdAt,
      photos: rev.photos?.map((p) => p.url) ?? [],
      isVerified: rev.isVerified,
      helpfulCount: rev.helpfulCount,
    })),
  });
});

export const getCities = catchAsync(async (_req, res) => {
  const cities = await City.find().sort({ hotelCount: -1 });
  sendSuccess(
    res,
    cities.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      country: c.country,
      image: c.imageUrl,
      hotelCount: c.hotelCount,
    }))
  );
});

export const getCategories = catchAsync(async (_req, res) => {
  const categories = await Hotel.distinct('category', { status: HOTEL_STATUS.ACTIVE });
  sendSuccess(res, ['All', ...categories.sort()]);
});

export const getOffers = catchAsync(async (_req, res) => {
  const offers = await Offer.find({
    isActive: true,
    validUntil: { $gte: new Date() },
  }).sort({ validUntil: 1 });

  sendSuccess(
    res,
    offers.map((o) => ({
      id: o._id.toString(),
      title: o.title,
      subtitle: o.subtitle,
      description: o.description,
      image: o.imageUrl,
      couponCode: o.couponCode,
      discountPercent: o.discountPercent,
      validUntil: o.validUntil,
      terms: o.terms,
    }))
  );
});

export const createHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.create({
    ...req.body,
    slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, '-'),
    ownerId: req.user._id,
  });
  sendSuccess(res, hotel, 201);
});

export const updateHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!hotel) throw new ApiError(404, 'Hotel not found');
  sendSuccess(res, hotel);
});

export const deleteHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) throw new ApiError(404, 'Hotel not found');
  sendSuccess(res, { message: 'Hotel deleted' });
});

export const getAdminHotels = catchAsync(async (req, res) => {
  let filter = {};
  if (req.user.role === 'hotel_admin') {
    filter = { _id: { $in: req.user.assignedHotels } };
  }

  const hotels = await Hotel.find(filter).sort({ createdAt: -1 });
  sendSuccess(
    res,
    hotels.map((h) => ({
      id: h._id.toString(),
      name: h.name,
      location: `${h.city}, ${h.country}`,
      rooms: 0,
      rating: h.rating,
      occupancy: 0,
      status: h.status === HOTEL_STATUS.ACTIVE ? 'Active' : h.status,
      revenue: 0,
    }))
  );
});
