const PromoCode = require('../models/PromoCode');

// @desc    Validate promo code
// @route   POST /api/promo-codes/validate
// @access  Public
exports.validatePromoCode = async (req, res, next) => {
  try {
    const { code, orderTotal, userId } = req.body;

    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found',
      });
    }

    if (!promoCode.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is expired or not active',
      });
    }

    if (userId && !promoCode.canUserUse(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You have reached the usage limit for this promo code',
      });
    }

    if (promoCode.minOrderAmount && orderTotal < promoCode.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of $${promoCode.minOrderAmount} required`,
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (promoCode.discountType === 'percentage') {
      discountAmount = (orderTotal * promoCode.discountValue) / 100;
    } else {
      discountAmount = Math.min(promoCode.discountValue, orderTotal);
    }

    res.json({
      success: true,
      message: 'Promo code is valid',
      data: {
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
        discountAmount,
        description: promoCode.description,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all promo codes (Admin)
// @route   GET /api/promo-codes
// @access  Private/Admin
exports.getAllPromoCodes = async (req, res, next) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: promoCodes.length,
      data: promoCodes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create promo code (Admin)
// @route   POST /api/promo-codes
// @access  Private/Admin
exports.createPromoCode = async (req, res, next) => {
  try {
    const promoCode = await PromoCode.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Promo code created successfully',
      data: promoCode,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update promo code (Admin)
// @route   PUT /api/promo-codes/:id
// @access  Private/Admin
exports.updatePromoCode = async (req, res, next) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found',
      });
    }

    res.json({
      success: true,
      message: 'Promo code updated successfully',
      data: promoCode,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete promo code (Admin)
// @route   DELETE /api/promo-codes/:id
// @access  Private/Admin
exports.deletePromoCode = async (req, res, next) => {
  try {
    const promoCode = await PromoCode.findByIdAndDelete(req.params.id);

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found',
      });
    }

    res.json({
      success: true,
      message: 'Promo code deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
