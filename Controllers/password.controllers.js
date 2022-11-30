require("dotenv").config();
const User = require("../Models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const forgotPassword = async (req, res) => {
  let status = 200;
  let message = "Email sent successfully.";
  try {
    User.init();
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      //403 forbidden
      return res.status(403).send("User with this email does not exist.");
    }
    //crypto is a hashing package.
    const token = crypto.randomBytes(20).toString("hex");
    //no need to wait here
    //validating for 1 hour after the link is generated
    await User.updateOne(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: "shreyash.dhamane@spit.ac.in",
      to: email,
      subject: "Link To Reset Password",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `${process.env.CLIENT_URL}/forgot-password/set-new-password?token=${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    status = 500;
    message = "An unknown error occurred.";
  }
  return res.status(status).send(message);
};

const validatePasswordResetToken = async (req, res) => {
  try {
    User.init();
    const user = await User.findOne({
      resetPasswordToken: req.query.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else {
      res.status(200).send(user.email);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("An unknown error occurred.");
  }
};

const resetPassword = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Password updated successfully.";
  try {
    User.init();
    let { email, password } = req.body;
    password = await argon2.hash(password);
    await User.updateOne(
      {
        email: email,
      },
      { password: password }
    );
  } catch (error) {
    resStatusCode = 500;
    resMessage = "An unknown error occurred.";
  }
  return res.status(resStatusCode).send(resMessage);
};

const resetPasswordSetting = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Password updated successfully.";
  console.log("called");
  try {
    User.init();
    let { oldPassword, newPassword, token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("err in jwt");
        console.log(err);
        return res.status(403).send("Invalid token.");
      }
      console.log(1);
      const email = decoded.email;
      try {
        User.findOne({ email: email }, async (err, user) => {
          if (err) {
            console.log("err in user");
            console.log(err);
            return res
              .status(403)
              .send("User with given wmail doesnst exit.Invalid token.");
          }
          if (user) {
            const validPassword = await argon2.verify(
              user.password,
              oldPassword
            );
            if (!validPassword) {
              return res.status(403).send("Invalid password.");
            }
            newPassword = await argon2.hash(newPassword);
            await User.updateOne(
              {
                email: email,
              },
              { password: newPassword }
            );
          }
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send("An unknown error occurred.");
      }
    });
  } catch (error) {
    resStatusCode = 500;
    resMessage = "An unknown error occurred.";
  }
  return res.status(resStatusCode).send(resMessage);
};

module.exports = {
  forgotPassword,
  validatePasswordResetToken,
  resetPassword,
  resetPasswordSetting,
};
