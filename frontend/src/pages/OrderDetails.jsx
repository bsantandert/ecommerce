import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStyles,
  Group,
  Card,
  Image,
  Text,
  Button,
  Container,
  Select,
} from "@mantine/core";
import { fetchOrderById, updateOrder } from "../api/orders.api";
import { fetchEmployees } from "../api/employees.api";
import { PENDING, COMPLETED } from "../constants/orders.constants";

const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    width: "200px",
  },
}));

const OrderDetails = () => {
  const navigate = useNavigate();
  const selectedEmployeeRef = useRef(0);
  const selectedStatusRef = useRef("");
  const [order, setOrder] = useState(null);
  const [employees, setEmployees] = useState([]);
  const { classes } = useStyles();
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
      selectedEmployeeRef.current = order.data.employee_id;
      selectedStatusRef.current = order.data.status;
    };

    fetch();
  }, [id]);

  const save = async () => {
    const orderToUpdate = {
      ...order,
      employee_id: selectedEmployeeRef.current,
      status: selectedStatusRef.current,
    };
    await updateOrder(orderToUpdate, () => {
      navigate("/orders");
    });
  };

  return (
    <>
      {order && (
        <Container style={{ overflow: "auto" }}>
          {order?.products.map((item, index) => (
            <Card key={index} withBorder className={classes.content}>
              <Image src={item.image_url} height={100} width={100} fit></Image>
              <div className={classes.detail}>
                <Text size="lg" fw={700}>
                  {item.name}
                </Text>
                <div className={classes.info}>
                  <Text
                    size="md"
                    color="dimmed"
                    style={{ marginRight: "10px" }}
                  >
                    Quantity:
                  </Text>
                  <Text weight={500} size="sm">
                    {item.quantity}
                  </Text>
                </div>
                <div className={classes.info}>
                  <Text
                    size="md"
                    color="dimmed"
                    style={{ marginRight: "10px" }}
                  >
                    Subtotal:
                  </Text>
                  <Text weight={500} size="sm">
                    {item.quantity * item.price} $
                  </Text>
                </div>
              </div>
            </Card>
          ))}
          <div>
            <Card
              withBorder
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Group position="right">
                <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
                  Total ({totalItems}) items:
                </Text>
                <Text weight={500} size="sm">
                  {order?.amount} $
                </Text>
              </Group>
            </Card>
          </div>
          <Group position="right" style={{ alignItems: "end" }}>
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
            <Button radius="md" onClick={save}>
              Save
            </Button>
          </Group>
        </Container>
      )}
    </>
  );
};

export default OrderDetails;
