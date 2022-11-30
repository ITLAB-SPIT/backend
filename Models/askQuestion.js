const mongoose = require("mongoose");

const askQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
  },
  tags: { type: String, required: true },
  userImageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
  answers: { type: [String], default: [] },
});

module.exports = mongoose.model("AskQuestion", askQuestionSchema);
