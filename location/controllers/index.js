const LocationService = require("../services");
const promiseHandler = require("../../utilities/promiseHandler");
const { validateBody } = require("../../utilities/validateQuery");
const setLimitSkip = require("../../utilities/setLimitSkip");
const { returnError } = require("../../utilities");

const { validFieldsLocation, validFieldsLocationType } = require("../location.module");

const createLocation = async (req, res, next) => {
  const { userId } = req.user;

  const args = await validateBody(Object.keys(req.body), req.body, validFieldsLocation);
  if (args.error) return res.json(returnError(args.error));

  args.addedBy = userId;

  const [addError, addedLocation] = await promiseHandler(LocationService.createLocation(args));
  if (addError) return res.json(returnError(addError));

  return res.json({
    status: true,
    addedLocation,
  });
};

const addLocationType = async (req, res, next) => {
  const args = await validateBody(Object.keys(req.body), req.body, validFieldsLocationType);
  if (args.error) return res.json(returnError(args.error));

  const [addTypeError, addedType] = await promiseHandler(LocationService.addLocationType(args));
  if (addTypeError) return res.json(returnError(addTypeError));

  return res.json({
    status: true,
    addedType,
  });
};

const getLocations = async (req, res, next) => {
  const { id, name, skip, limit } = req.query;

  let filter = {};
  if (id && name) filter._id = id;
  else if (id) filter._id = id;
  else if (name) filter.name = name;

  const options = await setLimitSkip(skip, limit);

  const [getErr, locationsAndCount] = await promiseHandler(LocationService.getLocations(filter, options));
  if (getErr) return res.json(returnError(getErr));

  return res.json({
    status: true,
    ...locationsAndCount,
  });
};

const getLocationTypes = async (req, res, next) => {
  const { id, name, skip, limit } = req.query;

  let filter = {};
  if (id && name) filter._id = id;
  else if (id) filter._id = id;
  else if (name) filter.name = name;

  const options = await setLimitSkip(skip, limit);

  const [getErr, types] = await promiseHandler(LocationService.getLocationTypes(filter, options));
  if (getErr) return res.json(returnError(getErr));

  return res.json({
    status: true,
    types,
  });
};

module.exports = {
  addLocationType,
  createLocation,
  getLocationTypes,
  getLocations,
};
