const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const authServiceInstance = new authService();

router.get("/", (req, res, next) => {
  res.send("Auth");
});

router.post("/", async (req, res, next) => {
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
