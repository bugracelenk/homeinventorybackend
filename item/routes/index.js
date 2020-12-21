const router = require("express").Router();

const ItemController = require("../controllers");

router.get("/", ItemController.getItems);
router.get("/types", ItemController.getItemTypes);
router.get("/:id", ItemController.getItemById);
router.get("/barcode", ItemController.getItemByBarcode);
router.post("/", ItemController.createItem);
router.post("/types", ItemController.addItemType);
router.delete("/", ItemController.deleteItem);
router.patch("/", ItemController.updateItem);

module.exports = router;
