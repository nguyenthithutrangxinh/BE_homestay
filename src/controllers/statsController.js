// controllers/statsController.js

const User = require("../models/user");
const Booking = require("../models/booking");

exports.getNewUsersCount = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const newUsersCount = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(1)),
        $lt: new Date(new Date().setMonth(currentMonth + 1, 1)),
      },
    });
    res.status(200).json({ newUsersCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyBookingsCount = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const monthlyBookingsCount = await Booking.countDocuments({
      date_booking: {
        $gte: new Date(new Date().setDate(1)),
        $lt: new Date(new Date().setMonth(currentMonth + 1, 1)),
      },
    });
    res.status(200).json({ monthlyBookingsCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalBookingRevenue = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const monthlyBookingRevenue = await Booking.aggregate([
      {
        $match: {
          date_booking: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
          status: "Pending", // Lọc theo trạng thái đã đặt thành công (Booked)
        },
      },
      {
        $lookup: {
          from: "timeslots",
          localField: "id_time_slot",
          foreignField: "_id",
          as: "timeSlotDetails",
        },
      },
      { $unwind: "$timeSlotDetails" },
      {
        $group: {
          _id: { month: { $month: "$date_booking" } }, // Nhóm theo tháng của date_booking
          totalRevenue: { $sum: "$timeSlotDetails.price" },
        },
      },
      { $sort: { "_id.month": 1 } }, // Sắp xếp kết quả theo tháng tăng dần
    ]);

    // Định dạng lại kết quả
    const formattedRevenue = monthlyBookingRevenue.map((item) => ({
      month: item._id.month,
      totalRevenue: item.totalRevenue,
    }));

    res.status(200).json({ monthlyRevenue: formattedRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopRooms = async (req, res) => {
  try {
    const topRooms = await Booking.aggregate([
      {
        $group: {
          _id: "$id_room",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "_id",
          as: "roomDetails",
        },
      },
      { $unwind: "$roomDetails" },
      {
        $project: {
          _id: 0,
          roomId: "$_id",
          count: 1,
          roomDetails: "$roomDetails", // Đưa toàn bộ thông tin phòng vào kết quả
        },
      },
    ]);
    res.status(200).json({ topRooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
