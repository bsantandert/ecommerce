import { fetchData } from "./fetchAPI";
import { notifications } from "@mantine/notifications";

const fetchEmployees = async () => {
  try {
    return await fetchData("employees");
  } catch (error) {
    notifications.show({
      title: "Error ocurred while fetching employees",
      message: error.message,
      autoClose: false,
      color: "red",
    });
    return [];
  }
};

export { fetchEmployees };
