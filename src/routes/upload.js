const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middlewares/authentication");
const upload = require("../middlewares/multer"); // Multer config

// Route for uploading a single image
router.post(
  "/upload",
  authMiddleware.verifyToken,
  upload.single("image"), // Only upload a single file
  uploadController.uploadSingleImage
);

module.exports = router;
