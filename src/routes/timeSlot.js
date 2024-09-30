const express = require("express");
const router = express.Router();
const timeSlotController = require("../controllers/timeSlotController");

// Tạo mới thời gian
router.post("/", timeSlotController.createTimeSlot);

// Lấy danh sách thời gian với phân trang
router.get("/", timeSlotController.getAllTimeSlots);

// Lấy thông tin chi tiết của thời gian theo ID
router.get("/:id", timeSlotController.getTimeSlotById);

// Cập nhật thời gian theo ID
router.put("/:id", timeSlotController.updateTimeSlot);

// Xóa thời gian theo ID
router.delete("/:id", timeSlotController.deleteTimeSlot);

module.exports = router;
