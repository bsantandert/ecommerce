const db = require("./db.service");

/**
 * Returns all employees
 * @returns Employees array
 */
async function get() {
  const result = await db.query("SELECT id, name FROM employee");
  return result.rows;
}

module.exports = {
  get,
};
