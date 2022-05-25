const { Pool } = require("pg");
const { DB, HEROKU } = require("../../config");
const config =
  HEROKU.NODE_ENV === "production"
    ? {
        connectionString: HEROKU.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        connectionString: `postgresql://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.NAME}`,
      };

const pool = new Pool(config);

module.exports = {
  async query(text, params) {
    return await pool.query(text, params);
  },
  async end() {
    await pool.end();
  },
};
