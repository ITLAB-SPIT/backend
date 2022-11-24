require("dotenv").config();
const ContactInterviewExperiences = require("../Models/contactInterviewExperiences");
const NewsSubscription = require("../Models/newsSubscription");
const nodemailer = require("nodemailer");

const addQuery = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Query generated succesfully.";
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    ContactInterviewExperiences.init();
    const response = await ContactInterviewExperiences.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      message: message,
      phone: phone,
    });

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
      subject: "Thank You for the feedback",
      text:
        "Thank you for your feedback. We will get back to you soon.\n\n" +
        "Regards,\n" +
        "Team Kakashi",
    };

    transporter.sendMail(mailOptions);

    return res.status(resStatusCode).json({
      message: resMessage,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    if (error.name === "ValidationError") {
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

const newsSubscription = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Subscribed succesfully.";
  try {
    const { email } = req.body;
    NewsSubscription.init();
    const response = await NewsSubscription.create({
      email: email,
    });

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
      subject: "Regarding subscription to our newsletter",
      text:
        "Welcome to team kakashi. We really appreciate you subcribing to our news letter." +
        "Regards,\n" +
        "Team Kakashi",
    };

    transporter.sendMail(mailOptions);

    return res.status(resStatusCode).json({
      message: resMessage,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    if (error.name === "ValidationError") {
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

module.exports = { addQuery, newsSubscription };
