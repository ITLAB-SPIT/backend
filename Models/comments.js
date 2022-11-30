const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  qnaTitle: { type: String, required: true },
  desc: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
  },
  userImageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
