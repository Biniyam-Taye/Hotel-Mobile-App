const mongoose = require('mongoose');

const eventCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [300, 'Description can not be more than 300 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventCategory', eventCategorySchema);
