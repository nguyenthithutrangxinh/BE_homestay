const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Tạo mới phòng
router.post("/", roomController.createRoom);

// Lấy danh sách phòng với phân trang
router.get("/", roomController.getAllRooms);

// Lấy thông tin chi tiết của phòng theo ID
router.get("/:id", roomController.getRoomById);

// Cập nhật phòng theo ID
router.put("/:id", roomController.updateRoom);

// Xóa phòng theo ID
router.delete("/:id", roomController.deleteRoom);

module.exports = router;
