const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a facility name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    operatingHours: {
      type: String,
      required: [true, 'Please add operating hours'],
      trim: true,
      maxlength: [100, 'Operating hours can not be more than 100 characters'],
    },
    status: {
      type: String,
      enum: ['Active', 'Closed for Maintenance'],
      default: 'Active',
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
      default: 'default-facility.jpg',
    },
    imagePublicId: {
      type: String,
    },
    section: {
      type: String,
      enum: ['facilities_wellness', 'general'],
      default: 'facilities_wellness',
    },
  },
  {
    timestamps: true,
  }
);

facilitySchema.index({ section: 1, status: 1 });

module.exports = mongoose.model('Facility', facilitySchema);
