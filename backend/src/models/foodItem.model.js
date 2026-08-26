const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a food name'],
      trim: true,
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
      type: mongoose.Schema.ObjectId,
      ref: 'FoodCategory',
      required: true,
    },
    image: {
      type: String,
      default: 'default-food.jpg',
    },
    imagePublicId: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
      default: 20,
    },
    tags: {
      type: [String],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
    },
    section: {
      type: String,
      enum: ['restaurant_bar', 'room_service'],
      default: 'restaurant_bar',
    },
  },
  {
    timestamps: true,
  }
);

foodItemSchema.index({ category: 1, isAvailable: 1 });
foodItemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('FoodItem', foodItemSchema);
