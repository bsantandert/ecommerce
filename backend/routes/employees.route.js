var express = require("express");
var router = express.Router();
const employeesController = require("../controllers/employees.controller");

router.get("/", employeesController.get);

module.exports = router;
