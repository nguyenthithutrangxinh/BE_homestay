const Service = require("../models/service");

// Tạo dịch vụ mới
const createService = async (req, res) => {
  try {
    const { name, type } = req.body;

    // Kiểm tra nếu các giá trị cần thiết không có
    if (!name || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo một dịch vụ mới
    const service = await Service.create({ name, type });

    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả dịch vụ có phân trang
const getAllServices = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Đặt giá trị mặc định cho phân trang
    const services = await Service.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Service.countDocuments(); // Tổng số dịch vụ

    res.status(200).json({
      services,
      totalPages: count,
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin dịch vụ theo ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật dịch vụ theo ID
const updateService = async (req, res) => {
  try {
    const updates = req.body;

    // Cập nhật dịch vụ
    const service = await Service.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Trả về đối tượng mới sau khi cập nhật
      runValidators: true, // Kiểm tra tính hợp lệ của dữ liệu trước khi cập nhật
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa dịch vụ theo ID
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
