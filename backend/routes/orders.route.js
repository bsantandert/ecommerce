var express = require("express");
var router = express.Router();
const ordersController = require("../controllers/orders.controller");

router.get("/", ordersController.get);
router.get("/:id", ordersController.getById);
router.post("/", ordersController.create);
router.put("/:id", ordersController.update);
router.delete("/:id", ordersController.remove);

module.exports = router;
