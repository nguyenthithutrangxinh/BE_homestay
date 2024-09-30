const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Tạo một booking mới
router.post("/", bookingController.createBooking);

// Lấy tất cả booking với phân trang
router.get("/", bookingController.getAllBookings);

// Lấy booking theo ID
router.get("/:id", bookingController.getBookingById);

// Lấy tất cả booking theo id_user
router.get("/user/:id_user", bookingController.getBookingsByUserId);

// Cập nhật booking theo ID
router.put("/:id", bookingController.updateBooking);

// Xóa booking theo ID
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
