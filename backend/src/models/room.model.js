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
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please add a price per night'],
      min: [0, 'Price must be greater than or equal to 0'],
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
    images: {
      type: [String],
      default: ['default-room.jpg'],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', roomSchema);
