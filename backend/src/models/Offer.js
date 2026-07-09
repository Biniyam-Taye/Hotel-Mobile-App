import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    title: { type: String, required: true },
    subtitle: String,
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: String,
    couponCode: { type: String, unique: true, sparse: true },
    discountPercent: { type: Number, required: true },
    validUntil: { type: Date, required: true },
    terms: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Offer', offerSchema);
