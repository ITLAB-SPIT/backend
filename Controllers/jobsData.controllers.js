require("dotenv").config();
const JobsData = require("../models/jobsData");

const getJobsData = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "All questions fetched successfully.";
  try {
    JobsData.init();
    response = await JobsData.find();
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

const addMultipleJobs = async (jobs) => {
  try {
    JobsData.init();
    response = await JobsData.insertMany(jobs);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getJobsData,
  addMultipleJobs,
};
