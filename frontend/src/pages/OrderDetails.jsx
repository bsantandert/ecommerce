import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStyles,
  Group,
  Card,
  Text,
  Button,
  Container,
  Select,
} from "@mantine/core";
import ProductListItem from "../components/ProductListItem";
import { fetchOrderById, updateOrder } from "../api/orders.api";
import { fetchEmployees } from "../api/employees.api";
import { PENDING, COMPLETED } from "../constants/orders.constants";
import { isCurrentUserAdmin } from "../utils/user.utils";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: "25px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
}));

const OrderDetails = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const selectedEmployeeRef = useRef(0);
  const selectedStatusRef = useRef("");
  const [order, setOrder] = useState(null);
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();

  const totalItems = order?.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  useEffect(() => {
    const fetch = async () => {
      const [order, employees] = await Promise.all([
        fetchOrderById(id),
        fetchEmployees(),
      ]);
      setOrder(order.data);
      setEmployees(
        employees.data.map((emp) => ({
          value: emp.id,
          label: emp.name,
        }))
      );
      selectedEmployeeRef.current = order.data.employeeId;
      selectedStatusRef.current = order.data.status;
    };

    fetch();
  }, [id]);

  const save = async () => {
    const orderToUpdate = {
      ...order,
      employeeId: selectedEmployeeRef.current,
      status: selectedStatusRef.current,
    };
    await updateOrder(orderToUpdate, () => {
      navigate("/orders");
    });
  };

  return (
    <>
      {order && (
        <Container className={classes.container}>
          <div className={classes.content}>
            {order?.products.map((item) => (
              <ProductListItem key={item.id} product={item} />
            ))}
            <Card withBorder>
              <Group position="right">
                <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
                  Total ({totalItems}) items:
                </Text>
                <Text weight={500} size="md">
                  {order?.amount} $
                </Text>
              </Group>
            </Card>
          </div>

          {isCurrentUserAdmin() && (
            <div className={classes.options}>
              {employees && (
                <Select
                  label="Employee Assigned"
                  placeholder="Employee"
                  defaultValue={selectedEmployeeRef.current}
                  description="Select an employee for order fulfillment"
                  dropdownPosition="bottom"
                  data={employees}
                  onChange={(newVal) => {
                    selectedEmployeeRef.current = newVal;
                  }}
                />
              )}
              <Select
                label="Order Status"
                placeholder="Status"
                description="Pending or Completed"
                dropdownPosition="bottom"
                defaultValue={selectedStatusRef.current}
                data={[PENDING, COMPLETED]}
                onChange={(newVal) => {
                  selectedStatusRef.current = newVal;
                }}
              />
              <Group grow style={{ marginTop: "10px" }}>
                <Button radius="md" onClick={save}>
                  Save
                </Button>
              </Group>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default OrderDetails;
