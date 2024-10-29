const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const authMiddleware = require("../middlewares/authentication");

// Tạo mới phòng (with image upload)
router.post("/", authMiddleware.verifyToken, roomController.createRoom);

// Lấy danh sách phòng với phân trang
router.get("/", authMiddleware.verifyToken, roomController.getAllRooms);

// Lấy thông tin chi tiết của phòng theo ID
router.get("/:id", authMiddleware.verifyToken, roomController.getRoomById);
router.get(
  "/location/:locationId",
  authMiddleware.verifyToken,
  roomController.getRoomsByLocationId
);

router.get(
  "/list/search",
  authMiddleware.verifyToken,
  roomController.searchRoomsByName
);

// Cập nhật phòng theo ID (with image upload)
router.put("/:id", authMiddleware.verifyToken, roomController.updateRoom);

// Xóa phòng theo ID
router.delete("/:id", authMiddleware.verifyToken, roomController.deleteRoom);

module.exports = router;
