const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      enum: ['single-flower', 'filler', 'greenery-filler', 'centerpiece'],
      required: [true, 'Category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    stockStatus: {
      type: String,
      enum: ['in-stock', 'out-of-stock'],
      default: 'in-stock',
    },
    applicableServices: [
      {
        type: String,
        enum: ['single-bouquet', 'customize-bouquet', 'events'],
      },
    ],
    // For greenery filler additions
    greeneryPrice: {
      type: Number,
      default: 0,
    },
    hasGreeneryOption: {
      type: Boolean,
      default: false,
    },
    imageWithGreenery: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
