const Booking = require("../models/booking");

// Tạo một booking mới
const createBooking = async (req, res) => {
  try {
    const { id_room, id_time_slot, id_user, date_booking } = req.body;

    // Kiểm tra xem tất cả các trường bắt buộc có được cung cấp không
    if (!id_room || !id_time_slot || !id_user || !date_booking) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Kiểm tra trùng lặp booking
    const existingBooking = await Booking.findOne({
      id_room,
      id_time_slot,
      date_booking: {
        $gte: new Date(date_booking.setHours(0, 0, 0, 0)),
        $lt: new Date(date_booking.setHours(23, 59, 59, 999)),
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked for the selected date.",
      });
    }

    // Tạo booking mới
    const newBooking = await Booking.create({
      id_room,
      id_time_slot,
      id_user,
      date_booking,
    });

    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả booking với phân trang
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Truy vấn để lấy tất cả booking
    const bookings = await Booking.find()
      .populate("id_room")
      .populate("id_time_slot")
      .populate("id_user")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Booking.countDocuments();

    res.status(200).json({
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy booking theo ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL

    // Tìm booking theo ID
    const booking = await Booking.findById(id)
      .populate("id_room")
      .populate("id_time_slot")
      .populate("id_user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả booking theo id_user
const getBookingsByUserId = async (req, res) => {
  try {
    const { id_user } = req.params; // Lấy id_user từ tham số URL
    const { page = 1, limit = 10 } = req.query;

    // Truy vấn để lấy tất cả booking theo id_user
    const bookings = await Booking.find({ id_user })
      .populate("id_room")
      .populate("id_time_slot")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Booking.countDocuments({ id_user });

    res.status(200).json({
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật một booking
const updateBooking = async (req, res) => {
  try {
    const updates = req.body;
    const { id } = req.params; // Lấy ID từ URL

    // Kiểm tra xem có trường ngày đặt không
    if (updates.date_booking) {
      // Kiểm tra trùng lặp booking
      const existingBooking = await Booking.findOne({
        id_room: updates.id_room,
        id_time_slot: updates.id_time_slot,
        date_booking: {
          $gte: new Date(updates.date_booking.setHours(0, 0, 0, 0)),
          $lt: new Date(updates.date_booking.setHours(23, 59, 59, 999)),
        },
      });

      if (existingBooking) {
        return res.status(400).json({
          message: "This time slot is already booked for the selected date.",
        });
      }
    }

    // Cập nhật booking
    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true, // Trả về giá trị mới
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa một booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa booking
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  updateBooking,
  deleteBooking,
};
