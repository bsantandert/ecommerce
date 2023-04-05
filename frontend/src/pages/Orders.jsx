import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Anchor,
  Text,
  ScrollArea,
  Tabs,
} from "@mantine/core";

import { fetchOrders } from "../api/orders.api";
import { IconCheckupList, IconCheckbox } from "@tabler/icons-react";
import { PENDING, COMPLETED } from "../constants/orders.constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      if (orders.data) setOrders(orders.data);
    };
    getOrders();
  }, []);

  const buildTableRow = (order) => {
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
            {new Date(order.created_at).toLocaleDateString("en-US")}
          </Text>
        </td>
      </tr>
    );
  };

  const buildTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
    );
  };

  const completedOrderRows = orders
    .filter((r) => r.status === COMPLETED)
    .map(buildTableRow);
  const pendingOrderRows = orders
    .filter((r) => r.status === PENDING)
    .map(buildTableRow);

  return (
    <Container>
      <Tabs defaultValue={PENDING}>
        <Tabs.List>
          <Tabs.Tab value={PENDING} icon={<IconCheckupList size="1rem" />}>
            {PENDING}
          </Tabs.Tab>
          <Tabs.Tab value={COMPLETED} icon={<IconCheckbox size="1rem" />}>
            {COMPLETED}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={PENDING} pt="xs">
          <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
              {buildTableHeader()}
              <tbody>{pendingOrderRows}</tbody>
            </Table>
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value={COMPLETED} pt="xs">
          <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
              {buildTableHeader()}
              <tbody>{completedOrderRows}</tbody>
            </Table>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Orders;
