const ordersService = require("../services/orders.service");
const orderValidator = require("../validators/orders.validator");

async function get(req, res, next) {
  try {
    const orders = await ordersService.get();
    res.json({ data: orders });
  } catch (err) {
    console.error(`Error while getting orders`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  try {
    const order = await ordersService.getById(req.params.id, true);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    res.json({ data: order });
  } catch (err) {
    console.error(`Error while getting order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res, next) {
  try {
    await orderValidator.orderSchema.validate(req.body);
    const orderCreated = await ordersService.create(req.body);

    res.json({ data: orderCreated });
  } catch (err) {
    console.error(`Error while creating order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res, next) {
  try {
    await orderValidator.orderSchema.validate(req.body);

    const orderFound = await ordersService.getById(req.params.id);
    if (!orderFound) {
      return res.status(400).json({ message: "Order not found" });
    }

    const orderUpdated = await ordersService.update(req.params.id, req.body);
    res.json({ data: orderUpdated });
  } catch (err) {
    console.error(`Error while updating order`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res, next) {
  try {
    const orderFound = await ordersService.getById(req.params.id);
    if (!orderFound) {
      return res.status(400).json({ message: "Order not found" });
    }

    const orderRemoved = await ordersService.remove(req.params.id);
    res.json({ data: orderRemoved });
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
