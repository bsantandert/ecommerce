const employeesService = require("../services/employees.service");

async function get(req, res, next) {
  try {
    const employees = await employeesService.get();
    res.json({ data: employees });
  } catch (err) {
    console.error(`Error while getting employees`, err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  get,
};
