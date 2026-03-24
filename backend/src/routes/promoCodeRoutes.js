const express = require('express');
const router = express.Router();
const {
  validatePromoCode,
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} = require('../controllers/promoCodeController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/validate', validatePromoCode);
router.get('/', protect, adminOnly, getAllPromoCodes);
router.post('/', protect, adminOnly, createPromoCode);
router.put('/:id', protect, adminOnly, updatePromoCode);
router.delete('/:id', protect, adminOnly, deletePromoCode);

module.exports = router;
