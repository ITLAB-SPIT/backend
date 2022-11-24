require("dotenv").config();
var googleTranslate = require("google-translate")(
  process.env.GOOGLE_TRANSLATION_API_KEY
);

const translate = async (req, res) => {
  try {
    const data = req.body.data;
    var stringToTranslate = "";
    const dataArray = [];
    const translatedData = [];
    var stringToConvert = "";
    data.forEach((item) => {
      stringToConvert =
        stringToConvert + item.title + " :::: " + item.description + " :::: ";
    });
    var newData = [];
    googleTranslate.translate(
      stringToConvert,
      req.body.language,
      function (err, translation) {
        newData = translation.translatedText;
        var newData = newData.split("::::");
        var counter = 0;
        data.map((element, index) => {
          if (data[index].title !== "") {
            data[index].title = newData[counter];
            counter++;
          }
          if (data[index].description !== "") {
            data[index].description = newData[counter];
            counter++;
          }
        });
        return res.status(200).json(data);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { translate };
