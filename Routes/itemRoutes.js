const express = require("express");
const ensureAuthenticated = require("../Middlewares/Auth");
const Item = require("../Models/ItemModel");

const router = express.Router();

// 🔹 Add Item (Only for logged-in users)
router.post("/add", ensureAuthenticated, async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item({ userId: req.user._id, name, price });
    await newItem.save();

    res
      .status(201)
      .json({
        message: "Item added successfully",
        success: true,
        item: newItem,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: err.message,
      });
  }
});

// 🔹 Get Items (Only logged-in user's items)
router.get("/my-items", ensureAuthenticated, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id });

    res.status(200).json({ success: true, items });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

module.exports = router;
