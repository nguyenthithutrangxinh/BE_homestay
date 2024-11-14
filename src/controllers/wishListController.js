const WishLists = require("../models/wishlist");

// Get all wishlists
exports.getAllWishLists = async (req, res) => {
  try {
    const wishLists = await WishLists.find().populate("user room");
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlists", error });
  }
};

// Get a specific wishlist by ID
exports.getWishListById = async (req, res) => {
  try {
    const wishList = await WishLists.findById(req.params.id).populate(
      "user room"
    );
    if (!wishList) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// Create a new wishlist
exports.createWishList = async (req, res) => {
  try {
    const { user, room } = req.body;

    // Kiểm tra xem wishlist đã tồn tại chưa
    const existingWishList = await WishLists.findOne({ user, room });
    if (existingWishList) {
      return res.status(400).json({ message: "Wishlist already exists" });
    }

    // Nếu chưa tồn tại, thêm wishlist mới
    const newWishList = new WishLists({ user, room });
    const savedWishList = await newWishList.save();
    res.status(201).json(savedWishList);
  } catch (error) {
    res.status(500).json({ message: "Error creating wishlist", error });
  }
};

// Update an existing wishlist
exports.updateWishList = async (req, res) => {
  try {
    const updatedWishList = await WishLists.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWishList) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(updatedWishList);
  } catch (error) {
    res.status(500).json({ message: "Error updating wishlist", error });
  }
};

// Delete a wishlist
exports.deleteWishList = async (req, res) => {
  try {
    const deletedWishList = await WishLists.findByIdAndDelete(req.params.id);
    if (!deletedWishList) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wishlist", error });
  }
};

exports.getWishListsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Populate all fields in 'room' including nested fields
    const wishLists = await WishLists.find({ user: userId })
      .populate("user")
      .populate({
        path: "room",
        populate: [{ path: "id_location" }, { path: "id_service" }],
      });

    if (!wishLists || wishLists.length === 0) {
      return res
        .status(404)
        .json({ message: "No wishlists found for this user" });
    }

    res.status(200).json(wishLists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlists by user ID", error });
  }
};
