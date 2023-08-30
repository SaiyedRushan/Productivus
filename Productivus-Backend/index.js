const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const api = require("./src/routes/api");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", api);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

module.exports = app;
