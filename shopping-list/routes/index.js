const router = require("express").Router();

const SLController = require("../controllers");

router.get("/", SLController.getShoppingLists);
router.post("/", SLController.createShoppingList);
router.delete("/", SLController.deleteShoppingList);
router.patch("/", SLController.updateShoppingList);

module.exports = router;
