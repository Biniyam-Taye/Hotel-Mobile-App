const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a service name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price must be greater than or equal to 0'],
    },
    pricingNote: {
      type: String,
      trim: true,
      maxlength: [100, 'Pricing note can not be more than 100 characters'],
    },
    category: {
      type: String,
      enum: ['spa', 'gym', 'pool', 'laundry', 'airport_transfer', 'concierge', 'room_service', 'other'],
      default: 'other',
    },
    section: {
      type: String,
      enum: ['hotel_service', 'wellness', 'general'],
      default: 'hotel_service',
    },
    badge: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge can not be more than 50 characters'],
    },
    icon: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'default-service.jpg',
    },
    imagePublicId: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ section: 1, isAvailable: 1 });

module.exports = mongoose.model('Service', serviceSchema);
