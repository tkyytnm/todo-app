const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ToDoModel = require("../models/todo");
const ToDoModelInstance = new ToDoModel();
const createError = require("http-errors");

module.exports = class userService {
  async getUserById(id) {
    try {
      const response = await UserModelInstance.findUserById(id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateVisibility(data) {
    try {
      const response = await UserModelInstance.updateVisibility(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(data) {
    try {
      const { email } = data;
      const user = await UserModelInstance.findUserByEmail(email);
      if (user) {
        throw createError(409, "そのEmailアドレスはすでに登録されています。");
      }
      const response = await UserModelInstance.updateProfile(data);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(data) {
    try {
      const { password } = data;
      const hash = await bcrypt.hash(password, saltRounds);
      const response = await UserModelInstance.updatePassword({
        ...data,
        password: hash,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      await ToDoModelInstance.deleteToDosByUser(id);
      const response = await UserModelInstance.deleteUser(id);
      return response;
    } catch (err) {
      throw err;
    }
  }
};
