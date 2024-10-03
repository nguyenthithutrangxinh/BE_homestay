const mongoose = require("mongoose");
async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("database Connected!");
  } catch (error) {
    console.log("Connection failure: " + error);
  }
}

module.exports = { connect };
