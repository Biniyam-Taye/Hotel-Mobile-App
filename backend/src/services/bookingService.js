import Booking from '../models/Booking.js';
import RoomType from '../models/RoomType.js';
import Hotel from '../models/Hotel.js';
import { ApiError, countNights, generateBookingRef } from '../utils/helpers.js';
import { BOOKING_STATUS } from '../utils/constants.js';

const ACTIVE_STATUSES = [
  BOOKING_STATUS.PENDING,
  BOOKING_STATUS.CONFIRMED,
  BOOKING_STATUS.ACTIVE,
];

/**
 * Count overlapping bookings for a room type in a date range.
 */
export async function countOverlappingBookings(roomTypeId, checkIn, checkOut, session = null) {
  const query = Booking.countDocuments({
    roomTypeId,
    status: { $in: ACTIVE_STATUSES },
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  });
  if (session) query.session(session);
  return query;
}

/**
 * Create a booking with inventory conflict checking (transaction-safe).
 */
export async function createBooking(input) {
  const {
    guestId,
    hotelId,
    roomTypeId,
    checkIn,
    checkOut,
    guests,
    paymentMethod,
    specialRequests,
    couponCode,
    status = BOOKING_STATUS.CONFIRMED,
    paymentStatus = 'unpaid',
  } = input;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    throw new ApiError(400, 'checkOut must be after checkIn');
  }

  const roomType = await RoomType.findOne({
    _id: roomTypeId,
    hotelId,
    isActive: true,
  });

  if (!roomType) throw new ApiError(404, 'Room type not found');
  if (roomType.capacity < guests) {
    throw new ApiError(400, 'Room capacity exceeded for number of guests');
  }

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) throw new ApiError(404, 'Hotel not found');

  const overlapping = await countOverlappingBookings(roomTypeId, checkIn, checkOut);
  if (overlapping >= roomType.totalInventory) {
    throw new ApiError(409, 'No availability for selected dates');
  }

  const nights = countNights(checkInDate, checkOutDate);
  const subtotal = roomType.pricePerNight * nights;
  const commissionRate = hotel.commissionRate ?? Number(process.env.PLATFORM_COMMISSION_PERCENT) ?? 15;
  const platformCommission = (subtotal * commissionRate) / 100;
  const totalPrice = subtotal;

  const booking = await Booking.create({
    bookingRef: generateBookingRef(),
    guestId,
    hotelId,
    roomTypeId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests,
    nights,
    pricePerNight: roomType.pricePerNight,
    subtotal,
    platformCommission,
    totalPrice,
    status,
    paymentMethod,
    paymentStatus,
    specialRequests,
    couponCode,
  });

  return { booking, roomType, hotel };
}

/**
 * Populate booking for Flutter response shape.
 */
export async function formatBookingResponse(booking) {
  await booking.populate([
    { path: 'hotelId', select: 'name city country location images amenities rating category currency' },
    { path: 'roomTypeId' },
  ]);

  const hotel = booking.hotelId;
  const roomType = booking.roomTypeId;

  return {
    id: booking._id.toString(),
    bookingRef: booking.bookingRef,
    hotel: {
      id: hotel._id.toString(),
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      location: hotel.location,
      images: hotel.images?.map((i) => i.url) ?? [],
      amenities: hotel.amenities,
      rating: hotel.rating,
      category: hotel.category,
      currency: hotel.currency,
      pricePerNight: roomType.pricePerNight,
    },
    room: roomType.toRoomJSON(),
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guests: booking.guests,
    nights: booking.nights,
    totalPrice: booking.totalPrice,
    status: mapStatusForFlutter(booking.status),
    paymentMethod: booking.paymentMethod,
    paymentStatus: booking.paymentStatus,
    specialRequests: booking.specialRequests,
    couponCode: booking.couponCode,
    createdAt: booking.createdAt,
  };
}

/** Map backend status to Flutter BookingStatus enum values */
export function mapStatusForFlutter(status) {
  const map = {
    pending: 'upcoming',
    confirmed: 'upcoming',
    active: 'active',
    completed: 'completed',
    cancelled: 'cancelled',
    refunded: 'refunded',
  };
  return map[status] ?? status;
}
