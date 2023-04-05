const db = require("./db.service");

async function get(search) {
  let productQuery =
    "SELECT id, sku, name, description, stock, price, image_url FROM product";
  if (search) {
    productQuery = `${productQuery} WHERE (to_tsvector('english', name) @@ websearch_to_tsquery('english','${search}')) 
    OR (to_tsvector('english', description) @@ websearch_to_tsquery('english','${search}')) OR name ILIKE '%${search}%'`;
  }
  const result = await db.query(productQuery);
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
