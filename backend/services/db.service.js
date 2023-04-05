const dbConfig = require("../configs/db.config");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

/**
 * Query function to retrieve data based on query string
 * Note: No need to check out or release a client. The pool is doing the acquiring and releasing internally.
 * @param {*} sql
 * @param {*} params
 * @returns
 */
async function query(sql, params) {
  return pool.query(sql, params);
}

module.exports = {
  query,
  pool,
};
