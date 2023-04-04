var moment = require("moment");
const db = require("./db.service");

async function get() {
  const result = await db.query(
    "SELECT id, amount, status, created_at FROM customer_order"
  );
  const data = result.rows || [];

  return {
    data,
  };
}

async function getById(id) {
  const getOrderResult = await db.query(
    "SELECT id, amount, status, created_at FROM customer_order WHERE id=$1",
    [id]
  );
  const order = getOrderResult.rows[0];

  const orderProductsResult = await db.query(
    `SELECT pro.id, pro.name, pro.description, pro.price, pro.image_url, pro.sku, cop.quantity 
    FROM product AS pro INNER JOIN customer_order_product AS cop ON pro.id = cop.product_id 
    WHERE cop.customer_order_id = $1`,
    [id]
  );

  const orderProducts = orderProductsResult.rows;

  return {
    ...order,
    products: orderProducts,
  };
}

async function create(order) {
  const client = await db.pool.connect();
  try {
    const currentDateTime = moment.utc().format();
    await client.query("BEGIN");
    const createOrderQuery =
      "INSERT INTO customer_order (amount, status, created_at) VALUES ($1, $2, $3) RETURNING *";

    const createOrderResult = await client.query(createOrderQuery, [
      order.amount,
      order.status,
      currentDateTime,
    ]);

    const orderCreated = createOrderResult.rows[0];

    for (let index = 0; index < order.products.length; index++) {
      const orderProductQuery =
        "INSERT INTO customer_order_product(customer_order_id, product_id, quantity) VALUES ($1, $2, $3)";
      await client.query(orderProductQuery, [
        orderCreated.id,
        order.products[index].id,
        order.products[index].quantity,
      ]);
    }

    await client.query("COMMIT");
    return {
      data: orderCreated,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

async function update(id, order) {
  const client = await db.pool.connect();
  try {
    const productIds = order.productIds;

    await client.query("BEGIN");

    const deleteOrderProductsQuery =
      "DELETE FROM customer_order_product WHERE order_id=$1";
    await client.query(deleteOrderProductsQuery, [id]);

    for (let index = 0; index < productIds.length; index++) {
      const orderProductQuery =
        "INSERT INTO customer_order_product(order_id, product_id) VALUES ($1, $2)";
      await client.query(orderProductQuery, [id, productIds[index]]);
    }

    const updateOrderQuery =
      "UPDATE customer_order SET amount=$1, status=$2 WHERE id=$3 RETURNING *";

    const updateOrderResult = await client.query(updateOrderQuery, [
      order.amount,
      order.status,
      id,
    ]);
    const orderUpdated = updateOrderResult.rows[0];

    await client.query("COMMIT");
    return {
      data: orderUpdated,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

async function remove(id) {
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");

    const deleteOrderProductsQuery =
      "DELETE FROM customer_order_product WHERE order_id=$1";
    await client.query(deleteOrderProductsQuery, [id]);

    const deleteOrderQuery = "DELETE FROM customer_order WHERE id=$1";

    await client.query(deleteOrderQuery, [id]);

    await client.query("COMMIT");
    return {
      data: id,
    };
  } catch (e) {
    await client.query("ROLLBACK");
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
