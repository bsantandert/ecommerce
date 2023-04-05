import { fetchData } from "./fetchAPI";
import { notifications } from "@mantine/notifications";

const fetchProducts = async (search) => {
  try {
    return await fetchData(search ? `products?search=${search}` : "products");
  } catch (error) {
    notifications.show({
      title: "Error ocurred while fetching products",
      message: error.message,
      autoClose: false,
      color: "red",
    });
    return [];
  }
};

const fetchProductById = async (id) => {
  try {
    return await fetchData(`products/${id}`);
  } catch (error) {
    notifications.show({
      title: "Error ocurred while fetching product",
      message: error.message,
      autoClose: false,
      color: "red",
    });
    return [];
  }
};

export { fetchProducts, fetchProductById };
