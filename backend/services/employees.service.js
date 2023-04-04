const db = require("./db.service");

async function get() {
  const result = await db.query("SELECT id, name FROM employee");
  const data = result.rows || [];

  return {
    data,
  };
}

module.exports = {
  get,
};
