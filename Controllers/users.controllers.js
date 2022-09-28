const User = require("../Models/user");
const argon2 = require("argon2");
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
    return res.status(resStatusCode).send(resMessage);
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
    return res.status(resStatusCode).send(resMessage);
  }
};

const userLogin = async (req, res) => {
  try {
    User.init();
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }, { password: 1 });
    if (!user) {
      return res.status(401).send("Invalid credentials.");
    }

    if (await argon2.verify(user.password, password)) {
      // password match
      return res.status(200).send("Login success.");
    } else {
      // password did not match
      console.log("Password didnt match.");
      return res.status(401).send("Invalid credentials.");
    }
  } catch (error) {
    return res.status(500).send("An unknown error occurred.");
  }
};

module.exports = { userRegister, userLogin };
