import mongoose from 'mongoose';

const physicalRoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
      index: true,
    },
    roomTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomType',
      required: true,
    },
    roomNumber: { type: String, required: true },
    floor: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance', 'reserved'],
      default: 'available',
    },
    currentGuestName: String,
    checkOutDate: Date,
  },
  { timestamps: true }
);

physicalRoomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });

export default mongoose.model('PhysicalRoom', physicalRoomSchema);
