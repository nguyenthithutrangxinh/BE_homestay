const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    id_room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    id_location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
      },
    ],
    id_time_slot: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlots",
        required: true,
      },
    ],
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date_booking: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Booked"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
