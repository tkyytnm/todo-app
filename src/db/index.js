const { Pool } = require("pg");
const { USER, PASS, HOST, PORT, NAME } = require("../../config").DB;
const connectionString = `postgresql://${USER}:${PASS}@${HOST}:${PORT}/${NAME}`;

const pool = new Pool({ connectionString });

module.exports = {
  async query(text, params) {
    return await pool.query(text, params);
  },
  async end() {
    await pool.end();
  },
};
