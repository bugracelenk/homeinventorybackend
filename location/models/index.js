const mongoose = require("mongoose");

const LocationTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Yer Adı Girilmedi."],
    },
    address: {
      type: String,
      default: "",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationType",
      required: [true, "Yer Tipi Girilmedi."],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const LocationModel = mongoose.model("Location", LocationSchema);
const LocationTypeModel = mongoose.model("LocationType", LocationTypeSchema);

module.exports = {
  LocationSchema,
  LocationTypeModel,
  LocationModel,
};
