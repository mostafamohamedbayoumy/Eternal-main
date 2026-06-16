const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    Readable.from(buffer).pipe(stream);
  });
};

// @desc    Upload one or more images to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded',
      });
    }

    const results = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, 'eternal/products'))
    );

    res.json({
      success: true,
      urls: results.map((result) => result.secure_url),
    });
  } catch (error) {
    next(error);
  }
};
