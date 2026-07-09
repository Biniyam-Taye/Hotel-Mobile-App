import Favorite from '../models/Favorite.js';
import Hotel from '../models/Hotel.js';
import Review from '../models/Review.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';

export const getFavorites = catchAsync(async (req, res) => {
  const favs = await Favorite.find({ userId: req.user._id }).populate('hotelId');
  const data = favs
    .filter((f) => f.hotelId)
    .map((f) => f.hotelId.toListJSON(true));
  sendSuccess(res, data);
});

export const toggleFavorite = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) throw new ApiError(404, 'Hotel not found');

  const existing = await Favorite.findOne({ userId: req.user._id, hotelId });
  if (existing) {
    await existing.deleteOne();
    return sendSuccess(res, { isFavorite: false });
  }

  await Favorite.create({ userId: req.user._id, hotelId });
  sendSuccess(res, { isFavorite: true });
});

export const createReview = catchAsync(async (req, res) => {
  const { hotelId, bookingId, rating, comment, photos } = req.body;
  if (!hotelId || !rating || !comment) {
    throw new ApiError(400, 'hotelId, rating, and comment are required');
  }

  const review = await Review.create({
    hotelId,
    guestId: req.user._id,
    bookingId,
    rating,
    comment,
    photos: photos ?? [],
    isVerified: !!bookingId,
  });

  // Update hotel aggregate rating
  const stats = await Review.aggregate([
    { $match: { hotelId: review.hotelId } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats[0]) {
    await Hotel.findByIdAndUpdate(hotelId, {
      rating: Math.round(stats[0].avg * 10) / 10,
      reviewCount: stats[0].count,
    });
  }

  sendSuccess(res, review, 201);
});

export const getHotelReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({ hotelId: req.params.hotelId })
    .populate('guestId', 'fullName avatarUrl')
    .sort({ createdAt: -1 });

  sendSuccess(
    res,
    reviews.map((r) => ({
      id: r._id.toString(),
      userName: r.guestId?.fullName ?? 'Guest',
      userAvatar: r.guestId?.avatarUrl ?? '',
      rating: r.rating,
      comment: r.comment,
      date: r.createdAt,
      photos: r.photos?.map((p) => p.url) ?? [],
      isVerified: r.isVerified,
      helpfulCount: r.helpfulCount,
    }))
  );
});
