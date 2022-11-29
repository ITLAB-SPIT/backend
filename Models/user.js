const mongoose = require("mongoose");

const argon2 = require("argon2");
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
    unique: [true, "That email address is taken."],
  },
  tag: {
    type: String,
    default: "Speak Write Think",
  },
  password: { type: String },
  image: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },
  about: {
    type: String,
    default:
      "Student at Bhartiya Vidya Bhavans Sardar Patel Institute of Technology Munshi Nagar Andheri Mumbai",
  },
  workExperience: { type: String, default: "Give me job first" },
  currentlyWorkingAt: { type: String, default: "MySelf" },
  profession: { type: String, default: "Student" },
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
