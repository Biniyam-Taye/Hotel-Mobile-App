const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please add a room number'],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a room name'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    categoryId: {
      type: String,
      required: [true, 'Please add a category'],
    },
    categoryName: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please add a price per night in ETB'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    discountedPrice: {
      type: Number,
      min: [0, 'Discounted price must be greater than or equal to 0'],
    },
    maxGuests: {
      type: Number,
      required: true,
      default: 2,
      min: 1,
    },
    floor: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Maintenance'],
      default: 'Available',
    },
    publishStatus: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    mainImage: {
      type: String,
      default: '',
    },
    detailImages: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: 'Adama',
    },
    bedType: {
      type: String,
      default: '',
    },
    roomSize: {
      type: Number,
    },
    description: {
      type: String,
      default: '',
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.5,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Backwards-compatible aliases for older booking/services code
roomSchema.virtual('title').get(function () {
  return this.name;
});

roomSchema.virtual('pricePerNight').get(function () {
  return this.discountedPrice ?? this.price;
});

module.exports = mongoose.model('Room', roomSchema);
