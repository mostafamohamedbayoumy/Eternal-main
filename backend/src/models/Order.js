const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  productName: String,
  productImage: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  // For custom bouquets
  isCustomBouquet: {
    type: Boolean,
    default: false,
  },
  customBouquetDetails: {
    flowers: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        price: Number,
      },
    ],
    fillers: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        price: Number,
      },
    ],
    greeneryFillers: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        price: Number,
      },
    ],
    specialInstructions: String,
  },
  // For single bouquets with greenery
  hasGreenery: {
    type: Boolean,
    default: false,
  },
  greeneryPrice: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Not required for guest orders
    },
    // Guest customer info (if no customerId)
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
    items: [orderItemSchema],
    totalBeforeDiscount: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalAfterDiscount: {
      type: Number,
      required: true,
    },
    promoCodeUsed: {
      code: String,
      discountAmount: Number,
    },
    offerDiscounts: [
      {
        offerId: mongoose.Schema.Types.ObjectId,
        offerName: String,
        discountAmount: Number,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-preparation', 'ready', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash-on-delivery', 'card', 'online'],
      default: 'cash-on-delivery',
    },
    deliveryAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    deliveryDate: {
      type: Date,
    },
    deliveryTimeWindow: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
