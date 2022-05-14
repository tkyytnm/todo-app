const express = require("express");
const app = express();
const loaders = require("./src/loaders");
const routes = require("./src/routes");

loaders(app);
routes(app);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err);
});

module.exports = app;
