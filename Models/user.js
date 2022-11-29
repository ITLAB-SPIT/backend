const mongoose = require("mongoose");

const argon2 = require("argon2");
// const userSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   name: String,
//   email: {
//     type: String,
//     lowercase: true,
//     match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?                  ^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
//   },
//   password: String,
//   phone_number: Number,
// });

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
    unique: [true, "That email address is taken."],
  },
  password: { type: String },
  image: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },
  about: { type: String },
  workExperience: { type: String },
  currentlyWorkingAt: { type: String },
  profession: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
  yearsOfExperience: { type: String },
  resumeUrl: { type: String },
  fieldOfExpertise: { type: String },
  skills: { type: [String], default: ["", "", "", ""] },
  hackathonWins: { type: String },
  problemsSolved: { type: String },
  projects: { type: String },
  codechefRating: { type: String },
  leetcodeRating: { type: String },
});

userSchema.pre("save", async function (next) {
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("User", userSchema);
