const express = require("./express");
const passport = require("./passport");

module.exports = (app) => {
  express(app);
  passport(app);
};
