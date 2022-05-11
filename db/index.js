const { Pool } = require("pg");
const { USER, PASS, HOST, PORT, NAME } = require("../config").DB;
const connectionString = `postgresql://${USER}:${PASS}@${HOST}:${PORT}/${NAME}`;

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
