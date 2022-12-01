const userControllers = require("../Controllers/users.controllers");
const commentsControllers = require("../Controllers/comments.controllers");
const blogControllers = require("../Controllers/blogs.controllers");
const newsControllers = require("../Controllers/news.controllers");
const passwordControllers = require("../Controllers/password.controllers");
const translateControllers = require("../Controllers/translator.controllers");
const contactInterviewExperiencesControllers = require("../Controllers/contactInterviewExperiences.controllers");
const askQuestionControllers = require("../Controllers/askQuestion.controllers");
const jobsDataControllers = require("../Controllers/jobsData.controllers");
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

router.post("/ask-question", bodyParser, askQuestionControllers.addQuestion);
router.post("/add-comment", bodyParser, commentsControllers.addComment);

router.get(
  "/reset-password",
  bodyParser,
  passwordControllers.validatePasswordResetToken
);
router.get("/blogsData", blogControllers.getAllBlogs);
router.get("/allqna", askQuestionControllers.getAllQuestions);
router.get("/news", bodyParser, newsControllers.getNews);
router.get(
  "/getComments",
  bodyParser,
  commentsControllers.getAllCommentsForTitle
);
router.get("/getJobsData", bodyParser, jobsDataControllers.getJobsData);

router.patch("/reset-password", bodyParser, passwordControllers.resetPassword);
router.patch(
  "/set-achievements-and-skills",
  bodyParser,
  userControllers.setAchievementsAndSkills
);
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
