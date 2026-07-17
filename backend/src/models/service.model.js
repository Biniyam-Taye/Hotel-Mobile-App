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
      required: [true, 'Please add a price'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    category: {
      type: String,
      enum: ['spa', 'gym', 'pool', 'laundry', 'airport_transfer', 'other'],
      default: 'other',
    },
    image: {
      type: String,
      default: 'default-service.jpg',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number, // duration in minutes, if applicable
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
