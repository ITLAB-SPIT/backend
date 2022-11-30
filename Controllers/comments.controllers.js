require("dotenv").config();
const Comment = require("../models/comments");

const addComment = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Comment created succesfully.";
  try {
    const { qnaTitle, desc, name, email, userImageUrl } = req.body;
    Comment.init();
    response = await Comment.create({
      qnaTitle: qnaTitle,
      desc: desc,
      name: name,
      email: email,
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

const getAllCommentsForTitle = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "All comments fetched successfully.";
  try {
    Comment.init();
    const { qnaTitle } = req.query;
    response = await Comment.find({ qnaTitle: qnaTitle });
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
  addComment,
  getAllCommentsForTitle,
};
