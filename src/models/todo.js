const db = require("../db");

module.exports = class ToDo {
  async fetchToDosByUser(user_id) {
    const text = `SELECT * FROM todos WHERE user_id=$1`;
    const values = [user_id];
    const res = await db.query(text, values);
    if (res.rows?.length) {
      return res.rows;
    }
    return [];
  }

  async createToDo(data) {
    const { user_id, body } = data;
    const completed = false;
    const timestamp = new Date();
    const text = `INSERT INTO todos (user_id, body, completed, created_at) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user_id, body, completed, timestamp];
    const res = await db.query(text, values);

    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async updateToDo(data) {
    const { id, body, completed } = data;
    const text = `UPDATE todos SET body=$2, completed=$3 WHERE id=$1 RETURNING *`;
    const values = [id, body, completed];
    const res = await db.query(text, values);

    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async deleteToDo(id) {
    const text = "DELETE FROM todos WHERE id=$1 RETURNING *";
    const values = [id];
    const res = await db.query(text, values);

    if (res.rows?.length) {
      return res.rows[0];
    }
    return null;
  }

  async deleteToDosByUser(user_id) {
    const text = `DELETE FROM todos WHERE user_id=$1 RETURNING *`;
    const values = [user_id];
    const res = await db.query(text, values);

    if (res.rows?.length) {
      return res.rows;
    }
    return [];
  }
};
