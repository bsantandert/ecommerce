const db = require("./db.service");

async function get(search) {
  let productQuery =
    "SELECT id, sku, name, description, stock, price, image_url FROM product";

  // Modify query in case we have to search items
  if (search) {
    productQuery = `${productQuery} WHERE (to_tsvector('english', name) @@ websearch_to_tsquery('english','${search}')) 
    OR (to_tsvector('english', description) @@ websearch_to_tsquery('english','${search}')) OR name ILIKE '%${search}%'`;
  }
  const productsResult = await db.query(productQuery);

  return productsResult.rows;
}

async function getById(id) {
  const result = await db.query(
    "SELECT id, sku, name, description, stock, price, image_url FROM product WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  get,
  getById,
};
