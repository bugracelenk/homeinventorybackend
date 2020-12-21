const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    items: {
      type: [mongoose.Schema.Types.ObjectIds],
      ref: "Item",
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receipt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receipt",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ShoppingListModel = mongoose.model("ShoppingList", ShoppingListSchema);

module.exports = {
  ShoppingListSchema,
  ShoppingListModel,
};
