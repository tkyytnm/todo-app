const express = require("express");
const app = express();
const loaders = require("./src/loaders");
const routes = require("./src/routes");
const path = require("path");

loaders(app);
routes(app);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err);
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
