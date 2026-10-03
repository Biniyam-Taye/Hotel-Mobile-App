const mongoose = require('mongoose');

const roomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    basePrice: {
      type: Number,
      required: [true, 'Please add a base price in ETB'],
      min: [0, 'Base price must be greater than or equal to 0'],
    },
    maxGuests: {
      type: Number,
      default: 2,
      min: 1,
    },
    bedConfiguration: {
      type: String,
      default: '',
    },
    roomSize: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Draft'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('RoomCategory', roomCategorySchema);
