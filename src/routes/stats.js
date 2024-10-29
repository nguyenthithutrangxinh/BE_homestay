// routes/statsRoutes.js

const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/new-users", statsController.getNewUsersCount);
router.get("/monthly-bookings", statsController.getMonthlyBookingsCount);
router.get("/total-booking-revenue", statsController.getTotalBookingRevenue);
router.get("/top-rooms", statsController.getTopRooms);

module.exports = router;
