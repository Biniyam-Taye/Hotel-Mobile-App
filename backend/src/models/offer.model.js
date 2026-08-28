const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 300 },
  },
  { _id: true }
);

const detailImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
  },
  { _id: false }
);

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an offer title'],
      trim: true,
      maxlength: [120, 'Title can not be more than 120 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, 'Subtitle can not be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    discountTag: {
      type: String,
      trim: true,
      maxlength: [30, 'Discount tag can not be more than 30 characters'],
    },
    typeTag: {
      type: String,
      trim: true,
      maxlength: [50, 'Type tag can not be more than 50 characters'],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'default-offer.jpg',
    },
    imagePublicId: {
      type: String,
    },
    detailImages: {
      type: [detailImageSchema],
      default: [],
    },
    highlights: {
      type: [highlightSchema],
      default: [],
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: [true, 'Please add a valid until date'],
    },
    packagePricing: {
      type: String,
      trim: true,
      maxlength: [50, 'Package pricing can not be more than 50 characters'],
    },
    stayLength: {
      type: String,
      trim: true,
      maxlength: [50, 'Stay length can not be more than 50 characters'],
    },
    guests: {
      type: String,
      trim: true,
      maxlength: [50, 'Guests can not be more than 50 characters'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    // Legacy field kept for backward compatibility
    discountPercentage: {
      type: Number,
      min: 1,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.index({ status: 1, validUntil: 1 });
offerSchema.index({ isPopular: -1, createdAt: -1 });

module.exports = mongoose.model('Offer', offerSchema);
