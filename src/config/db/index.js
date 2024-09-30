const mongoose = require("mongoose");
async function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://trangntt2805:AdBzXuqdy4LONlo6@cluster0.30obf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("database Connected!");
  } catch (error) {
    console.log("Connection failure: " + error);
  }
}

module.exports = { connect };
