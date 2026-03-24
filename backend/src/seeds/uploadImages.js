const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Found' : 'NOT FOUND');

const imagePath = path.resolve(__dirname, '../singleflowers/mini-lotus.png');

console.log('File exists:', fs.existsSync(imagePath));
console.log('Path:', imagePath);

cloudinary.uploader.upload(imagePath, { public_id: 'eternal/miniLotus', overwrite: true })
  .then(function(result) {
    console.log('SUCCESS:', result.secure_url);
  })
  .catch(function(error) {
    console.log('ERROR:', error.message);
  });
