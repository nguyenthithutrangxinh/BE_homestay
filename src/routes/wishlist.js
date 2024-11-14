const express = require("express");
const {
  getAllWishLists,
  getWishListById,
  createWishList,
  updateWishList,
  deleteWishList,
  getWishListsByUserId,
} = require("../controllers/wishListController");

const router = express.Router();

router.get("/", getAllWishLists);

router.get("/:id", getWishListById);

router.post("/", createWishList);

router.put("/:id", updateWishList);

router.delete("/:id", deleteWishList);
router.get("/user/:userId", getWishListsByUserId);

module.exports = router;
