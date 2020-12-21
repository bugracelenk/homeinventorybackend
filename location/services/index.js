const { LocationModel, LocationTypeModel } = require("../models");

const createLocation = async (args) => {
  return await LocationModel.create(args);
};

const removeLocation = async (locationId) => {
  return await LocationModel.findByIdAndDelete(locationId).exec();
};

const addLocationType = async (args) => {
  return await LocationTypeModel.create(args);
};

const getLocationTypes = async () => {
  return await LocationTypeModel.find({}).exec();
};

const getLocations = async (filter, options) => {
  const locations = await LocationModel.find(filter, null, options);
  const count = await LocationModel.countDocuments(filter);

  return { locations, count };
};

const getLocationById = async (locationId) => {
  return await LocationModel.findById(locationId);
};

module.exports = {
  createLocation,
  removeLocation,
  getLocations,
  getLocationById,
  addLocationType,
  getLocationTypes,
};
