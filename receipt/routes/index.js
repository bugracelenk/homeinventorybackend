const router = require("express").Router();

const ReceiptController = require("../controllers");

router.get("/", ReceiptController.getReceipts);
router.post("/", ReceiptController.createReceipt);
router.delete("/", ReceiptController.deleteReceipt);

module.exports = router;
