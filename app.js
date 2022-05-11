const express = require("express");
const app = express();
const loaders = require("./loaders/index");
const routes = require("./routes/index");

loaders(app);
routes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
