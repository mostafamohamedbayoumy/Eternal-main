const express = require('express');
const router = express.Router();
const { getPartners, createPartner, deletePartner } = require('../controllers/partnerController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getPartners);
router.post('/', protect, adminOnly, createPartner);
router.delete('/:id', protect, adminOnly, deletePartner);

module.exports = router;
