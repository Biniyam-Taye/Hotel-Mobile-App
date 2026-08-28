const Offer = require('../models/offer.model');
const Coupon = require('../models/coupon.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { deleteImage } = require('../utils/cloudinary');

const parseJsonField = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const normalizeOfferInput = (data) => {
  const payload = { ...data };

  if (payload.mainImage && !payload.image) {
    payload.image = payload.mainImage;
  }
  delete payload.mainImage;

  if (typeof payload.highlights === 'string') {
    payload.highlights = parseJsonField(payload.highlights);
  }
  if (typeof payload.detailImages === 'string') {
    payload.detailImages = parseJsonField(payload.detailImages);
  }

  if (payload.typeTag && /popular/i.test(payload.typeTag)) {
    payload.isPopular = true;
  }

  if (payload.status === 'Active') {
    payload.isActive = true;
  } else if (payload.status === 'Inactive') {
    payload.isActive = false;
  } else if (payload.isActive !== undefined && payload.status === undefined) {
    payload.status = payload.isActive ? 'Active' : 'Inactive';
  }

  if (Array.isArray(payload.newDetailImages)) {
    const existing = Array.isArray(payload.detailImages) ? payload.detailImages : [];
    payload.detailImages = [...existing, ...payload.newDetailImages];
    delete payload.newDetailImages;
  }

  if (Array.isArray(payload.highlights)) {
    payload.highlights = payload.highlights
      .filter((item) => item && (item.title || item.description))
      .map((item) => ({
        title: item.title?.trim() || '',
        description: item.description?.trim() || '',
      }));
  }

  return payload;
};

const deleteOfferImages = async (offer) => {
  if (offer.imagePublicId) {
    await deleteImage(offer.imagePublicId);
  }

  if (Array.isArray(offer.detailImages)) {
    await Promise.all(
      offer.detailImages
        .filter((img) => img.publicId)
        .map((img) => deleteImage(img.publicId))
    );
  }
};

// --- Offers Services ---
const createOffer = async (data) => {
  const payload = normalizeOfferInput(data);
  return Offer.create(payload);
};

const getOffers = async (query) =>
  queryBuilder(Offer, query, ['title', 'subtitle', 'description', 'discountTag', 'typeTag']);

const getPublicOffers = async () => {
  const now = new Date();
  return Offer.find({
    status: 'Active',
    isActive: true,
    validUntil: { $gte: now },
  })
    .select('-imagePublicId -detailImages.publicId')
    .sort('-isPopular -createdAt');
};

const getOfferById = async (id) => {
  const offer = await Offer.findById(id).select('-imagePublicId -detailImages.publicId');
  if (!offer) throw new ApiError(404, 'Offer not found');
  return offer;
};

const updateOffer = async (id, data) => {
  const offer = await Offer.findById(id);
  if (!offer) throw new ApiError(404, 'Offer not found');

  const payload = normalizeOfferInput(data);

  if (payload.imagePublicId && offer.imagePublicId && payload.imagePublicId !== offer.imagePublicId) {
    await deleteImage(offer.imagePublicId);
  }

  if (Array.isArray(payload.detailImages) && Array.isArray(offer.detailImages)) {
    const nextPublicIds = new Set(payload.detailImages.map((img) => img.publicId).filter(Boolean));
    const removed = offer.detailImages.filter((img) => img.publicId && !nextPublicIds.has(img.publicId));
    await Promise.all(removed.map((img) => deleteImage(img.publicId)));
  }

  Object.assign(offer, payload);
  await offer.save();
  return offer;
};

const deleteOffer = async (id) => {
  const offer = await Offer.findById(id);
  if (!offer) throw new ApiError(404, 'Offer not found');

  await deleteOfferImages(offer);
  await offer.deleteOne();
  return offer;
};

// --- Coupons Services ---
const createCoupon = async (data) => await Coupon.create(data);
const getCoupons = async (query) => await queryBuilder(Coupon, query, ['code']);
const getCouponById = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new ApiError(404, 'Coupon not found');
  return coupon;
};
const updateCoupon = async (id, data) => {
  const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
  if (!coupon) throw new ApiError(404, 'Coupon not found');
  return coupon;
};
const deleteCoupon = async (id) => {
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) throw new ApiError(404, 'Coupon not found');
  return coupon;
};

// Validate a coupon against an order amount
const applyCoupon = async (code, orderAmount) => {
  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) throw new ApiError(404, 'Invalid coupon code');
  if (!coupon.isActive) throw new ApiError(400, 'Coupon is inactive');

  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    throw new ApiError(400, 'Coupon is expired or not yet valid');
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new ApiError(400, 'Coupon usage limit reached');
  }

  if (orderAmount < coupon.minimumSpend) {
    throw new ApiError(400, `Minimum spend of ${coupon.minimumSpend} required`);
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (orderAmount * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  discount = Math.min(discount, orderAmount);

  return {
    originalAmount: orderAmount,
    discount,
    finalAmount: orderAmount - discount,
    couponId: coupon._id,
  };
};

module.exports = {
  createOffer,
  getOffers,
  getPublicOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
