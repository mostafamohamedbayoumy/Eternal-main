const Product = require('../models/Product');
const Offer = require('../models/Offer');

// Fetch offers that are currently live
const getActiveOffers = () => {
  const now = new Date();
  return Offer.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  });
};

// Attach applicable offers + a discountedPrice to a product (returns a plain object)
const applyOffers = (product, activeOffers) => {
  const productObj = product.toObject();

  const applicableOffers = activeOffers.filter(
    (offer) =>
      offer.targetProducts.some((id) => id.toString() === product._id.toString()) ||
      offer.targetServices.includes('all')
  );

  if (applicableOffers.length > 0) {
    productObj.offers = applicableOffers;

    let maxDiscount = 0;
    applicableOffers.forEach((offer) => {
      const discount =
        offer.discountType === 'percentage'
          ? (product.price * offer.discountValue) / 100
          : offer.discountValue;
      maxDiscount = Math.max(maxDiscount, discount);
    });

    productObj.discountedPrice = Math.max(0, product.price - maxDiscount);
  }

  return productObj;
};

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const { category, service, stockStatus, search } = req.query;

    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by applicable service
    if (service) {
      query.applicableServices = service;
    }

    // Filter by stock status
    if (stockStatus) {
      query.stockStatus = stockStatus;
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Only show active products
    query.isActive = true;

    const products = await Product.find(query).sort({ createdAt: -1 });

    const activeOffers = await getActiveOffers();
    const productsWithOffers = products.map((product) => applyOffers(product, activeOffers));

    res.json({
      success: true,
      count: productsWithOffers.length,
      data: productsWithOffers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const activeOffers = await getActiveOffers();

    res.json({
      success: true,
      data: applyOffers(product, activeOffers),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Soft delete
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
