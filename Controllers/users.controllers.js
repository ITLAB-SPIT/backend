const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
const argon2 = require("argon2");
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
    //cookie generating from server
    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1800,
      path: "/",
    });
    //cookie setting in response, so that it can be stored in browser
    res.setHeader("Set-Cookie", serialised);

    return res.status(resStatusCode).json({
      message: resMessage,
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
    });
  }
};

const userRegisterAuth = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "User created successfully.";

  try {
    const { name, email, image } = req.body;
    const [firstname, lastname] = name.split(" ");

    User.init();
    response = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: "",
      image: image,
    });

    return res.status(resStatusCode).json({
      message: resMessage,
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
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (await argon2.verify(user.password, password)) {
      // password match
      const token = generateAccessToken({ email: email });
      //cookie generating from server
      const serialised = serialize("OursiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1800,
        path: "/",
      });
      //cookie setting in response, so that it can be stored in browser
      res.setHeader("Set-Cookie", serialised);

      return res.status(200).json({
        message: "Login success.",
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
      });
    } else {
      // password did not match
      console.log("Password didnt match.");
      return res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An unknown error occurred." });
  }
};

const userLoginAuth = async (req, res) => {
  try {
    User.init();
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      await userRegisterAuth(req, res);
    }

    return res.status(200).json({ message: "Login success." });
  } catch (error) {
    if (error.name === "ValidationError") {
      resStatusCode = 422;
      resMessage = "Required fields are missing.";
    } else {
      resStatusCode = 500;
      resMessage = "An unknown error occurred.";
    }

    return res.status(resStatusCode).json({ message: resMessage });
  }
};

module.exports = { userRegister, userRegisterAuth, userLogin, userLoginAuth };
