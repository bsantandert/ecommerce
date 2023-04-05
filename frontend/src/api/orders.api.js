import { fetchData } from "./fetchAPI";
import { notifications } from "@mantine/notifications";

const createOrder = async (cartItems, amount, status, onSuccess) => {
  try {
    const products = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    const options = {
      method: "POST",
      body: JSON.stringify({
        products,
        amount,
        status,
      }),
    };

    await fetchData("orders", options);
    notifications.show({
      title: "Order Created Successfully",
      autoClose: true,
    });
    onSuccess();
  } catch (error) {
    notifications.show({
      title: "Error ocurred while creating the order",
      message: error.message,
      autoClose: false,
      color: "red",
    });
  }
};

const updateOrder = async (order, onSuccess) => {
  try {
    const options = {
      method: "PUT",
      body: JSON.stringify(order),
    };

    await fetchData(`orders/${order.id}`, options);
    notifications.show({
      title: "Order Updated Successfully",
      autoClose: true,
    });
    onSuccess();
  } catch (error) {
    notifications.show({
      title: "Error ocurred while updating the order",
      message: error.message,
      autoClose: false,
      color: "red",
    });
  }
};

const fetchOrders = async () => {
  try {
    return await fetchData("orders");
  } catch (error) {
    notifications.show({
      title: "Error ocurred while fetching orders",
      message: error.message,
      autoClose: false,
      color: "red",
    });
    return [];
  }
};

const fetchOrderById = async (id) => {
  try {
    return await fetchData(`orders/${id}`);
  } catch (error) {
    notifications.show({
      title: "Error ocurred while fetching order",
      message: error.message,
      autoClose: false,
      color: "red",
    });
    return [];
  }
};

export { fetchOrders, fetchOrderById, createOrder, updateOrder };
