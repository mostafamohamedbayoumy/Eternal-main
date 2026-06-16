const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

// Public route for creating orders (guests can order)
router.post('/', createOrder);

// Protected routes
router.get('/my-orders', protect, getMyOrders);
router.get('/stats', protect, adminOnly, getOrderStats);
router.get('/:id', protect, getOrder);

// Admin routes
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
