const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");

const { connect } = require("./config/connection");
// const routes = require("./routes");

const PORT = process.env.PORT || 4000;

const app = express();

connect();

app.use(cors());
app.app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(compression());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
