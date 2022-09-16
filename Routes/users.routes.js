const userControllers = require("../Controllers/users.controllers");
const bodyParser = require("body-parser").json();
const router = require("express").Router();

router.post("/signup", bodyParser, userControllers.userRegister);
router.post("/login", bodyParser, userControllers.userLogin);

module.exports = router;
