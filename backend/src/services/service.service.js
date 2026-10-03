const Service = require('../models/service.model');
const ServiceBooking = require('../models/serviceBooking.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { deleteImage } = require('../utils/cloudinary');
const { sendNotification } = require('./engagement.service');

const normalizeServiceInput = (data) => {
  const payload = { ...data };

  if (payload.title && !payload.name) {
    payload.name = payload.title;
  }
  delete payload.title;

  if (payload.status !== undefined) {
    payload.isAvailable = payload.status === 'Active' || payload.status === true;
    delete payload.status;
  }

  return payload;
};

const createService = async (data) => {
  const payload = normalizeServiceInput(data);
  return Service.create(payload);
};

const getServices = async (query) => {
  const filter = { ...query };

  if (filter.status === 'Active') filter.isAvailable = true;
  if (filter.status === 'Inactive') filter.isAvailable = false;
  delete filter.status;

  if (filter.section) {
    filter.section = filter.section;
  }

  return queryBuilder(Service, filter, ['name', 'description', 'pricingNote']);
};

const getPublicHotelServices = async () => {
  return Service.find({ section: 'hotel_service', isAvailable: true })
    .select('name description pricingNote price image badge icon category duration createdAt')
    .sort('-createdAt');
};

const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, 'Service not found');
  return service;
};

const updateService = async (id, data) => {
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, 'Service not found');

  const payload = normalizeServiceInput(data);

  if (payload.imagePublicId && service.imagePublicId && payload.imagePublicId !== service.imagePublicId) {
    await deleteImage(service.imagePublicId);
  }

  Object.assign(service, payload);
  await service.save();
  return service;
};

const deleteService = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, 'Service not found');

  if (service.imagePublicId) {
    await deleteImage(service.imagePublicId);
  }

  await service.deleteOne();
  return service;
};

const createBooking = async (userId, data) => {
  const service = await Service.findById(data.service);
  if (!service) throw new ApiError(404, 'Service not found');
  if (!service.isAvailable) throw new ApiError(400, `${service.name} is currently unavailable`);

  const totalAmount = service.price || 0;

  const booking = await ServiceBooking.create({
    ...data,
    user: userId,
    totalAmount,
  });

  sendNotification({
    userId,
    title: 'Service Booked',
    message: `Your booking for ${service.name} has been received.`,
    type: 'booking',
    relatedId: booking._id,
  }).catch((err) => console.error('Notification failed:', err));

  return booking;
};

const getBookings = async (query, userId, role) => {
  const q = { ...query };
  if (role !== 'admin') q.user = userId;

  const result = await queryBuilder(ServiceBooking, q, ['status']);
  await ServiceBooking.populate(result.data, [
    { path: 'user', select: 'firstName lastName email' },
    { path: 'room', select: 'title' },
    { path: 'service', select: 'name image price category pricingNote' },
  ]);
  return result;
};

const getBookingById = async (id, userId, role) => {
  const booking = await ServiceBooking.findById(id)
    .populate('user', 'firstName lastName email')
    .populate('room', 'title')
    .populate('service', 'name image price category pricingNote');

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
  createService,
  getServices,
  getPublicHotelServices,
  getServiceById,
  updateService,
  deleteService,
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
};
