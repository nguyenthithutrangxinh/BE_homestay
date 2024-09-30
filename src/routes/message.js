const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authentication");

// Tạo tin nhắn mới
router.post("/", authMiddleware.verifyToken, messageController.createMessage);

// Lấy tất cả tin nhắn theo cuộc trò chuyện (có phân trang)
router.get("/", authMiddleware.verifyToken, messageController.getAllMessages);

// Lấy tin nhắn theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  messageController.getMessageById
);

// Cập nhật tin nhắn theo ID (nếu cần)
router.put("/:id", authMiddleware.verifyToken, messageController.updateMessage);

// Xóa tin nhắn theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  messageController.deleteMessage
);

module.exports = router;
