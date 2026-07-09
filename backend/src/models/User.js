import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ROLES, LOYALTY_TIERS } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.GUEST,
    },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, select: false },

    // Profile (maps to Flutter UserProfile)
    fullName: { type: String, required: true, trim: true },
    phone: String,
    avatarUrl: String,
    avatarPublicId: String, // Cloudinary public_id for deletion
    location: String,
    loyaltyTier: {
      type: String,
      enum: LOYALTY_TIERS,
      default: 'silver',
    },
    rewardPoints: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    preferences: [{ type: String }],

    // Staff: hotels this user can access (hotel_admin, receptionist)
    assignedHotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ assignedHotels: 1 });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    email: this.email,
    role: this.role,
    fullName: this.fullName,
    phone: this.phone,
    avatarUrl: this.avatarUrl,
    location: this.location,
    loyaltyTier: this.loyaltyTier,
    rewardPoints: this.rewardPoints,
    walletBalance: this.walletBalance,
    preferences: this.preferences,
    assignedHotels: this.assignedHotels?.map((id) => id.toString()) ?? [],
    createdAt: this.createdAt,
  };
};

export default mongoose.model('User', userSchema);
