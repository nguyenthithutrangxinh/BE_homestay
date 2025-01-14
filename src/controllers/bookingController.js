const Booking = require("../models/booking");

// Tạo một booking mới
const createBooking = async (req, res) => {
  try {
    const { id_room, id_location, id_time_slot, id_user, date_booking } =
      req.body;

    // Kiểm tra xem tất cả các trường bắt buộc có được cung cấp không
    if (
      !id_room ||
      !id_location ||
      !id_time_slot ||
      !id_user ||
      !date_booking
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Kiểm tra xem ngày đặt có phải là quá khứ không
    const currentDate = new Date();
    if (new Date(date_booking) < currentDate.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "You cannot book for a past date.",
      });
    }

    // Kiểm tra trùng lặp booking với từng slot time
    for (let i = 0; i < id_time_slot.length; i++) {
      const existingBooking = await Booking.findOne({
        id_room,
        id_location,
        id_time_slot: id_time_slot[i],
        date_booking: {
          $gte: new Date(new Date(date_booking).setHours(0, 0, 0, 0)),
          $lt: new Date(new Date(date_booking).setHours(23, 59, 59, 999)),
        },
      });

      if (existingBooking) {
        return res.status(400).json({
          message: `Time slot ${id_time_slot[i]} is already booked for the selected date.`,
        });
      }
    }

    // Tạo booking mới
    const newBooking = await Booking.create({
      id_room,
      id_location,
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
      .sort({ createdAt: -1 })
      .populate("id_room")
      .populate("id_location")
      .populate("id_time_slot")
      .populate({
        path: "id_user",
        select: "-password",
      })
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
      .populate("id_location")
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
      .sort({ createdAt: -1 })
      .populate("id_room")
      .populate("id_location")
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
    const { id } = req.params; // Lấy ID từ URL
    const { status } = req.body; // Chỉ lấy giá trị status từ request body

    // Kiểm tra xem trạng thái có hợp lệ không
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Cập nhật trạng thái booking
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // Trả về giá trị mới sau khi cập nhật
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
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
