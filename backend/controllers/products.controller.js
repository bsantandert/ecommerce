const productsService = require("../services/products.service");

async function get(req, res, next) {
  try {
    res.json(await productsService.get(req.query.search));
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  try {
    res.json(await productsService.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting product`, err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  get,
  getById,
};
