import mongoose from 'mongoose';
import { HOTEL_STATUS } from '../utils/constants.js';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: true }
);

const nearbyPlaceSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    distanceKm: Number,
    icon: String,
  },
  { _id: false }
);

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true, index: true },
    country: { type: String, required: true },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    category: { type: String, default: 'Hotels', index: true },
    currency: { type: String, default: 'USD' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    priceFrom: { type: Number, default: 0 },
    discountLabel: String,
    videoUrl: String,
    cancellationPolicy: String,
    rules: [String],
    languages: [String],
    amenities: [String],
    contact: {
      phone: String,
      email: String,
    },
    awards: [String],
    nearbyPlaces: [nearbyPlaceSchema],
    images: [imageSchema],
    status: {
      type: String,
      enum: Object.values(HOTEL_STATUS),
      default: HOTEL_STATUS.PENDING,
      index: true,
    },
    commissionRate: { type: Number, default: 15 },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

hotelSchema.index({ name: 'text', city: 'text', description: 'text' });
hotelSchema.index({ city: 1, category: 1, status: 1 });

hotelSchema.methods.toListJSON = function toListJSON(isFavorite = false) {
  const primaryImage = this.images?.find((i) => i.isPrimary) ?? this.images?.[0];
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
    location: this.location,
    city: this.city,
    country: this.country,
    latitude: this.latitude,
    longitude: this.longitude,
    rating: this.rating,
    reviewCount: this.reviewCount,
    pricePerNight: this.priceFrom,
    discount: this.discountLabel,
    currency: this.currency,
    category: this.category,
    amenities: this.amenities,
    images: this.images?.map((i) => i.url) ?? [],
    image: primaryImage?.url ?? null,
    isFavorite,
    isAvailable: this.status === HOTEL_STATUS.ACTIVE,
    status: this.status,
  };
};

export default mongoose.model('Hotel', hotelSchema);
