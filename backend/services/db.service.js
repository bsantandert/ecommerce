const dbConfig = require("../configs/db.config");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

async function query(sql, params) {
  return pool.query(sql, params);
}

module.exports = {
  query,
  pool,
};
