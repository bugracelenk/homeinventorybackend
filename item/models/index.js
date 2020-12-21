const mongoose = require("mongoose");

const ItemTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ürün Türü Adı Girilmedi."],
    },
  },
  { timestamps: true }
);

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ürün İsmi Girilmedi."],
    },
    description: {
      type: String,
      default: "",
    },
    itemType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemType",
      required: [true, "Ürün Tipi Girilmedi."],
    },
    itemImage: {
      type: String,
      default: "",
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: [true, "Üretici Firma Girilmedi."],
    },
    purchaseLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "Ürünün alındığı yer girilmedi."],
    },
    price: {
      type: Number,
      default: 0,
    },
    expirationDate: {
      type: Date,
    },
    purchaseDate: {
      type: Date,
      default: Date.now(),
    },
    lastUsed: {
      type: Date,
      default: Date.now(),
    },
    quantity: {
      type: Number,
      default: 0,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    barcode: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model("Item", ItemSchema);
const ItemTypeModel = mongoose.model("ItemType", ItemTypeSchema);

module.exports = {
  ItemModel,
  ItemSchema,
  ItemTypeModel,
};
