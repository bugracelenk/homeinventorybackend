const mongoose = require("mongoose");

const ManufacturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Üretici Adı Girilmedi."],
    },
    logoUri: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    websiteUri: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ManufacturerModel = mongoose.model("Manufacturer", ManufacturerSchema);

module.exports = {
  ManufacturerSchema,
  ManufacturerModel,
};
