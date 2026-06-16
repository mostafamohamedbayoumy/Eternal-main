const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImages } = require('../controllers/uploadController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, adminOnly, upload.array('images', 6), uploadImages);

module.exports = router;
