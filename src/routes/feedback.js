const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Tạo phản hồi mới
router.post("/", feedbackController.createFeedback);

// Lấy tất cả phản hồi theo phòng (có phân trang)
router.get("/", feedbackController.getAllFeedbacks);

// Lấy phản hồi theo ID
router.get("/:id", feedbackController.getFeedbackById);

// Cập nhật phản hồi theo ID
router.put("/:id", feedbackController.updateFeedback);

// Xóa phản hồi theo ID
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
