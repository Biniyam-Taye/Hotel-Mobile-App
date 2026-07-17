const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const servService = require('../services/service.service');
const { uploadSingle } = require('../utils/cloudinary');

// --- Service Controllers ---
const createService = asyncHandler(async (req, res) => {
  let image;
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'services');
    image = result.url;
  }
  const service = await servService.createService({ ...req.body, image });
  res.status(201).json(new ApiResponse(201, { service }, 'Service created'));
});

const getServices = asyncHandler(async (req, res) => {
  const result = await servService.getServices(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getService = asyncHandler(async (req, res) => {
  const service = await servService.getServiceById(req.params.id);
  res.status(200).json(new ApiResponse(200, { service }));
});

const updateService = asyncHandler(async (req, res) => {
  let data = { ...req.body };
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'services');
    data.image = result.url;
  }
  const service = await servService.updateService(req.params.id, data);
  res.status(200).json(new ApiResponse(200, { service }, 'Service updated'));
});

const deleteService = asyncHandler(async (req, res) => {
  await servService.deleteService(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Service deleted'));
});

// --- Service Booking Controllers ---
const createBooking = asyncHandler(async (req, res) => {
  const booking = await servService.createBooking(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, { booking }, 'Service booked successfully'));
});

const getBookings = asyncHandler(async (req, res) => {
  const result = await servService.getBookings(req.query, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, result));
});

const getBooking = asyncHandler(async (req, res) => {
  const booking = await servService.getBookingById(req.params.id, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, { booking }));
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await servService.updateBookingStatus(req.params.id, req.body.status);
  res.status(200).json(new ApiResponse(200, { booking }, 'Service booking status updated'));
});

module.exports = {
  createService, getServices, getService, updateService, deleteService,
  createBooking, getBookings, getBooking, updateBookingStatus,
};
