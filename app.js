const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/users.routes");
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(router);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
// app.use(errorController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
