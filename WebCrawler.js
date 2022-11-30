// const axios = require("axios");
// const cheerio = require("cheerio");
// const pokemonData = [];
// async function main(maxPages = 1) {
//   // initialized with the first webpage to visit
//   // const paginationURLsToVisit = ["https://scrapeme.live/shop"];
//   const paginationURLsToVisit = [
//     "https://www.linkedin.com/jobs/?originalSubdomain=in",
//   ];
//   const visitedURLs = [];

//   const productURLs = new Set();

//   // iterating until the queue is empty
//   // or the iteration limit is hit
//   while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
//     // the current webpage to crawl
//     const paginationURL = paginationURLsToVisit.pop();

//     // retrieving the HTML content from paginationURL
//     const pageHTML = await axios.get(paginationURL);

//     // adding the current webpage to the
//     // web pages already crawled
//     visitedURLs.push(paginationURL);
//     console.log(pageHTML.data);
//     // initializing cheerio on the current webpage
//     const $ = cheerio.load(pageHTML.data);

//     // retrieving the pagination URLs
//     $(".page-numbers a").each((index, element) => {
//       const paginationURL = $(element).attr("href");

//       // adding the pagination URL to the queue
//       // of web pages to crawl, if it wasn't yet crawled
//       if (
//         !visitedURLs.includes(paginationURL) &&
//         !paginationURLsToVisit.includes(paginationURL)
//       ) {
//         paginationURLsToVisit.push(paginationURL);
//       }
//     });

//     // retrieving the product URLs
//     $("li.product a.woocommerce-LoopProduct-link").each((index, element) => {
//       const productURL = $(element).attr("href");
//       productURLs.add(productURL);
//     });
//   }

//   // logging the crawling results
//   console.log([...productURLs]);

//   for (const productURL of productURLs) {
//     const productHTML = await axios.get(productURL);
//     const $ = cheerio.load(productHTML.data);
//     // break;
//     const productTitle = $("h1.product_title").text();
//     const productPrice = $(".woocommerce-Price-amount")
//       .text()
//       .substr(6, 8)
//       .substr(0, 2);
//     const productDescription = $(
//       ".woocommerce-product-details__short-description"
//     ).text();
//     const productImageUrl = $(".woocommerce-product-gallery__image img").attr(
//       "src"
//     );
//     console.log(productImageurl);
//     break;
//   }

//   // use productURLs for scraping purposes...
// }

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((e) => {
//     // logging the error message
//     console.error(e);

//     process.exit(1);
//   });

// main();

// const axios = require("axios");
// const cheerio = require("cheerio");
// const pokemonData = [];
// async function main(maxPages = 1) {
//   // initialized with the first webpage to visit
//   const paginationURLsToVisit = [
//     "https://www.naukri.com/data-analyst-jobs-in-thane",
//   ];
//   const visitedURLs = [];

//   const productURLs = new Set();

//   // iterating until the queue is empty
//   // or the iteration limit is hit
//   while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
//     // the current webpage to crawl
//     const paginationURL = paginationURLsToVisit.pop();

//     // retrieving the HTML content from paginationURL
//     const pageHTML = await axios.get(paginationURL);
//     // console.log(pageHTML.status);
//     // adding the current webpage to the
//     // web pages already crawled
//     console.log(pageHTML.data);
//     visitedURLs.push(paginationURL);

//     // initializing cheerio on the current webpage
//     const $ = cheerio.load(pageHTML.data);

//     // retrieving the pagination URLs
//     // $(".css-1m4cuuf div").each((index, element) => {
//     //   const paginationURL = $(element).attr("href");

//     //   // adding the pagination URL to the queue
//     //   // of web pages to crawl, if it wasn't yet crawled
//     //   if (
//     // !visitedURLs.includes(paginationURL) &&
//     // !paginationURLsToVisit.includes(paginationURL)
//     //   ) {
//     //     paginationURLsToVisit.push(paginationURL);
//     //   }
//     // });

//     // retrieving the product URLs
//     $("body article.jobTuple").each((index, element) => {
//       console.log(element);
//       const productURL = $(element).attr("href");
//       console.log(productURL);
//       productURLs.add(productURL);
//     });
//   }

//   // logging the crawling results
//   // console.log([...productURLs]);

//   // for (const productURL of productURLs) {
//   //   const productHTML = await axios.get(productURL);
//   //   const $ = cheerio.load(productHTML.data);
//   //   // break;
//   //   const productTitle = $("h1.product_title").text();
//   //   const productPrice = $(".woocommerce-Price-amount")
//   //     .text()
//   //     .substr(6, 8)
//   //     .substr(0, 2);
//   //   const productDescription = $(
//   //     ".woocommerce-product-details__short-description"
//   //   ).text();
//   //   const productImageUrl = $(".woocommerce-product-gallery__image img").attr(
//   //     "src"
//   //   );
//   //   console.log(productImageurl);
//   //   break;
//   // }

//   // use productURLs for scraping purposes...
// }

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((e) => {
//     // logging the error message
//     console.error(e);

//     process.exit(1);
//   });

// main();
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
  // initialized with the first webpage to visit
  // const paginationURLsToVisit = ["https://scrapeme.live/shop"];

  const paginationURLsToVisit = [
    "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0",
  ];
  const visitedURLs = [];

  const productURLs = new Set();

  // iterating until the queue is empty
  // or the iteration limit is hit
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
  console.log(jobsData.length);
  // // addMultipleJobs(jobsData);
  // let datas = [];
  // for (let i = 0; i < jobsData.length; i++) {
  //   datas.push(jobsData[i]);
  //   if (i == 10) {
  //     break;
  //   }
  // }
  // datas = jobsData[0];
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
