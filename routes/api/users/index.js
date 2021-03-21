const express = require("express");
const router = express.Router();
const validate = require("./validation");
const UsersController = require("../../../controlers/userControler");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { validateUploadAvatar } = require("./validation");

router.post("/registration", UsersController.reg);
router.post("/login", UsersController.login);
router.post("/logout", guard, UsersController.logout);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  //   [guard, upload.single("avatar"), () => {}]

  UsersController.avatars
);

router.get("/verify/:token", UsersController.verify);

module.exports = router;
