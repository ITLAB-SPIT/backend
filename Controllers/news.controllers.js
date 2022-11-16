require("dotenv").config();
const axios = require("axios");
const getNews = async (req, res) => {
  try {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=technology&apiKey=${process.env.NEWS_API_ACCESS_KEY}`
      )
      .then(function (response) {
        // console.log("response.data.articles");
        // console.log(response.data.articles.slice(0, 10));
        return res.status(200).json(response.data.articles.slice(0, 10));
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { getNews };
