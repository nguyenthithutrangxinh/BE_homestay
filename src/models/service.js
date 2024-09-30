const mongoose = require("mongoose");

const serviceShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Interior", "Spice"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Available",
        "Unavailable",
        "Maintenance",
        "Coming Soon",
        "Additional",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceShema);

module.exports = Service;
