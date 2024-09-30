const Conversation = require("../models/conversation");

// Tạo cuộc trò chuyện mới
const createConversation = async (req, res) => {
  try {
    const { id_user1, id_user2 } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (!id_user1 || !id_user2) {
      return res.status(400).json({ message: "Both users are required" });
    }

    // Tạo cuộc trò chuyện mới
    const conversation = await Conversation.create({ id_user1, id_user2 });

    res
      .status(201)
      .json({ message: "Conversation created successfully", conversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các cuộc trò chuyện (có phân trang)
const getAllConversations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định
    const conversations = await Conversation.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_user1", "name email") // Chọn trường cần thiết từ user
      .populate("id_user2", "name email") // Chọn trường cần thiết từ user
      .exec();

    const count = await Conversation.countDocuments(); // Tổng số lượng cuộc trò chuyện

    res.status(200).json({
      conversations,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy cuộc trò chuyện theo ID
const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("id_user1", "name email") // Chọn trường cần thiết từ user
      .populate("id_user2", "name email"); // Chọn trường cần thiết từ user

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật cuộc trò chuyện theo ID
const updateConversation = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật cuộc trò chuyện
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true, // Trả về giá trị mới sau khi cập nhật
        runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
      }
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res
      .status(200)
      .json({ message: "Conversation updated successfully", conversation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa cuộc trò chuyện theo ID
const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createConversation,
  getAllConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
};
