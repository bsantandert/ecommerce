var moment = require("moment");
const db = require("./db.service");
const dbCostants = require("../constants/db.constant");
const orderMapper = require("../mappers/order.mapper");
const productMapper = require("../mappers/product.mapper");

async function get() {
  const result = await db.query(
    "SELECT id, amount, status, created_at, employee_id FROM customer_order"
  );

  return result.rows.map(orderMapper.mapToDtoModel);
}

async function getById(id, includeProductsInfo = false) {
  const getOrderResult = await db.query(
    "SELECT id, amount, status, created_at, employee_id FROM customer_order WHERE id=$1",
    [id]
  );
  const order = getOrderResult.rows[0];

  if (!order) return null;

  if (!includeProductsInfo) {
    return orderMapper.mapToDtoModel(order);
  }

  // Get products info from order
  const orderProductsResult = await db.query(
    `SELECT pro.id, pro.name, pro.description, pro.price, pro.image_url, pro.sku, cop.quantity 
  FROM product AS pro INNER JOIN customer_order_product AS cop ON pro.id = cop.product_id 
  WHERE cop.customer_order_id = $1`,
    [id]
  );

  const orderProducts = orderProductsResult.rows;

  return {
    ...orderMapper.mapToDtoModel(order),
    products: orderProducts.map(productMapper.mapToDtoModel),
  };
}

async function create(order) {
  const client = await db.pool.connect();
  try {
    const currentDateTime = moment.utc().format();
    await client.query(dbCostants.BEGIN);

    // Create order
    const createOrderResult = await client.query(
      "INSERT INTO customer_order (amount, status, created_at, employee_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [order.amount, order.status, currentDateTime, order.employeeId]
    );

    const orderCreated = createOrderResult.rows[0];

    // Create products for order
    for (let index = 0; index < order.products.length; index++) {
      const orderProductQuery =
        "INSERT INTO customer_order_product (customer_order_id, product_id, quantity) VALUES ($1, $2, $3)";
      await client.query(orderProductQuery, [
        orderCreated.id,
        order.products[index].id,
        order.products[index].quantity,
      ]);
    }

    await client.query(dbCostants.COMMIT);
    return orderMapper.mapToDtoModel(orderCreated);
  } catch (e) {
    await client.query(dbCostants.ROLLBACK);
    throw e;
  } finally {
    client.release();
  }
}

async function update(id, order) {
  const client = await db.pool.connect();
  try {
    await client.query(dbCostants.BEGIN);

    // Remove products from order
    await client.query(
      "DELETE FROM customer_order_product WHERE customer_order_id=$1",
      [id]
    );

    // Create again order products in case of changes
    for (let index = 0; index < order.products.length; index++) {
      await client.query(
        "INSERT INTO customer_order_product(customer_order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [id, order.products[index].id, order.products[index].quantity]
      );
    }

    // Update order
    const updateOrderResult = await client.query(
      "UPDATE customer_order SET amount=$1, status=$2, employee_id=$3 WHERE id=$4 RETURNING *",
      [order.amount, order.status, order.employee_id, id]
    );
    const orderUpdated = updateOrderResult.rows[0];

    await client.query(dbCostants.COMMIT);
    return orderMapper.mapToDtoModel(orderUpdated);
  } catch (e) {
    await client.query(dbCostants.ROLLBACK);
    throw e;
  } finally {
    client.release();
  }
}

async function remove(id) {
  const client = await db.pool.connect();
  try {
    await client.query(dbCostants.BEGIN);

    // Remove products from order
    await client.query("DELETE FROM customer_order_product WHERE order_id=$1", [
      id,
    ]);
    // Remove order
    await client.query("DELETE FROM customer_order WHERE id=$1", [id]);

    await client.query(dbCostants.COMMIT);

    return id;
  } catch (e) {
    await client.query(dbCostants.ROLLBACK);
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
