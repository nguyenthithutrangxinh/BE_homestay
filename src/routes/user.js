const express = require("express");
const router = express.Router();

const authController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authentication");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/", authController.getAllUsers);
router.get("/:id", authController.getUserById);
router.put("/:id", authMiddleware.verifyToken, authController.updateUser);
router.delete("/:id", authController.deleteUser);

module.exports = router;
