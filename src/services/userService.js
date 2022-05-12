const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = class userService {
  async updateProfile(data) {
    try {
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
      const response = await UserModelInstance.deleteUser(id);
      return response;
    } catch (err) {
      throw err;
    }
  }
};
