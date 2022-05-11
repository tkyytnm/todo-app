const userModel = require("../models/user");
const userModelInstance = new userModel();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createError = require("http-errors");

module.exports = class authService {
  async createUser(data) {
    const { email, password } = data;
    try {
      const user = userModelInstance.findUserByEmail(email);
      if (user) {
        throw createError(409, "Email already exists.");
      }
      const hash = await bcrypt.hash(password, saltRounds);
      const response = await userModelInstance.createUser({
        email,
        password: hash,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      const response = await userModelInstance.deleteUser(id);
      return response;
    } catch (err) {
      throw err;
    }
  }
};
