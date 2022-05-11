const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const authServiceInstance = new authService();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.send("Auth");
});

router.get("/login", (req, res, next) => {
  res.send("Failure Login.");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.send(req.user);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.send('Logged out.');
});

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await authServiceInstance.createUser(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await authServiceInstance.deleteUser(id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
