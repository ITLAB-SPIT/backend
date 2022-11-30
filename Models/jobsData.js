const mongoose = require("mongoose");

const jobsDataSchema = new mongoose.Schema({
  jobTitle: { type: String },
  jobProviderName: { type: String },
  jobPlace: { type: String },
  applyLink: { type: String },
  description: { type: String },
  tagsPair: { type: [String] },
});

module.exports = mongoose.model("jobsData", jobsDataSchema);
