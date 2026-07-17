const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  foodItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'FoodItem',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtOrder: {
    type: Number,
    required: true,
  },
});

const foodOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      // Optional, if they order to a specific room, otherwise pickup or general delivery
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
    specialInstructions: {
      type: String,
      maxlength: 300,
    },
    deliveryTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add Indexes for performance optimization
foodOrderSchema.index({ user: 1 });
foodOrderSchema.index({ status: 1 });
foodOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FoodOrder', foodOrderSchema);
