require("dotenv").config();
const AskQuestion = require("../models/AskQuestion");

const addQuestion = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "User created successfully.";
  try {
    const { title, desc, name, email, tags, userImageUrl } = req.body;
    AskQuestion.init();
    response = await AskQuestion.create({
      title: title,
      desc: desc,
      name: name,
      email: email,
      tags: tags,
      userImageUrl: userImageUrl,
    });

    return res.status(resStatusCode).json({
      message: resMessage,
    });
  } catch (error) {
    resStatusCode = 500;
    resMessage = "An unknown error occurred.";
    console.log(error);
    return res.status(resStatusCode).json({
      message: resMessage,
    });
  }
};

const getAllQuestions = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "All questions fetched successfully.";
  try {
    AskQuestion.init();
    response = await AskQuestion.find();
    return res.status(resStatusCode).json({
      message: resMessage,
      questions: response,
    });
  } catch (error) {
    resStatusCode = 500;
    resMessage = "An unknown error occurred.";
    console.log(error);
    return res.status(resStatusCode).json({
      message: resMessage,
    });
  }
};

module.exports = {
  addQuestion,
  getAllQuestions,
};
