const Room = require("../models/room");

// Tạo phòng mới
const createRoom = async (req, res) => {
  try {
    const {
      name,
      max_occupancy,
      type,
      description,
      status,
      id_location,
      id_service,
    } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (
      !name ||
      !max_occupancy ||
      !type ||
      !description ||
      !status ||
      !id_location ||
      !id_service
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Kiểm tra nếu có hình ảnh được upload
    const images = req.files.map((file) => file.path); // Get paths of uploaded images

    // Tạo phòng mới
    const room = await Room.create({
      name,
      max_occupancy,
      type,
      description,
      status,
      id_location,
      id_service,
      images, // Include the images
    });

    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các phòng (có phân trang)
const getAllRooms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định
    const rooms = await Room.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_location") // Lấy thông tin của location
      .populate("id_service") // Lấy thông tin của service
      .exec();

    const count = await Room.countDocuments(); // Tổng số lượng phòng

    res.status(200).json({
      rooms,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy phòng theo ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("id_location") // Lấy thông tin của location
      .populate("id_service"); // Lấy thông tin của service

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật phòng theo ID
const updateRoom = async (req, res) => {
  try {
    const updates = req.body;

    // Kiểm tra xem có hình ảnh được upload không
    if (req.files) {
      updates.images = req.files.map((file) => file.path); // Get paths of uploaded images
    }

    // Cập nhật phòng
    const room = await Room.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về giá trị mới sau khi cập nhật
      runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
    })
      .populate("id_location")
      .populate("id_service");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa phòng theo ID
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all methods
module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
