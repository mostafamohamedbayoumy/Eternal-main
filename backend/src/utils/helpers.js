const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Calculate discount for offers
exports.calculateOfferDiscount = (price, offer) => {
  if (offer.discountType === 'percentage') {
    return (price * offer.discountValue) / 100;
  } else {
    return Math.min(offer.discountValue, price);
  }
};

// Calculate discount for promo code
exports.calculatePromoDiscount = (total, promoCode) => {
  if (promoCode.discountType === 'percentage') {
    return (total * promoCode.discountValue) / 100;
  } else {
    return Math.min(promoCode.discountValue, total);
  }
};

// Validate date format
exports.isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};
