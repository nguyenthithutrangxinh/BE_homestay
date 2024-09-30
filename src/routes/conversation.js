const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

// Tạo cuộc trò chuyện mới
router.post("/", conversationController.createConversation);

// Lấy tất cả cuộc trò chuyện với phân trang
router.get("/", conversationController.getAllConversations);

// Lấy cuộc trò chuyện theo ID
router.get("/:id", conversationController.getConversationById);

// Cập nhật cuộc trò chuyện theo ID (nếu cần, chẳng hạn như thêm người dùng)
router.put("/:id", conversationController.updateConversation);

// Xóa cuộc trò chuyện theo ID
router.delete("/:id", conversationController.deleteConversation);

module.exports = router;
