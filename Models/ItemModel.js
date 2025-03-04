const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const ItemModel = mongoose.model("Item", ItemSchema);
module.exports = ItemModel;
