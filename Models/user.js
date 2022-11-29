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
  linkedinUrl: { type: String, default: "NA" },
  githubUrl: { type: String, default: "NA" },
  about: {
    type: String,
    default:
      "Student at Bhartiya Vidya Bhavans Sardar Patel Institute of Technology Munshi Nagar Andheri Mumbai",
  },
  workExperience: { type: String, default: "NA" },
  currentlyWorkingAt: { type: String, default: "NA" },
  profession: { type: String, default: "NA" },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
  yearsOfExperience: { type: String, default: "NA" },
  resumeUrl: { type: String, default: "NA" },
  fieldOfExpertise: { type: String, default: "NA" },
  skills: { type: [String], default: ["NA", "NA", "NA", "NA"] },
  hackathonWins: { type: String, default: "NA" },
  problemsSolved: { type: String, default: "NA" },
  projects: { type: String, default: "NA" },
  codechefRating: { type: String, default: "NA" },
  leetcodeRating: { type: String, default: "NA" },
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
