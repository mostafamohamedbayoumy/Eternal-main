const Partner = require('../models/Partner');

// @desc    Get all active partners
// @route   GET /api/partners
// @access  Public
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 });

    res.json({
      success: true,
      count: partners.length,
      data: partners,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create partner (Admin)
// @route   POST /api/partners
// @access  Private/Admin
exports.createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Partner created successfully',
      data: partner,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete partner (Admin)
// @route   DELETE /api/partners/:id
// @access  Private/Admin
exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.json({
      success: true,
      message: 'Partner deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
