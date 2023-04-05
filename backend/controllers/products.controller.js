const productsService = require("../services/products.service");

async function get(req, res, next) {
  try {
    const products = await productsService.get(req.query.search);
    res.json({ data: products });
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    res.status(500).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  try {
    const product = await productsService.getById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (err) {
    console.error(`Error while getting product`, err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  get,
  getById,
};
