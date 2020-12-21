const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Item",
      default: [],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    barcode: {
      type: Number,
      default: 0,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ReceiptModel = mongoose.model("Receipt", ReceiptSchema);

module.exports = {
  ReceiptSchema,
  ReceiptModel,
};
