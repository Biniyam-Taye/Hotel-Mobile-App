const Service = require('../models/service.model');
const ServiceBooking = require('../models/serviceBooking.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { sendNotification } = require('./engagement.service');

// --- Services (Admin & Listing) ---
const createService = async (data) => await Service.create(data);
const getServices = async (query) => await queryBuilder(Service, query, ['name', 'description']);
const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
};
const updateService = async (id, data) => {
  const service = await Service.findByIdAndUpdate(id, data, { new: true });
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
};
const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
};

// --- Service Bookings ---
const createBooking = async (userId, data) => {
  const service = await Service.findById(data.service);
  if (!service) throw new ApiError(404, 'Service not found');
  if (!service.isAvailable) throw new ApiError(400, `${service.name} is currently unavailable`);

  // Basic total calculation: just the base price of the service (can be extended with duration/quantity later)
  const totalAmount = service.price;

  const newBooking = {
    ...data,
    user: userId,
    totalAmount,
  };

  const booking = await ServiceBooking.create(newBooking);

  sendNotification({
    userId,
    title: 'Service Booked',
    message: `Your booking for ${service.name} has been received.`,
    type: 'booking',
    relatedId: booking._id,
  }).catch(err => console.error('Notification failed:', err));

  return booking;
};

const getBookings = async (query, userId, role) => {
  const q = { ...query };
  if (role !== 'admin') q.user = userId;
  
  const result = await queryBuilder(ServiceBooking, q, ['status']);
  await ServiceBooking.populate(result.data, [
    { path: 'user', select: 'firstName lastName email' },
    { path: 'room', select: 'title' },
    { path: 'service', select: 'name image price category' }
  ]);
  return result;
};

const getBookingById = async (id, userId, role) => {
  const booking = await ServiceBooking.findById(id)
    .populate('user', 'firstName lastName email')
    .populate('room', 'title')
    .populate('service', 'name image price category');

  if (!booking) throw new ApiError(404, 'Service booking not found');
  if (role !== 'admin' && booking.user._id.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to view this booking');
  }
  return booking;
};

const updateBookingStatus = async (id, status) => {
  const booking = await ServiceBooking.findByIdAndUpdate(id, { status }, { new: true });
  if (!booking) throw new ApiError(404, 'Service booking not found');
  return booking;
};

module.exports = {
  createService, getServices, getServiceById, updateService, deleteService,
  createBooking, getBookings, getBookingById, updateBookingStatus,
};
