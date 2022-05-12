const express = require("./express");
const passport = require("./passport");
const swagger = require("./swagger");

module.exports = (app) => {
  express(app);
  passport(app);
  swagger(app);
};
