const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Tạo tin nhắn mới
router.post("/", messageController.createMessage);

// Lấy tất cả tin nhắn theo cuộc trò chuyện (có phân trang)
router.get("/", messageController.getAllMessages);

// Lấy tin nhắn theo ID
router.get("/:id", messageController.getMessageById);

// Cập nhật tin nhắn theo ID (nếu cần)
router.put("/:id", messageController.updateMessage);

// Xóa tin nhắn theo ID
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
