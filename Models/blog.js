const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
  },
  tags: { type: String, required: true },
  blogData: {
    type: String,
    required: true,
    unique: [true, "That blog already exists."],
  },
  bannerImage: { type: String, required: true },
  userImageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
