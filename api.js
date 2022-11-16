// // Imports the Google Cloud client library
// const { Translate } = require("@google-cloud/translate").v2;

// // Creates a client
// const translate = new Translate();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const text = "The text to translate, e.g. Hello, world!";
// const target = "ru";

// async function translateText() {
//   // Translates the text into the target language. "text" can be a string for
//   // translating a single piece of text, or an array of strings for translating
//   // multiple texts.
//   let [translations] = await translate.translate(text, target);
//   translations = Array.isArray(translations) ? translations : [translations];
//   console.log("Translations:");
//   translations.forEach((translation, i) => {
//     console.log(`${text[i]} => (${target}) ${translation}`);
//   });
// }

// translateText();
require("dotenv").config();
// console.log(process.env.GOOGLE_TRANSLATION_API_KEY);
// const qs = require("qs");
// const axios = require("axios");
// const fetchTranslation = async (queryObject) => {
//   const options = {
//     method: "POST",
//     url: "https://translation.googleapis.com/language/translate/v2",
//     params: {
//       q: "I am robot.",
//       target: "fr",
//       source: "en",
//       key: process.env.GOOGLE_TRANSLATION_API_KEY,
//     },
//   };
//   const language = await axios(options);
//   return language.data;
// };

// fetchTranslation().then((data) => console.log(data.data.translations));

var api = "YOUR_GOOGLE_TRANSLATOR_KEY_HERE";
var googleTranslate = require("google-translate")(
  process.env.GOOGLE_TRANSLATION_API_KEY
);

var text = [
  "I am using google translator to convert this text to spanish",
  "shreyash is awesome as ususal",
];
console.log("English :>", text);
googleTranslate.translate(text, "es", function (err, translation) {
  console.log("Spanish :>", translation.translatedText);
});
