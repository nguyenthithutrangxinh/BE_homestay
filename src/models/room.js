const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    max_occupancy: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Single", "Double", "Suite", "Family", "Dormitory"], // Các loại phòng có thể
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance", "Booked"],
      required: true,
    },
    id_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    id_service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
