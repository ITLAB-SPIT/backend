const userControllers = require("../Controllers/users.controllers");
const passwordControllers = require("../Controllers/password.controllers");
const bodyParser = require("body-parser").json();
const router = require("express").Router();

router.post("/signup", bodyParser, userControllers.userRegister);
router.post("/signupauth", bodyParser, userControllers.userRegisterAuth);
router.post("/login", bodyParser, userControllers.userLogin);
router.post("/loginauth", bodyParser, userControllers.userLoginAuth);
router.post("/forgot-password", bodyParser, passwordControllers.forgotPassword);
router.get(
  "/reset-password",
  bodyParser,
  passwordControllers.validatePasswordResetToken
);
router.post("/reset-password", bodyParser, passwordControllers.resetPassword);

module.exports = router;
