const TimeSlots = require("../models/timeSlot");

// Tạo thời gian mới
const createTimeSlot = async (req, res) => {
  try {
    const { name, price, from, to } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (!name || !price || !from || !to) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo thời gian mới
    const timeSlot = await TimeSlots.create({ name, price, from, to });

    res
      .status(201)
      .json({ message: "Time slot created successfully", timeSlot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các thời gian (có phân trang)
const getAllTimeSlots = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định
    const timeSlots = await TimeSlots.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await TimeSlots.countDocuments(); // Tổng số lượng thời gian

    res.status(200).json({
      timeSlots,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thời gian theo ID
const getTimeSlotById = async (req, res) => {
  try {
    const timeSlot = await TimeSlots.findById(req.params.id);
    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }
    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thời gian theo ID
const updateTimeSlot = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật thời gian
    const timeSlot = await TimeSlots.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về giá trị mới sau khi cập nhật
      runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
    });

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    res
      .status(200)
      .json({ message: "Time slot updated successfully", timeSlot });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa thời gian theo ID
const deleteTimeSlot = async (req, res) => {
  try {
    const timeSlot = await TimeSlots.findByIdAndDelete(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlotById,
  updateTimeSlot,
  deleteTimeSlot,
};
