const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description can not be more than 200 characters'],
    },
    image: {
      type: String,
      default: 'default-category.jpg',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FoodCategory', foodCategorySchema);
