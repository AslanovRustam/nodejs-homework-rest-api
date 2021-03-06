const express = require("express");
const router = express.Router();
const validate = require("./validation");
const UsersController = require("../../../controlers/userControler");
const guard = require("../../../helpers/guard");

router.post("/registration", UsersController.reg);
router.post("/login", UsersController.login);
router.post("/logout", guard, UsersController.logout);

module.exports = router;
