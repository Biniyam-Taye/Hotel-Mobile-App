const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const promoService = require('../services/promotion.service');
const { uploadSingle } = require('../utils/cloudinary');

// --- Offer Controllers ---
const createOffer = asyncHandler(async (req, res) => {
  let image;
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'offers');
    image = result.url;
  }
  const offer = await promoService.createOffer({ ...req.body, image });
  res.status(201).json(new ApiResponse(201, { offer }, 'Offer created'));
});

const getOffers = asyncHandler(async (req, res) => {
  const result = await promoService.getOffers(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getOffer = asyncHandler(async (req, res) => {
  const offer = await promoService.getOfferById(req.params.id);
  res.status(200).json(new ApiResponse(200, { offer }));
});

const updateOffer = asyncHandler(async (req, res) => {
  let data = { ...req.body };
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'offers');
    data.image = result.url;
  }
  const offer = await promoService.updateOffer(req.params.id, data);
  res.status(200).json(new ApiResponse(200, { offer }, 'Offer updated'));
});

const deleteOffer = asyncHandler(async (req, res) => {
  await promoService.deleteOffer(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Offer deleted'));
});

// --- Coupon Controllers ---
const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await promoService.createCoupon(req.body);
  res.status(201).json(new ApiResponse(201, { coupon }, 'Coupon created'));
});

const getCoupons = asyncHandler(async (req, res) => {
  const result = await promoService.getCoupons(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await promoService.getCouponById(req.params.id);
  res.status(200).json(new ApiResponse(200, { coupon }));
});

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await promoService.updateCoupon(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { coupon }, 'Coupon updated'));
});

const deleteCoupon = asyncHandler(async (req, res) => {
  await promoService.deleteCoupon(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Coupon deleted'));
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { code, orderAmount } = req.body;
  const result = await promoService.applyCoupon(code, orderAmount);
  res.status(200).json(new ApiResponse(200, result, 'Coupon applied successfully'));
});

module.exports = {
  createOffer, getOffers, getOffer, updateOffer, deleteOffer,
  createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon,
  applyCoupon,
};
