const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const singleUpload = require("../middlewares/multer");

router.post("/", singleUpload, uploadController.uploadFile);

module.exports = router;
