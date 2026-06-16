const Order = require('../models/Order');
const PromoCode = require('../models/PromoCode');
const Product = require('../models/Product');
const { calculatePromoDiscount } = require('../utils/helpers');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest orders allowed)
exports.createOrder = async (req, res, next) => {
  try {
    const {
      items,
      promoCode,
      deliveryAddress,
      deliveryDate,
      deliveryTimeWindow,
      notes,
      paymentMethod,
      guestInfo, // For guest orders
    } = req.body;

    // Calculate total before discount
    let totalBeforeDiscount = 0;
    
    for (const item of items) {
      totalBeforeDiscount += item.price * item.quantity;
    }

    let discountAmount = 0;
    let promoCodeUsed = null;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({ code: promoCode.toUpperCase() });

      if (!promo) {
        return res.status(400).json({
          success: false,
          message: 'Invalid promo code',
        });
      }

      if (!promo.isValid()) {
        return res.status(400).json({
          success: false,
          message: 'Promo code is not valid or has expired',
        });
      }

      // Check user usage only if user is logged in
      if (req.user && !promo.canUserUse(req.user.id)) {
        return res.status(400).json({
          success: false,
          message: 'You have already used this promo code the maximum number of times',
        });
      }

      if (promo.minOrderAmount && totalBeforeDiscount < promo.minOrderAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount of $${promo.minOrderAmount} required for this promo code`,
        });
      }

      // Calculate promo discount
      const promoDiscount = calculatePromoDiscount(totalBeforeDiscount, promo);
      discountAmount += promoDiscount;

      promoCodeUsed = {
        code: promo.code,
        discountAmount: promoDiscount,
      };

      // Update promo code usage
      promo.usesCount += 1;
      
      // Track usage by user if logged in
      if (req.user) {
        const userUsageIndex = promo.usedBy.findIndex(
          (u) => u.userId.toString() === req.user.id.toString()
        );

        if (userUsageIndex >= 0) {
          promo.usedBy[userUsageIndex].usedCount += 1;
        } else {
          promo.usedBy.push({
            userId: req.user.id,
            usedCount: 1,
          });
        }
      }

      await promo.save();
    }

    const totalAfterDiscount = Math.max(0, totalBeforeDiscount - discountAmount);

    // Prepare order data
    const orderData = {
      items,
      totalBeforeDiscount,
      discountAmount,
      totalAfterDiscount,
      promoCodeUsed,
      deliveryAddress,
      deliveryDate,
      deliveryTimeWindow,
      notes,
      paymentMethod: paymentMethod || 'cash-on-delivery',
      status: 'ongoing',
      paymentStatus: 'pending',
    };

    // Add customer ID if logged in, otherwise add guest info
    if (req.user) {
      orderData.customerId = req.user.id;
    } else if (guestInfo) {
      orderData.guestInfo = guestInfo;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Guest information is required for non-logged-in users',
      });
    }

    // Create order
    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email');

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if user owns this order or is admin
    if (order.customerId._id.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email phone');

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order statistics (Admin)
// @route   GET /api/orders/stats
// @access  Private/Admin
exports.getOrderStats = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const dayOfWeek = (now.getDay() + 6) % 7; // 0 = Monday
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);

    const [
      ordersThisWeek,
      ordersThisMonth,
      ordersThisYear,
      ongoingCount,
      deliveredCount,
      cancelledCount,
      totalProducts,
      revenueOrders,
    ] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Order.countDocuments({ createdAt: { $gte: startOfYear } }),
      Order.countDocuments({ status: 'ongoing' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.countDocuments({ status: 'cancelled' }),
      Product.countDocuments({ isActive: true }),
      Order.find({ status: { $ne: 'cancelled' } }, 'totalAfterDiscount'),
    ]);

    const totalRevenue = revenueOrders.reduce((sum, order) => sum + order.totalAfterDiscount, 0);

    res.json({
      success: true,
      data: {
        ordersThisWeek,
        ordersThisMonth,
        ordersThisYear,
        totalOrders: ongoingCount + deliveredCount + cancelledCount,
        byStatus: {
          ongoing: ongoingCount,
          delivered: deliveredCount,
          cancelled: cancelledCount,
        },
        totalProducts,
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};
