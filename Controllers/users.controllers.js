const User = require("../Models/user");

const userRegister = async (req, res) => {
  const { name, password } = req.body;
  console.log("Signup got called.");
  User.init();
  const response = await User.create({ name: name, password: password });
};

const userLogin = async (req, res) => {
  console.log(req.body);
  User.init();
  console.log("Login got called.");
};

module.exports = { userRegister, userLogin };
