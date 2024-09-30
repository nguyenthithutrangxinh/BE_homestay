const mongoose = require("mongoose");

const conversationsSchema = new mongoose.Schema(
  {
    id_user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationsSchema);

module.exports = Conversation;
