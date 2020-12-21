const { ManufacturerModel } = require("../models");

const createManufacturer = async (args) => {
  return await ManufacturerModel.create(args);
};

const removeManufacturer = async (manufacturerId) => {
  return await ManufacturerModel.findByIdAndDelete(manufacturerId).exec();
};

const getManufacturers = async (filter, options) => {
  const manufacturers = await ManufacturerModel.find(filter, null, options);
  const count = await ManufacturerModel.countDocuments(filter);

  return { manufacturers, count };
};

const getManufacturerById = async (manufacturerId) => {
  return await ManufacturerModel.findById(manufacturerId);
};

module.exports = {
  createManufacturer,
  removeManufacturer,
  getManufacturers,
  getManufacturerById,
};
