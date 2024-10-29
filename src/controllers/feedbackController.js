const Feedback = require("../models/feedback");

// Tạo phản hồi mới
const createFeedback = async (req, res) => {
  try {
    const { id_room, id_user, content, rating } = req.body;

    // Kiểm tra xem tất cả các trường bắt buộc có được cung cấp không
    if (!id_room || !id_user || !content || rating === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo phản hồi mới
    const newFeedback = await Feedback.create({
      id_room,
      id_user,
      content,
      rating,
    });

    res
      .status(201)
      .json({ message: "Feedback created successfully", newFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả phản hồi theo phòng (có phân trang)
const getAllFeedbacks = async (req, res) => {
  try {
    const { id_room } = req.query; // ID phòng
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định

    if (!id_room) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const feedbacks = await Feedback.find({ id_room })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_user", "name email") // Chọn trường cần thiết từ user
      .exec();

    const count = await Feedback.countDocuments({ id_room }); // Tổng số lượng phản hồi

    res.status(200).json({
      feedbacks,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy phản hồi theo ID
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "id_user",
      "name email"
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật phản hồi theo ID
const updateFeedback = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật phản hồi
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về giá trị mới sau khi cập nhật
      runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res
      .status(200)
      .json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa phản hồi theo ID
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Lấy tất cả phản hồi cho một phòng mà không có phân trang
const getFeedbackByRoomID = async (req, res) => {
  try {
    const { roomId } = req.params; // Room ID

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const feedbacks = await Feedback.find({ id_room: roomId })
      .populate("id_user")
      .exec();

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this room" });
    }

    // Calculate the average rating
    const totalRating = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );
    const averageRating = totalRating / feedbacks.length;

    res.status(200).json({
      feedbacks,
      averageRating: averageRating.toFixed(1), // Rounds to 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  getFeedbackByRoomID,
};
