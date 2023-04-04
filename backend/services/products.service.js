const db = require("./db.service");

async function get() {
  const result = await db.query(
    "SELECT id, sku, name, description, stock, price, image_url FROM product"
  );
  const data = result.rows || [];

  return {
    data,
  };
}

async function getById(id) {
  const result = await db.query(
    "SELECT id, sku, name, description, stock, price, image_url FROM product WHERE id=$1",
    [id]
  );
  const data = result.rows[0];

  return {
    data,
  };
}

module.exports = {
  get,
  getById,
};
