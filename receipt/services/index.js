const { ReceiptModel } = require("../models");

const createReceipt = async (args) => {
  return await ReceiptModel.create(args);
};

const removeReceipt = async (receiptId) => {
  return await ReceiptModel.findByIdAndDelete(receiptId).exec();
};

const getReceipts = async (filter, options) => {
  const receipts = await ReceiptModel.find(filter, null, options);
  const count = await ReceiptModel.countDocuments(filter);

  return { receipts, count };
};

const getReceiptById = async (receiptId) => {
  return await ReceiptModel.findById(receiptId);
};

const getReceiptByBarcode = async (barcode) => {
  return await ReceiptModel.findOne({ barcode });
};

module.exports = {
  createReceipt,
  removeReceipt,
  getReceipts,
  getReceiptById,
  getReceiptByBarcode,
};
