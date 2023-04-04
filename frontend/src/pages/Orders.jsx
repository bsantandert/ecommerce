import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Anchor,
  Text,
  ScrollArea,
} from "@mantine/core";

import { fetchOrders } from "../api/orders.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      if (orders.data) setOrders(orders.data);
    };
    getOrders();
  }, []);

  const rows = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td>
          <Anchor fz="sm" href={`/orders/${order.id}`}>
            {order.id}
          </Anchor>
        </td>
        <td>{order.amount} $</td>
        <td>{order.status}</td>
        <td>
          <Text fz="xs" weight={700}>
            {(new Date(order.created_at)).toLocaleDateString("en-US")}
          </Text>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Id</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};

export default Orders;
