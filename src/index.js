const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/user");
const bookingRoute = require("./routes/booking");
const conversationRoute = require("./routes/conversation");
const feedbackRoute = require("./routes/feedback");
const locationRoute = require("./routes/location");
const messageRoute = require("./routes/message");
const roomRoute = require("./routes/room");
const serviceRoute = require("./routes/service");
const timeSlotRoute = require("./routes/timeSlot");
const uploadRoute = require("./routes/upload");

db.connect();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/bookings", bookingRoute);
app.use("/conversations", conversationRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/locations", locationRoute);
app.use("/messages", messageRoute);
app.use("/rooms", roomRoute);
app.use("/services", serviceRoute);
app.use("/time-slots", timeSlotRoute);
app.use("/upload", uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
