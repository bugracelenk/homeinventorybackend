const { ShoppingListModel } = require("../models");

const createShoppingList = async (args) => {
  return await ShoppingListModel.create(args);
};

const updateShoppingList = async (listId, args) => {
  return await ShoppingListModel.findByIdAndUpdate(listId, args).exec();
};

const getShoppingLists = async (filter, options) => {
  const results = await ShoppingListModel.find(filter, null, options)
    .populate({ path: "createdBy", model: "User", select: "name surName profileImage _id" })
    .populate({ path: "receipt", model: "Receipt", select: "_id barcode name" })
    .populate({
      path: "items",
      model: "Item",
      select:
        "_id name description itemImage itemType manufacturer purchaseLocation price expirationDate purchaseDate quantity finished barcode lastUsed",
      populate: [
        {
          path: "itemType",
          model: "ItemType",
          select: "_id name",
        },
        {
          path: "manufacturer",
          model: "Manufacturer",
          select: "name logoUri",
        },
        {
          path: "purchaseLocation",
          model: "Location",
          select: "name _id",
          populate: {
            path: "type",
            model: "LocationType",
            select: "name _id",
          },
        },
        {
          path: "addedBy",
          model: "User",
          select: "name surName profileImage _id",
        },
      ],
    });

  const count = await ShoppingListModel.countDocuments(filter);

  return { count, results };
};

const deleteShoppingList = async (listId) => {
  return await ShoppingListModel.findByIdAndDelete(listId);
};

module.exports = {
  createShoppingList,
  getShoppingLists,
  updateShoppingList,
  deleteShoppingList,
};
