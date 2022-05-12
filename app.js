const express = require("express");
const app = express();
const loaders = require("./src/loaders");
const routes = require("./src/routes");

loaders(app);
routes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
