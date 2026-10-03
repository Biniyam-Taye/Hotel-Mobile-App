const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const servService = require('../services/service.service');
const { uploadSingle } = require('../utils/cloudinary');

const applyUploadedImage = async (file, folder) => {
  if (!file) return {};
  const result = await uploadSingle(file.buffer, folder);
  return { image: result.url, imagePublicId: result.publicId };
};

const createService = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'services/hotel');
  const service = await servService.createService({ ...req.body, ...imageData, section: req.body.section || 'hotel_service' });
  res.status(201).json(new ApiResponse(201, { service }, 'Service created'));
});

const getServices = asyncHandler(async (req, res) => {
  const result = await servService.getServices(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getPublicHotelServices = asyncHandler(async (req, res) => {
  const services = await servService.getPublicHotelServices();
  res.status(200).json(new ApiResponse(200, { services }));
});

const getService = asyncHandler(async (req, res) => {
  const service = await servService.getServiceById(req.params.id);
  res.status(200).json(new ApiResponse(200, { service }));
});

const updateService = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'services/hotel');
  const service = await servService.updateService(req.params.id, { ...req.body, ...imageData });
  res.status(200).json(new ApiResponse(200, { service }, 'Service updated'));
});

const deleteService = asyncHandler(async (req, res) => {
  await servService.deleteService(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Service deleted'));
});

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
  createService,
  getServices,
  getPublicHotelServices,
  getService,
  updateService,
  deleteService,
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
};
