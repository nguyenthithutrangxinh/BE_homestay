const Location = require("../models/location");

// Tạo địa điểm mới
const createLocation = async (req, res) => {
  try {
    const { name, address } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }

    // Tạo địa điểm mới
    const location = await Location.create({ name, address });

    res
      .status(201)
      .json({ message: "Location created successfully", location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các địa điểm (có phân trang)
const getAllLocations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Phân trang với giá trị mặc định
    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Location.countDocuments(); // Tổng số lượng địa điểm

    res.status(200).json({
      locations,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy địa điểm theo ID
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật địa điểm theo ID
const updateLocation = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật địa điểm
    const location = await Location.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về giá trị mới sau khi cập nhật
      runValidators: true, // Kiểm tra dữ liệu có hợp lệ trước khi cập nhật
    });

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res
      .status(200)
      .json({ message: "Location updated successfully", location });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa địa điểm theo ID
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
