const db = require("../db");

module.exports = class User {
  async createUser(data) {
    const { email, password } = data;
    const timestamp = new Date();
    const text = `INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *`;
    const values = [email, password, timestamp];
    const result = await db.query(text, values);
    if (result.rows?.length) {
      return result.rows[0];
    }
    return null;
  }

  async deleteUser(id) {
    const text = `DELETE FROM users WHERE id=$1 RETURNING *`;
    const values = [id];
    const result = await db.query(text, values);
    if (result.rows?.length) {
      return result.rows[0];
    }
    return null;
  }

  async findUserByEmail(email) {
    const text = "SELECT * FROM users WHERE email=$1";
    const values = [email];
    const result = await db.query(text, values);
    if (result.rows?.length) {
      return result.rows[0];
    }
    return null;
  }
};
