const router = require("express").Router();

const ManufacturerControllers = require("../controllers");

router.get("/", ManufacturerControllers.getManufacturers);
router.post("/", ManufacturerControllers.addManufacturer);
router.delete("/", ManufacturerControllers.removeManufacturer);

module.exports = router;
