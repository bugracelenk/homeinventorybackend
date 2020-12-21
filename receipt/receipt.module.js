const validFields = ["name", "description", "items", "totalPrice", "barcode", "location", "addedBy"];
const validQueries = ["name", "barcode", "totalPriceLess", "totalPriceGreater", "location", "addedBy", "items"];

module.exports = { validFields, validQueries };
