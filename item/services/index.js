const { ItemModel, ItemTypeModel } = require("../models");

const createItem = async (args) => {
  return await ItemModel.create(args);
};

const removeItem = async (itemId) => {
  return await ItemModel.findByIdAndDelete(itemId).exec();
};

const updateItem = async (itemId, args) => {
  return await ItemModel.findByIdAndUpdate(itemId, { $set: args }).exec();
};

const getItems = async (filter, options) => {
  const items = await ItemModel.find(filter, null, options)
    .populate({ path: "itemType", select: "name", model: "Manufacturer" })
    .populate({ path: "manufacturer", model: "Manufacturer", select: "-__v" })
    .populate({ path: "purchaseLocation", model: "Location", select: "-__v" })
    .populate({ path: "addedBy", model: "User", select: "username email profileImage name surName" });
  const count = await ItemModel.countDocuments(filter);

  return { items, count };
};

const getItemById = async (itemId) => {
  return await ItemModel.findById(itemId)
    .populate({ path: "itemType", select: "name", model: "Manufacturer" })
    .populate({ path: "manufacturer", model: "Manufacturer", select: "-__v" })
    .populate({ path: "purchaseLocation", model: "Location", select: "-__v" })
    .populate({ path: "addedBy", model: "User", select: "username email profileImage name surName" })
    .exec();
};

const getItemByBarcode = async (barcode) => {
  return await ItemModel.findOne({ barcode })
    .populate({ path: "itemType", select: "name", model: "Manufacturer" })
    .populate({ path: "manufacturer", model: "Manufacturer", select: "-__v" })
    .populate({ path: "purchaseLocation", model: "Location", select: "-__v" })
    .populate({ path: "addedBy", model: "User", select: "username email profileImage name surName" })
    .exec();
};

const getItemTypes = async (filter = {}, options = {}) => {
  return await ItemTypeModel.find(filter, null, options).exec();
};

const getItemTypeById = async (typeId) => {
  return await ItemTypeModel.findById(typeId).exec();
};

const addItemType = async (name) => {
  return await ItemTypeModel.create({ name });
};

module.exports = {
  createItem,
  removeItem,
  updateItem,
  getItems,
  getItemById,
  getItemByBarcode,
  getItemTypes,
  getItemTypeById,
  addItemType,
};
