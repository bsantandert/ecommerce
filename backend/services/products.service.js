const db = require("./db.service");
const productMapper = require("../mappers/product.mapper");

/**
 * Returns products filtered by search string, if search does not exist it returns all the products
 * @param {*} search String to search in name and description columns
 * @returns Products array
 */
async function get(search) {
  let productQuery =
    "SELECT id, sku, name, description, stock, price, image_url FROM product";

  // Modify query in case we have to search items
  if (search) {
    // Added ILIKE to query since 'websearch_to_tsquery' and 'to_tsvector' use words to retrieve the recors
    // it will not do a contains of the search string in these words
    // ex: search="phone" will not return "iPhone" record
    productQuery = `${productQuery} WHERE (to_tsvector('english', name) @@ websearch_to_tsquery('english','${search}')) 
    OR (to_tsvector('english', description) @@ websearch_to_tsquery('english','${search}')) OR name ILIKE '%${search}%'`;
  }
  const productsResult = await db.query(productQuery);
  return productsResult.rows.map(productMapper.mapToDtoModel);
}

/**
 * Returns product by identifier
 * @param {*} id Product identifier
 * @returns Single product
 */
async function getById(id) {
  const result = await db.query(
    "SELECT id, sku, name, description, stock, price, image_url FROM product WHERE id=$1",
    [id]
  );

  return productMapper.mapToDtoModel(result.rows[0]);
}

module.exports = {
  get,
  getById,
};
