const mongoose = require('mongoose');

const eventRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Guest info if not logged in
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
    type: {
      type: String,
      enum: ['stable-centerpieces', 'custom-booth'],
      required: [true, 'Event type is required'],
    },
    // For stable centerpieces
    selectedCenterpieces: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
    // For custom booth or general preferences
    preferences: {
      theme: String,
      colors: [String],
      flowerTypes: [String],
      style: String,
      budget: String,
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    eventTime: {
      type: String,
      required: [true, 'Event time is required'],
    },
    location: {
      address: {
        type: String,
        required: [true, 'Event location is required'],
      },
      city: String,
      state: String,
      zipCode: String,
    },
    expectedGuests: {
      type: Number,
    },
    tableCount: {
      type: Number,
    },
    details: {
      type: String,
      required: [true, 'Event details are required'],
    },
    status: {
      type: String,
      enum: ['new', 'in-review', 'quoted', 'confirmed', 'declined', 'completed'],
      default: 'new',
    },
    quote: {
      amount: Number,
      notes: String,
      quotedAt: Date,
    },
    internalNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EventRequest', eventRequestSchema);
