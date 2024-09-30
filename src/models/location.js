const mongoose = require("mongoose");

const locationShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationShema);

module.exports = Location;
