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

  async updateToDoBody(data) {
    try {
      const response = await ToDoModelInstance.updateToDoBody(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateToDoCompleted(data) {
    try {
      const response = await ToDoModelInstance.updateToDoCompleted(data);
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
