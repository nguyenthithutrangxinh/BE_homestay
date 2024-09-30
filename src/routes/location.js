const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// Tạo mới địa điểm
router.post("/", locationController.createLocation);

// Lấy danh sách địa điểm với phân trang
router.get("/", locationController.getAllLocations);

// Lấy thông tin chi tiết của địa điểm theo ID
router.get("/:id", locationController.getLocationById);

// Cập nhật địa điểm theo ID
router.put("/:id", locationController.updateLocation);

// Xóa địa điểm theo ID
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
