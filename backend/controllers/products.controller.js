const productsService = require("../services/products.service");

async function get(req, res, next) {
  try {
    res.json(await productsService.get(req.query.page));
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    res.json(await productsService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting product`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getById,
};
