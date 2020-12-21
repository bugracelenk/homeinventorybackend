const promiseHandler = require("../../utilities/promiseHandler");
const { validateQuery, validateBody } = require("../../utilities/validateQuery");
const setLimitSkip = require("../../utilities/setLimitSkip");
const { returnError } = require("../../utilities");

const { validQueries, validFields } = require("../item.module");

const ItemService = require("../services");

const createItem = async (req, res, next) => {
  const args = await validateBody(Object.keys(req.body), req.body, validFields);

  const { userId } = req.user;

  if (args.error) {
    return res.json({
      status: false,
      message: args.error,
    });
  }

  args.addedBy = userId;

  const [addItemErr, addedItem] = await promiseHandler(ItemService.createItem(args));

  if (addItemErr) {
    //TODO: ADD ERROR SERVICE

    return res.json(returnError(addItemErr));
  }

  return res.json({
    status: true,
    addedItem,
  });
};

const deleteItem = async (req, res, next) => {
  const { itemId } = req.query;

  const [deleteErr] = await promiseHandler(ItemService.removeItem(itemId));

  if (deleteErr) {
    return res.json(returnError(deleteErr));
  }

  return res.json({
    status: true,
    message: "Ürün kaldırıldı",
  });
};

const updateItem = async (req, res, next) => {
  const { itemId } = req.query;
  const updateOps = {};
  req.body.map((ops) => (updateOps[ops.propName] = ops.value));

  const [updateErr] = await promiseHandler(ItemService.updateItem(itemId, updateOps));

  if (updateErr) {
    return res.json(returnError(updateErr));
  }

  return res.json({
    status: true,
    message: "Ürün Güncellendi!",
  });
};

const getItemById = async (req, res, next) => {
  const { itemId } = req.params;

  if (!itemId) {
    return res.json(returnError("Ürün ID'si girilmedi!"));
  }

  const [getErr, item] = await promiseHandler(ItemService.getItemById(itemId));

  if (getErr) {
    return res.json(returnError(getErr));
  }

  return res.json({
    status: true,
    item,
  });
};

const getItems = async (req, res, next) => {
  const filter = await validateQuery(Object.keys(req.query), req.query, validQueries, ["limit, skip"]);

  const { skip, limit } = req.query;
  const { purchaseStartDate, purchaseEndDate, expirationStartDate, expirationEndDate } = filter;

  if (purchaseStartDate) {
    filter.purchaseDate = { ...!!filter.purchaseDate, $gte: purchaseStartDate };
    delete filter.purchaseStartDate;
  }

  if (purchaseEndDate) {
    filter.purchaseDate = { ...!!filter.purchaseDate, $lte: purchaseEndDate };
    delete filter.purchaseEndDate;
  }

  if (expirationStartDate) {
    filter.expirationDate = { ...!!filter.expirationDate, $gte: expirationStartDate };
    delete filter.expirationStartDate;
  }

  if (expirationEndDate) {
    filter.expirationDate = { ...!!filter.expirationDate, $gte: expirationEndDate };
    delete filter.expirationEndDate;
  }

  const options = await setLimitSkip(skip, limit);

  const [getErr, itemsAndCount] = await promiseHandler(ItemService.getItems(filter, options));

  if (getErr) {
    return res.json(returnError(getErr));
  }

  return res.json({
    status: true,
    ...itemsAndCount,
  });
};

const getItemByBarcode = async (req, res, next) => {
  const { barcode } = req.query;

  if (!barcode) {
    return res.json(returnError("Barkod girilmedi!"));
  }

  const [barcodeErr, item] = await promiseHandler(ItemService.getItemByBarcode(barcode));

  if (barcodeErr) {
    return res.json(returnError(barcodeErr));
  }

  return res.json({
    status: true,
    item,
  });
};

const addItemType = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.json(returnError("Ürün Tipi Girilmedi"));

  const [addTypeErr, addedType] = await promiseHandler(ItemService.addItemType(name));

  if (addTypeErr) return res.json(returnError(addTypeErr));

  return res.json({ status: true, addedType });
};

const getItemTypes = async (req, res, next) => {
  const { searchString, skip, limit } = req.query;

  let filter = {};
  const options = await setLimitSkip(skip, limit);

  if (searchString) filter.searchString = searchString;

  const [getErr, types] = await promiseHandler(ItemService.getItemTypes(filter, options));

  if (getErr) return res.json(returnError(getErr));

  return res.json({ status: true, types });
};

module.exports = {
  createItem,
  deleteItem,
  updateItem,
  getItemById,
  getItems,
  getItemByBarcode,
  addItemType,
  getItemTypes,
};
