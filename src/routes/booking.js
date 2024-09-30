const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authentication");
// Tạo một booking mới
router.post("/", authMiddleware.verifyToken, bookingController.createBooking);

// Lấy tất cả booking với phân trang
router.get("/", authMiddleware.verifyToken, bookingController.getAllBookings);

// Lấy booking theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  bookingController.getBookingById
);

// Lấy tất cả booking theo id_user
router.get(
  "/user/:id_user",
  authMiddleware.verifyToken,
  bookingController.getBookingsByUserId
);

// Cập nhật booking theo ID
router.put("/:id", authMiddleware.verifyToken, bookingController.updateBooking);

// Xóa booking theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  bookingController.deleteBooking
);

module.exports = router;
