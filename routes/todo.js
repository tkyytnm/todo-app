const express = require("express");
const router = express.Router();
const ToDoService = require("../services/todoService");
const ToDoServiceInstance = new ToDoService();

router.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await ToDoServiceInstance.fetchToDosByUser(user_id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ToDoServiceInstance.createToDo(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ToDoServiceInstance.updateToDo(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    const response = await ToDoServiceInstance.deleteToDo(id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
