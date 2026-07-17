const Offer = require('../models/offer.model');
const Coupon = require('../models/coupon.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

// --- Offers Services ---
const createOffer = async (data) => await Offer.create(data);
const getOffers = async (query) => await queryBuilder(Offer, query, ['title', 'description']);
const getOfferById = async (id) => {
  const offer = await Offer.findById(id);
  if (!offer) throw new ApiError(404, 'Offer not found');
  return offer;
};
const updateOffer = async (id, data) => {
  const offer = await Offer.findByIdAndUpdate(id, data, { new: true });
  if (!offer) throw new ApiError(404, 'Offer not found');
  return offer;
};
const deleteOffer = async (id) => {
  const offer = await Offer.findByIdAndDelete(id);
  if (!offer) throw new ApiError(404, 'Offer not found');
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

  // Ensure discount doesn't exceed order amount
  discount = Math.min(discount, orderAmount);
  
  return {
    originalAmount: orderAmount,
    discount,
    finalAmount: orderAmount - discount,
    couponId: coupon._id
  };
};

module.exports = {
  createOffer, getOffers, getOfferById, updateOffer, deleteOffer,
  createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon,
  applyCoupon,
};
