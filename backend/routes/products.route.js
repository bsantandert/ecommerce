var express = require("express");
var router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/", productsController.get);

module.exports = router;
