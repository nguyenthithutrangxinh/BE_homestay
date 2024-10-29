const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middlewares/authentication");

// Tạo phản hồi mới
router.post("/", authMiddleware.verifyToken, feedbackController.createFeedback);

// Lấy tất cả phản hồi theo phòng (có phân trang)
router.get(
  "/",
  authMiddleware.verifyToken,
  feedbackController.getAllFeedbacksPaginated
);
router.get(
  "/room/:roomId",
  authMiddleware.verifyToken,
  feedbackController.getFeedbackByRoomID
);

// Lấy phản hồi theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  feedbackController.getFeedbackById
);

// Cập nhật phản hồi theo ID
router.put(
  "/:id",
  authMiddleware.verifyToken,
  feedbackController.updateFeedback
);

// Xóa phản hồi theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  feedbackController.deleteFeedback
);

module.exports = router;
