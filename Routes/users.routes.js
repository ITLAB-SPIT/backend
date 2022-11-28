const userControllers = require("../Controllers/users.controllers");
const blogControllers = require("../Controllers/blogs.controllers");
const newsControllers = require("../Controllers/news.controllers");
const passwordControllers = require("../Controllers/password.controllers");
const translateControllers = require("../Controllers/translator.controllers");
const contactInterviewExperiencesControllers = require("../Controllers/contactInterviewExperiences.controllers");
const bodyParser = require("body-parser").json({ limit: "50mb" });
const router = require("express").Router();

router.post("/signup", bodyParser, userControllers.userRegister);
router.post("/signupauth", bodyParser, userControllers.userRegisterAuth);
router.post("/login", bodyParser, userControllers.userLogin);
router.post("/loginauth", bodyParser, userControllers.userLoginAuth);
router.post("/forgot-password", bodyParser, passwordControllers.forgotPassword);
router.post("/create-blog", bodyParser, blogControllers.createBlog);
router.post("/translate", bodyParser, translateControllers.translate);
router.post(
  "/contact-interview-experiences",
  bodyParser,
  contactInterviewExperiencesControllers.addQuery
);
router.post(
  "/news-subscription",
  bodyParser,
  contactInterviewExperiencesControllers.newsSubscription
);

router.get(
  "/reset-password",
  bodyParser,
  passwordControllers.validatePasswordResetToken
);
router.get("/blogsData", blogControllers.getAllBlogs);
router.get("/news", bodyParser, newsControllers.getNews);

router.patch("/reset-password", bodyParser, passwordControllers.resetPassword);
router.patch(
  "/update-prof-info",
  bodyParser,
  userControllers.updateProfessionalInfo
);
router.patch(
  "/update-user-info",
  bodyParser,
  userControllers.updateBasicUserInfo
);

router.patch(
  "/reset-password-setting",
  bodyParser,
  passwordControllers.resetPasswordSetting
);

// router.put("/forgot-password", bodyParser, passwordControllers.forgotPassword);
// router.put("/create-blog", bodyParser, blogControllers.createBlog);

// router.delete("/delete-user", bodyParser, userControllers.deleteUser);
router.delete("/delete-blog", bodyParser, blogControllers.deleteBlog);

module.exports = router;
