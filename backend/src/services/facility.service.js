const Facility = require('../models/facility.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { deleteImage } = require('../utils/cloudinary');

const normalizeFacilityInput = (data) => {
  const payload = { ...data };

  if (payload.title && !payload.name) {
    payload.name = payload.title;
  }
  delete payload.title;

  if (payload.hours && !payload.operatingHours) {
    payload.operatingHours = payload.hours;
  }
  delete payload.hours;

  return payload;
};

const createFacility = async (data) => {
  const payload = normalizeFacilityInput(data);
  return Facility.create(payload);
};

const getFacilities = async (query) => {
  const filter = { ...query };

  if (filter.section) {
    filter.section = filter.section;
  }

  return queryBuilder(Facility, filter, ['name', 'description', 'operatingHours']);
};

const getPublicFacilities = async () => {
  return Facility.find({ section: 'facilities_wellness', status: 'Active' })
    .select('name description operatingHours image badge icon createdAt')
    .sort('-createdAt');
};

const getFacilityById = async (id) => {
  const facility = await Facility.findById(id);
  if (!facility) throw new ApiError(404, 'Facility not found');
  return facility;
};

const updateFacility = async (id, data) => {
  const facility = await Facility.findById(id);
  if (!facility) throw new ApiError(404, 'Facility not found');

  const payload = normalizeFacilityInput(data);

  if (payload.imagePublicId && facility.imagePublicId && payload.imagePublicId !== facility.imagePublicId) {
    await deleteImage(facility.imagePublicId);
  }

  Object.assign(facility, payload);
  await facility.save();
  return facility;
};

const deleteFacility = async (id) => {
  const facility = await Facility.findById(id);
  if (!facility) throw new ApiError(404, 'Facility not found');

  if (facility.imagePublicId) {
    await deleteImage(facility.imagePublicId);
  }

  await facility.deleteOne();
  return facility;
};

module.exports = {
  createFacility,
  getFacilities,
  getPublicFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
