const Message = require("../models/messages");

// Tạo tin nhắn mới
const createMessage = async (req, res) => {
  try {
    const { id_conversation, sender, message } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (!id_conversation || !sender || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo tin nhắn mới
    const newMessage = await Message.create({
      id_conversation,
      sender,
      message,
    });

    res
      .status(201)
      .json({ message: "Message created successfully", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả tin nhắn theo cuộc trò chuyện (có phân trang)
const getAllMessages = async (req, res) => {
  try {
    const { id_conversation } = req.query; // ID cuộc trò chuyện
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định

    if (!id_conversation) {
      return res.status(400).json({ message: "Conversation ID is required" });
    }

    const messages = await Message.find({ id_conversation })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("sender", "name email") // Chọn trường cần thiết từ user
      .exec();

    const count = await Message.countDocuments({ id_conversation }); // Tổng số lượng tin nhắn

    res.status(200).json({
      messages,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tin nhắn theo ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "sender",
      "name email"
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật tin nhắn theo ID
const updateMessage = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật tin nhắn
    const message = await Message.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về giá trị mới sau khi cập nhật
      runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message updated successfully", message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa tin nhắn theo ID
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
