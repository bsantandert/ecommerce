const ordersService = require("../services/orders.service");
const orderValidator = require("../validators/orders.validator");

async function get(req, res, next) {
  try {
    res.json(await ordersService.get());
  } catch (err) {
    console.error(`Error while getting orders`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  try {
    res.json(await ordersService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting orders`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res, next) {
  try {
    await orderValidator.orderSchema.validate(req.body);
    res.json(await ordersService.create(req.body));
  } catch (err) {
    console.error(`Error while creating order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res, next) {
  try {
    await orderValidator.orderSchema.validate(req.body);
    res.json(await ordersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res, next) {
  try {
    res.json(await ordersService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
