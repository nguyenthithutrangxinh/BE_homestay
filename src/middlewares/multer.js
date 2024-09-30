// multerConfig.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Corrected import

const cloudinary = require("../config/cloudinary"); // Import your Cloudinary config

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
  // Use CloudinaryStorage here
  cloudinary: cloudinary,
  params: {
    folder: "rooms", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});

// Create multer instance
const upload = multer({ storage });

module.exports = upload;
