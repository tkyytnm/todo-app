const db = require("../db");

module.exports = class User {
  async createUser(data) {
    const { email, password } = data;
    const timestamp = new Date();
    const text = `INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *`;
    const values = [email, password, timestamp];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async updateProfile(data) {
    const { id, email } = data;
    const text = `UPDATE users SET email=$2 WHERE id=$1 RETURNING *`;
    const values = [id, email];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async updatePassword(data) {
    const { id, password } = data;
    const text = `UPDATE users SET password=$2 WHERE id=$1 RETURNING *`;
    const values = [id, password];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async deleteUser(id) {
    const text = `DELETE FROM users WHERE id=$1 RETURNING *`;
    const values = [id];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async findUserByEmail(email) {
    const text = "SELECT * FROM users WHERE email=$1";
    const values = [email];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async findUserById(id) {
    const text = `SELECT * FROM users WHERE id=$1`;
    const values = [id];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }
};
