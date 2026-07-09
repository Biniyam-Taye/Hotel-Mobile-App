import mongoose from 'mongoose';

const roomImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const roomTypeSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    originalPrice: Number,
    capacity: { type: Number, required: true },
    bedType: { type: String, required: true },
    bedCount: { type: Number, default: 1 },
    roomSize: { type: Number, required: true },
    view: { type: String, required: true },
    amenities: [String],
    breakfastIncluded: { type: Boolean, default: false },
    totalInventory: { type: Number, default: 1, min: 1 },
    isActive: { type: Boolean, default: true },
    images: [roomImageSchema],
  },
  { timestamps: true }
);

roomTypeSchema.methods.toRoomJSON = function toRoomJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    type: this.type,
    description: this.description,
    pricePerNight: this.pricePerNight,
    originalPrice: this.originalPrice,
    capacity: this.capacity,
    bedType: this.bedType,
    bedCount: this.bedCount,
    roomSize: this.roomSize,
    view: this.view,
    images: this.images?.map((i) => i.url) ?? [],
    amenities: this.amenities,
    isAvailable: this.isActive,
    breakfastIncluded: this.breakfastIncluded,
    totalInventory: this.totalInventory,
  };
};

export default mongoose.model('RoomType', roomTypeSchema);
