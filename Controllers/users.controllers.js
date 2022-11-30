const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2"); // argon is used to hash the password
const { getAllBlogTitles } = require("./blogs.controllers");
require("dotenv").config();

const generateAccessToken = (email) => {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "1800s" });
};

const userRegister = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "User created successfully.";
  try {
    const { firstname, lastname, email, password } = req.body;
    User.init();
    response = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    const token = generateAccessToken({ email: email });
    const blogTitles = await getAllBlogTitles();
    return res.status(resStatusCode).json({
      message: resMessage,
      token: token,
      blogTitles: blogTitles,
    });
  } catch (error) {
    if (error.code === 11000) {
      resStatusCode = 409;
      resMessage = "An account with that email already exists.";
    } else if (error.name === "ValidationError") {
      resStatusCode = 422;
      resMessage = "Required fields are missing.";
    } else {
      resStatusCode = 500;
      resMessage = "An unknown error occurred.";
    }

    return res.status(resStatusCode).json({
      message: resMessage,
      token: "",
    });
  }
};

const userRegisterAuth = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "User created successfully.";

  try {
    User.init();
    const { name, email, image } = req.body;
    const [firstname, lastname] = name.split(" ");
    const token = generateAccessToken({ email: email });

    response = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: "",
      image: image,
    });
    const blogTitles = await getAllBlogTitles();

    return res.status(resStatusCode).json({
      message: resMessage,
      token: token,
      blogTitles: blogTitles,
    });
  } catch (error) {
    resStatusCode = 500;
    resMessage = "An unknown error occurred.";

    if (error.code === 11000) {
      resStatusCode = 200;
      resMessage = "User logged in successfully.";
    } else if (error.name === "ValidationError") {
      resStatusCode = 422;
      resMessage = "Required fields are missing.";
    }

    return res.status(resStatusCode).json({ message: resMessage, token: "" });
  }
};

const userLogin = async (req, res) => {
  try {
    User.init();
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", token: "" });
    }

    if (await argon2.verify(user.password, password)) {
      // password match
      const token = generateAccessToken({ email: email });
      const blogTitles = await getAllBlogTitles();
      return res.status(200).json({
        message: "Login success.",
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        token: token,
        tag: user.tag,
        blogTitles: blogTitles,
        linkedinUrl: user.linkedinUrl,
        githubUrl: user.githubUrl,
        about: user.about,
        workExperience: user.workExperience,
        currentlyWorkingAt: user.currentlyWorkingAt,
        profession: user.profession,
        yearsOfExperience: user.yearsOfExperience,
        resumeUrl: user.resumeUrl,
        fieldOfExpertise: user.fieldOfExpertise,
        skills: user.skills,
        hackathonWins: user.hackathonWins,
        problemsSolved: user.problemsSolved,
        projects: user.projects,
        codechefRating: user.codechefRating,
        leetcodeRating: user.leetcodeRating,
      });
    } else {
      // password did not match
      console.log("Password didnt match.");
      return res
        .status(401)
        .json({ message: "Invalid credentials.", token: "" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An unknown error occurred.", token: "" });
  }
};

const userLoginAuth = async (req, res) => {
  try {
    User.init();
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    const token = generateAccessToken({ email: email });
    if (!user) {
      await userRegisterAuth(req, res);
    }
    const blogTitles = await getAllBlogTitles();
    return res.status(200).json({
      message: "Login success.",
      token: token,
      blogTitles: blogTitles,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      resStatusCode = 422;
      resMessage = "Required fields are missing.";
    } else {
      resStatusCode = 500;
      resMessage = "An unknown error occurred.";
    }

    return res.status(resStatusCode).json({ message: resMessage, token: "" });
  }
};

const updateBasicUserInfo = async (req, res) => {
  try {
    User.init();
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden." });
      } else {
        console.log("in");
        const { firstname, lastname, imageUrl, tag } = req.body;
        const email = decoded.email;
        await User.updateOne(
          { email: email },
          {
            firstname: firstname,
            lastname: lastname,
            image: imageUrl,
            tag: tag,
          }
        );
        return res
          .status(200)
          .json({ message: "User info updated successfully." });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An unknown error occurred." });
  }
};

const updateProfessionalInfo = async (req, res) => {
  try {
    User.init();
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Forbidden." });
      } else {
        const {
          currentlyWorkingAt,
          linkedinUrl,
          githubUrl,
          about,
          workExperience,
          profession,
        } = req.body;
        const email = decoded.email;
        await User.updateOne(
          { email: email },
          {
            linkedinUrl: linkedinUrl,
            githubUrl: githubUrl,
            about: about,
            workExperience: workExperience,
            currentlyWorkingAt: currentlyWorkingAt,
            profession: profession,
          }
        );
        return res.status(200).json({ message: "User info updated." });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An unknown error occurred." });
  }
};

const setAchievementsAndSkills = async (req, res) => {
  try {
    User.init();
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden." });
      } else {
        const {
          yearsOfExperience,
          resumeUrl,
          fieldOfExpertise,
          skills,
          hackathonWins,
          problemsSolved,
          projects,
          codechefRating,
          leetcodeRating,
        } = req.body;
        const email = decoded.email;
        await User.updateOne(
          { email: email },
          {
            yearsOfExperience: yearsOfExperience,
            resumeUrl: resumeUrl,
            fieldOfExpertise: fieldOfExpertise,
            skills: skills,
            hackathonWins: hackathonWins,
            problemsSolved: problemsSolved,
            projects: projects,
            codechefRating: codechefRating,
            leetcodeRating: leetcodeRating,
          }
        );
        return res.status(200).json({ message: "User info updated." });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An unknown error occurred." });
  }
};

module.exports = {
  userRegister,
  userRegisterAuth,
  userLogin,
  userLoginAuth,
  updateBasicUserInfo,
  updateProfessionalInfo,
  setAchievementsAndSkills,
};
