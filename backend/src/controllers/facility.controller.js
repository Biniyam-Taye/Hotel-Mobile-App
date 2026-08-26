const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const facilityService = require('../services/facility.service');
const { uploadSingle } = require('../utils/cloudinary');

const applyUploadedImage = async (file, folder) => {
  if (!file) return {};
  const result = await uploadSingle(file.buffer, folder);
  return { image: result.url, imagePublicId: result.publicId };
};

const createFacility = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'facilities');
  const facility = await facilityService.createFacility({
    ...req.body,
    ...imageData,
    section: req.body.section || 'facilities_wellness',
  });
  res.status(201).json(new ApiResponse(201, { facility }, 'Facility created'));
});

const getFacilities = asyncHandler(async (req, res) => {
  const result = await facilityService.getFacilities(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getPublicFacilities = asyncHandler(async (req, res) => {
  const facilities = await facilityService.getPublicFacilities();
  res.status(200).json(new ApiResponse(200, { facilities }));
});

const getFacility = asyncHandler(async (req, res) => {
  const facility = await facilityService.getFacilityById(req.params.id);
  res.status(200).json(new ApiResponse(200, { facility }));
});

const updateFacility = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'facilities');
  const facility = await facilityService.updateFacility(req.params.id, { ...req.body, ...imageData });
  res.status(200).json(new ApiResponse(200, { facility }, 'Facility updated'));
});

const deleteFacility = asyncHandler(async (req, res) => {
  await facilityService.deleteFacility(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Facility deleted'));
});

module.exports = {
  createFacility,
  getFacilities,
  getPublicFacilities,
  getFacility,
  updateFacility,
  deleteFacility,
};
