const promiseHandler = require("../../utilities/promiseHandler");
const { validateBody } = require("../../utilities/validateQuery");
const setLimitSkip = require("../../utilities/setLimitSkip");
const { returnError } = require("../../utilities");

const { validFields, validQueries } = require("../receipt.module");

const ReceiptService = require("../services");

const createReceipt = async (req, res, next) => {
  const args = await validateBody(Object.keys(req.body), req.body, validFields);
  if (args.error) return res.json(returnError(args.error));

  const [addError, receipt] = await promiseHandler(ReceiptService.createReceipt(args));
  if (addError) return res.json(returnError(addError));

  return res.json({
    status: true,
    receipt,
  });
};

const getReceipts = async (req, res, next) => {
  const { skip, limit } = req.query;
  const filter = await validateQuery(Object.keys(req.query), req.query, validQueries, ["skip", "limit"]);

  const options = await setLimitSkip(skip, limit);

  const [getErr, receiptsAndCount] = await promiseHandler(ReceiptService.getReceipts(filter, options));
  if (getErr) return res.json(returnError(getErr));

  return res.json({
    status: true,
    ...receiptsAndCount,
  });
};

const deleteReceipt = async (req, res, next) => {
  const { receiptId } = req.query;
  if (!receiptId) return res.json(returnError("Fiş idsi girilmedi!"));

  const [deleteErr] = await promiseHandler(ReceiptService.removeReceipt(receiptId));
  if (deleteErr) return res.json(returnError(deleteErr));

  return res.json({
    status: true,
    message: `${receiptId} idsine bağlı fiş başarılı bir şekilde silindi.`,
  });
};

module.exports = {
  createReceipt,
  deleteReceipt,
  getReceipts,
};
