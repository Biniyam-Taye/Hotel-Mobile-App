const mongoose = require('mongoose');

const specialRateSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    label: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const eventSpaceSchema = new mongoose.Schema(
  {
    spaceNumber: {
      type: String,
      required: [true, 'Please add a space code'],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a space name'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'EventCategory',
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a base price'],
      min: 0,
    },
    discountedPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    floor: {
      type: Number,
      default: 1,
      min: 1,
    },
    spaceSize: {
      type: Number,
      min: 1,
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Maintenance'],
      default: 'Available',
    },
    publishStatus: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    specialRates: {
      type: [specialRateSchema],
      default: [],
    },
    image: {
      type: String,
      default: 'default-event-space.jpg',
    },
    imagePublicId: {
      type: String,
    },
    section: {
      type: String,
      enum: ['events_conference', 'general'],
      default: 'events_conference',
    },
  },
  { timestamps: true }
);

eventSpaceSchema.index({ section: 1, status: 1, publishStatus: 1 });

module.exports = mongoose.model('EventSpace', eventSpaceSchema);
