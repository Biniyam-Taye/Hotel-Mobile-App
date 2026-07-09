import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    imageUrl: String,
    imagePublicId: String,
    hotelCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

citySchema.index({ name: 1, country: 1 }, { unique: true });

export default mongoose.model('City', citySchema);
