const router = require("express").Router();

const UserController = require("../controllers");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/forgot-password", UserController.forgotPassword);
router.post("/change-password", UserController.changePassword);

module.exports = router;
