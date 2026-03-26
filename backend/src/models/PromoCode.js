const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Promo code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: [true, 'Discount type is required'],
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: 0,
    },
    validServices: [
      {
        type: String,
        enum: ['single-bouquet', 'customize-bouquet', 'all'],
      },
    ],
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    maxUses: {
      type: Number,
      default: null, // null means unlimited
    },
    usesCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: {
      type: Number,
      default: null, // null means unlimited per user
    },
    usedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        usedCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if promo code is valid
promoCodeSchema.methods.isValid = function () {
  const now = new Date();
  if (!this.isActive) return false;
  if (this.startDate > now || this.endDate < now) return false;
  if (this.maxUses && this.usesCount >= this.maxUses) return false;
  return true;
};

// Method to check if user can use this promo
promoCodeSchema.methods.canUserUse = function (userId) {
  if (!this.perUserLimit) return true;
  
  const userUsage = this.usedBy.find(
    (u) => u.userId.toString() === userId.toString()
  );
  
  if (!userUsage) return true;
  return userUsage.usedCount < this.perUserLimit;
};

module.exports = mongoose.model('PromoCode', promoCodeSchema);
