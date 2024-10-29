const Room = require("../models/room");

// Tạo phòng mới
const createRoom = async (req, res) => {
  try {
    const {
      name,
      max_occupancy,
      type,
      description,
      id_location,
      id_service,
      images,
    } = req.body;

    // Kiểm tra nếu có trường bắt buộc bị thiếu
    if (
      !name ||
      !max_occupancy ||
      !type ||
      !description ||
      !id_location ||
      !id_service
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure 'images' is an array of strings (URLs)
    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Tạo phòng mới
    const room = await Room.create({
      name,
      max_occupancy,
      type,
      description,
      id_location,
      id_service,
      images, // Images are now URLs
    });

    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các phòng (có phân trang)
const getAllRooms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_location")
      .populate("id_service")
      .exec();

    const count = await Room.countDocuments();

    res.status(200).json({
      rooms,
      totalPages: count,
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
      .populate("id_location")
      .populate("id_service");

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
    const {
      name,
      max_occupancy,
      type,
      description,
      id_location,
      id_service,
      images,
    } = req.body;

    // Ensure images are passed as an array of strings (URLs)
    if (images && (!Array.isArray(images) || images.length === 0)) {
      return res
        .status(400)
        .json({ message: "Images should be a non-empty array" });
    }

    const updates = {
      name,
      max_occupancy,
      type,
      description,
      id_location,
      id_service,
      ...(images && { images }), // Update images if provided
    };

    const room = await Room.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated room
      runValidators: true, // Validate data before updating
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
const searchRoomsByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the 'name' from the query string
    const limit = parseInt(req.query.limit) || 10; // Set default limit to 10 if not provided
    const page = parseInt(req.query.page) || 1; // Set default page to 1 if not provided

    if (!name) {
      return res
        .status(400)
        .json({ message: "Search term 'name' is required" });
    }

    // Search for rooms by name with regex, and add pagination
    const rooms = await Room.find({ name: { $regex: name, $options: "i" } })
      .populate("id_location")
      .populate("id_service")
      .skip((page - 1) * limit) // Skip documents for pagination
      .limit(limit); // Limit documents per page

    const count = await Room.countDocuments({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({
      rooms,
      totalPages: Math.ceil(count / limit), // Calculate total pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: error.message });
  }
};
const getRoomsByLocationId = async (req, res) => {
  try {
    const { locationId } = req.params; // ID of the location
    const limit = parseInt(req.query.limit) || 10; // Default limit of 10 if not provided
    const page = parseInt(req.query.page) || 1; // Default page 1 if not provided

    if (!locationId) {
      return res.status(400).json({ message: "Location ID is required" });
    }

    // Find rooms by id_location and apply pagination
    const rooms = await Room.find({ id_location: locationId })
      .populate("id_location")
      .populate("id_service")
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Room.countDocuments({ id_location: locationId });

    res.status(200).json({
      rooms,
      totalPages: Math.ceil(count / limit), // Calculate total pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error("Error fetching rooms by location:", error);
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
  searchRoomsByName,
  getRoomsByLocationId,
};
