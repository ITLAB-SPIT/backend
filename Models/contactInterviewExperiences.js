const mongoose = require("mongoose");

const contactInterviewExperiencesSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Enter an email address."],
  },
  phone: { type: String },
  message: { type: String, required: true },
});

module.exports = mongoose.model(
  "ContactInterviewExperience",
  contactInterviewExperiencesSchema
);
