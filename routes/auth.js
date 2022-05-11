const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();
const passport = require("passport");

router.get("/login", (req, res, next) => {
  res.send(req.session.messages);
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.status(201).send(req.user);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(201).send("Logged out.");
});

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await AuthServiceInstance.createUser(data);
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
