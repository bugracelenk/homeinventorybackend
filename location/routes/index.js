const router = require("express").Router();

const LocationController = require("../controllers");

router.get("/", LocationController.getLocations);
router.post("/", LocationController.createLocation);
router.get("/types", LocationController.getLocationTypes);
router.post("/types", LocationController.addLocationType);

module.exports = router;
