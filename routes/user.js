const express = require("express");
const router = express.Router();
const UserService = require("../services/userService");
const UserServiceInstance = new UserService();

router.put("/profile", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await UserServiceInstance.updateProfile(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.put("/password", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await UserServiceInstance.updatePassword(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    const response = await UserServiceInstance.deleteUser(id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
