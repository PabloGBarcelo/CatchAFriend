var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'catchafriend',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'my-file-name');
  }
});

var parser = multer({ storage: storage });

module.exports = parser;
