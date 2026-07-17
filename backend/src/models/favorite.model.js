const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    itemType: {
      type: String,
      enum: ['Room', 'FoodItem', 'Service'],
      required: true,
    },
    itemId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: 'itemType',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from favoriting the same item multiple times
favoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
