const express = require('express');
const router = express.Router();
const {
  getActiveOffers,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} = require('../controllers/offerController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/active', getActiveOffers);
router.get('/', protect, adminOnly, getAllOffers);
router.post('/', protect, adminOnly, createOffer);
router.put('/:id', protect, adminOnly, updateOffer);
router.delete('/:id', protect, adminOnly, deleteOffer);

module.exports = router;
