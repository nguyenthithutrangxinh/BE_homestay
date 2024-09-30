const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authentication");
// Route tạo mới dịch vụ
router.post("/", authMiddleware.verifyToken, serviceController.createService);

// Route lấy danh sách dịch vụ với phân trang
router.get("/", authMiddleware.verifyToken, serviceController.getAllServices);

// Route lấy thông tin chi tiết của một dịch vụ theo ID
router.get(
  "/:id",
  authMiddleware.verifyToken,
  serviceController.getServiceById
);

// Route cập nhật dịch vụ theo ID
router.put("/:id", authMiddleware.verifyToken, serviceController.updateService);

// Route xóa dịch vụ theo ID
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  serviceController.deleteService
);

module.exports = router;
