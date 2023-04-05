const db = require("./db.service");

async function get() {
  const result = await db.query("SELECT id, name FROM employee");
  return result.rows;
}

module.exports = {
  get,
};
