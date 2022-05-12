const ToDoModel = require("../models/todo");
const ToDoModelInstance = new ToDoModel();

module.exports = class ToDoService {
  async fetchToDosByUser(data) {
    try {
      const response = await ToDoModelInstance.fetchToDosByUser(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async createToDo(data) {
    try {
      const response = await ToDoModelInstance.createToDo(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateToDo(data) {
    try {
      const response = await ToDoModelInstance.updateToDo(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteToDo(id) {
    try {
      const response = await ToDoModelInstance.deleteToDo(id);
      return response;
    } catch (err) {
      throw err;
    }
  }
};
