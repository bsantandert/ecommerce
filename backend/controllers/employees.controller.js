const employeesService = require("../services/employees.service");

async function get(req, res, next) {
  try {
    res.json(await employeesService.get());
  } catch (err) {
    console.error(`Error while getting employees`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};
