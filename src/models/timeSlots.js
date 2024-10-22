const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TimeSlots = mongoose.model("TimeSlots", timeSlotSchema);

module.exports = TimeSlots;
