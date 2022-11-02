const userControllers = require("../Controllers/users.controllers");
const blogControllers = require("../Controllers/blogs.controllers");
const passwordControllers = require("../Controllers/password.controllers");
const bodyParser = require("body-parser").json({ limit: "50mb" });
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
router.post("/create-blog", bodyParser, blogControllers.createBlog);
router.get("/blogsData", blogControllers.getAllBlogs);
module.exports = router;
