const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a room title'],
      trim: true,
      maxlength: [100, 'Title can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    location: {
      type: String,
      default: 'Adama',
    },
    bedType: {
      type: String,
    },
    roomSize: {
      type: Number,
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please add a price per night'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price must be greater than or equal to 0'],
    },
    capacity: {
      adults: {
        type: Number,
        required: true,
        default: 2,
      },
      children: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    amenities: {
      type: [String],
      required: true,
    },
    mainImage: {
      type: String,
      default: 'default-room.jpg',
    },
    detailImages: {
      type: [String],
      default: [],
    },
    roomType: {
      type: String,
      enum: ['standard', 'deluxe', 'suite', 'presidential'],
      default: 'standard',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', roomSchema);
