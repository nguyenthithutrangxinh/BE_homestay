const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const authMiddleware = require("../middlewares/authentication");

// Tạo cuộc trò chuyện mới
router.post(
  "/",
  authMiddleware.verifyToken,
  conversationController.createConversation
);

// Lấy tất cả cuộc trò chuyện với phân trang
router.get(
  "/",
  authMiddleware.verifyToken,
  conversationController.getAllConversations
);

// Lấy cuộc trò chuyện theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  conversationController.getConversationById
);

// Cập nhật cuộc trò chuyện theo ID (nếu cần, chẳng hạn như thêm người dùng)
router.put(
  "/:id",
  authMiddleware.verifyToken,
  conversationController.updateConversation
);

// Xóa cuộc trò chuyện theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  conversationController.deleteConversation
);

module.exports = router;
