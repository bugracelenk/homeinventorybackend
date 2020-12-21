const promiseHandler = require("../../utilities/promiseHandler");
const { validateBody } = require("../../utilities/validateQuery");
const setLimitSkip = require("../../utilities/setLimitSkip");
const { returnError } = require("../../utilities");

const { validFields } = require("../manufacturer.module");

const ManufacturerService = require("../services");

const addManufacturer = async (req, res, next) => {
  const args = validateBody(Object.keys(req.body), req.body, validFields);
  if (args.error) return res.json(returnError(args.error));

  const [addError, manufacturer] = await promiseHandler(ManufacturerService.createManufacturer(args));
  if (addError) return res.json(returnError(addError));

  return res.json({
    status: true,
    manufacturer,
  });
};

const removeManufacturer = async (req, res, next) => {
  const { manufacturerId } = req.query;

  const [removeErr] = await promiseHandler(ManufacturerService.removeManufacturer(manufacturerId));
  if (removeErr) return res.json(returnError(removeErr));

  return res.json({
    status: true,
    message: `${manufacturerId} idsine sahip üretici başarılı bir şekilde silindi.`,
  });
};

const getManufacturers = async (req, res, next) => {
  const { name, skip, limit, id } = req.query;

  let filter = {};
  if (id && name) filter._id = id;
  else if (name) filter.name = name;
  else if (id) filter._id = id;

  const options = setLimitSkip(skip, limit);

  const [getErr, manufacturersAndCount] = await promiseHandler(ManufacturerService.getManufacturers(filter, options));
  if (getErr) return res.json(returnError(getErr));

  return res.json({
    status: true,
    ...manufacturersAndCount,
  });
};

module.exports = {
  addManufacturer,
  removeManufacturer,
  getManufacturers,
};
