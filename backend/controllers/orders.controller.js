const ordersService = require("../services/orders.service");

async function get(req, res, next) {
  try {
    res.json(await ordersService.get());
  } catch (err) {
    console.error(`Error while getting orders`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    res.json(await ordersService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting orders`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await ordersService.create(req.body));
  } catch (err) {
    console.error(`Error while creating order`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await ordersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating order`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await ordersService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting order`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
