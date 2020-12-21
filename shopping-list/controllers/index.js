const promiseHandler = require("../../utilities/promiseHandler");
const { validateBody } = require("../../utilities/validateQuery");
const setLimitSkip = require("../../utilities/setLimitSkip");
const { returnError } = require("../../utilities");

const { validFields, validQueries } = require("../shopping-list.module");

const SLService = require("../services");

const createShoppingList = async (req, res, next) => {
  const args = await validateBody(Object.keys(req.body), req.body, validFields, false);
  if (args.error) return res.json(returnError(args.error));

  const [createErr, createdList] = await promiseHandler(SLService.createShoppingList(args));
  if (createErr) return res.json(returnError(createErr));

  return res.json({
    status: true,
    createdList,
  });
};

const updateShoppingList = async (req, res, next) => {
  const { items, bought, receipt, totalPrice, name } = req.body;
  const { listId } = req.query;
  if (!listId) return res.json(returnError("Liste idsi girilmedi."));

  const args = { $set: {} };

  if (items) args.$set = { ...args.$set, items };
  if (bought) args.$set = { ...args.$set, bought };
  if (receipt) args.$set = { ...args.$set, receipt };
  if (totalPrice) args.$set = { ...args.$set, items };
  if (name) args.$set = { ...args.$set, name };

  const [updateErr, updatedList] = await promiseHandler(SLService.updateShoppingList(listId, args));
  if (updateErr) return res.json(returnError(updateErr));

  return res.json({
    status: true,
    updatedList,
  });
};

const getShoppingLists = async (req, res, next) => {
  const filter = await validateQuery(Object.keys(req.query), req.query, validQueries, ["skip", "limit"]);
  const options = await setLimitSkip(skip, limit);

  const [getErr, listsAndCount] = await promiseHandler(SLService.getShoppingLists(filter, options));
  if (getErr) return res.json(returnError(getErr));

  return res.json({
    status: true,
    ...listsAndCount,
  });
};

const deleteShoppingList = async (req, res, next) => {
  const { listId } = req.query;
  if (!listId) return res.json(returnError("Liste idsi girilmedi."));

  const [deleteErr] = await promiseHandler(SLService.deleteShoppingList(listId));
  if (deleteErr) return res.json(returnError(deleteErr));

  return res.json({
    status: true,
    mesage: `${listId} idsine bağlı liste başarılı bir şekilde silindi.`,
  });
};

module.exports = {
  createShoppingList,
  deleteShoppingList,
  updateShoppingList,
  getShoppingLists,
};
