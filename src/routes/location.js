const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const authMiddleware = require("../middlewares/authentication");

// Tạo mới địa điểm
router.post("/", authMiddleware.verifyToken, locationController.createLocation);

// Lấy danh sách địa điểm với phân trang
router.get("/", authMiddleware.verifyToken, locationController.getAllLocations);

// Lấy thông tin chi tiết của địa điểm theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  locationController.getLocationById
);

// Cập nhật địa điểm theo ID
router.put(
  "/:id",
  authMiddleware.verifyToken,
  locationController.updateLocation
);

// Xóa địa điểm theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  locationController.deleteLocation
);

module.exports = router;
