const express = require("express");
const router = express.Router();
const timeSlotController = require("../controllers/timeSlotController");
const authMiddleware = require("../middlewares/authentication");
// Tạo mới thời gian
router.post("/", authMiddleware.verifyToken, timeSlotController.createTimeSlot);

// Lấy danh sách thời gian với phân trang
router.get("/", authMiddleware.verifyToken, timeSlotController.getAllTimeSlots);

// Lấy thông tin chi tiết của thời gian theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  timeSlotController.getTimeSlotById
);

// Cập nhật thời gian theo ID
router.put(
  "/:id",
  authMiddleware.verifyToken,
  timeSlotController.updateTimeSlot
);

// Xóa thời gian theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  timeSlotController.deleteTimeSlot
);

module.exports = router;
