const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 8080;
const api = require("./routes/api");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", api);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
