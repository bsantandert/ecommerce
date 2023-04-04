import { fetchData } from "./fetchAPI";
import { notifications } from "@mantine/notifications";

const submitOrder = async (cartItems, amount, status, onSuccess) => {
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
      title: "Error ocurred",
      message: error.message,
      autoClose: false,
      color: "red",
    });
  }
};

export { submitOrder };
