const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createError = require("http-errors");

module.exports = class AuthService {
  async createUser(data) {
    const { email, password } = data;
    try {
      const user = await UserModelInstance.findUserByEmail(email);
      if (user) {
        throw createError(409, "Email already exists.");
      }
      const hash = await bcrypt.hash(password, saltRounds);
      const response = await UserModelInstance.createUser({
        email,
        password: hash,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  
};
