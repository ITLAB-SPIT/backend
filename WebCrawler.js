const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const { addMultipleJobs } = require("./Controllers/jobsData.controllers");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const jobsData = [];
async function main(maxPages = 1) {
  const paginationURLsToVisit = [
    "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0",
  ];
  const visitedURLs = [];
  const productURLs = new Set();
  while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
    // the current webpage to crawl
    const paginationURL = paginationURLsToVisit.pop();

    // retrieving the HTML content from paginationURL
    const pageHTML = await axios.get(paginationURL);
    visitedURLs.push(paginationURL);
    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);
    $("a.base-card__full-link").each((index, element) => {
      const productURL = $(element).attr("href");

      productURLs.add(productURL);
    });
  }

  for (const productURL of productURLs) {
    const productHTML = await axios.get(productURL);
    const $ = cheerio.load(productHTML.data);
    const jobTitle = getPureString(
      $("h1.top-card-layout__title").text()
    ).trim();
    const jobProviderName = getPureString(
      $("span.topcard__flavor > a").text()
    ).trim();
    const jobPlace = getPureString(
      $("span.topcard__flavor--bullet").text()
    ).trim();
    const applyLink = $("a.apply-button").attr("href");
    let description = getPureString(
      $("div.show-more-less-html__markup").text().trim()
    );
    if (description.length > 300) {
      description = description.substr(0, 300);
    }
    const lists = $("li.description__job-criteria-item");
    const tagsPair = [];
    lists.each((index, element) => {
      const list = $(element).text();

      list
        .trim()
        .split("\n")
        .map((item) => {
          if (item.trim() !== "") {
            tagsPair.push(getPureString(item.trim()));
          }
        });
    });
    jobsData.push({
      jobTitle: jobTitle,
      jobProviderName: jobProviderName,
      jobPlace: jobPlace,
      applyLink: applyLink,
      description: description,
      tagsPair: tagsPair,
    });
  }
  await addMultipleJobs(jobsData)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPureString(str) {
  return str.replace(/(\r\n|\n|\r)/gm, "");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    // logging the error message
    console.error(e);

    process.exit(1);
  });
