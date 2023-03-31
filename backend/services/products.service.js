const db = require("./db.service");
const helper = require("../utils/helper.util");
const listPerPage = 10;

async function get(page = 1) {
  const offset = helper.getOffset(page, listPerPage);
  const result = await db.query(
    "SELECT id, sku, name, description, stock, price, image_url FROM product LIMIT $1 OFFSET $2",
    [listPerPage, offset]
  );
  const data = result.rows || [];
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  get,
};
