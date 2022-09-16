const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/users.routes");

require("dotenv").config();

app.use(cors());
app.use(router);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
