import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../context/cart/CartContext";
import {
  createStyles,
  Group,
  rem,
  Card,
  Image,
  Text,
  Button,
  ActionIcon,
  Container,
  NumberInput,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { submitOrder } from "../api/orders.api";
import { PENDING } from "../constants/orders.constants";

const useStyles = createStyles(() => ({
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
  },
}));

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItem, total, itemCount, clearCart } =
    useContext(CartContext);
  const { classes } = useStyles();

  const noItemsInCart = itemCount === 0;

  const itemChange = (cartItem, newValue) => {
    if (cartItem.quantity !== newValue) {
      updateItem({ ...cartItem, quantity: newValue });
    }
  };

  const submit = async () => {
    await submitOrder(cartItems, total, PENDING, () => {
      navigate("/products");
      clearCart();
    });
  };

  return (
    <Container>
      {noItemsInCart && <Text fw={700}>No products in cart</Text>}
      {cartItems.map((item, index) => (
        <Card key={index} withBorder className={classes.content}>
          <Image src={item.image_url} height={100} width={100} fit></Image>
          <div className={classes.detail}>
            <Text size="lg" fw={700}>
              {item.name}
            </Text>
            <div className={classes.info}>
              <NumberInput
                defaultValue={item.quantity}
                max={item.stock}
                min={1}
                placeholder="Quantity"
                label="Quantity"
                withAsterisk
                onChange={(newValue) => itemChange(item, newValue)}
              />
            </div>
            <div className={classes.info}>
              <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
                Subtotal:
              </Text>
              <Text weight={500} size="sm">
                {item.quantity * item.price} $
              </Text>
            </div>
          </div>
          <div className={classes.detail}>
            <ActionIcon
              size="xl"
              variant="default"
              onClick={() => removeItem(item)}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </div>
        </Card>
      ))}
      <div>
        <Card
          withBorder
          style={{ float: "right", display: "flex", flexDirection: "column" }}
        >
          <div className={classes.info}>
            <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
              Total ({itemCount}) items:
            </Text>
            <Text weight={500} size="sm">
              {total} $
            </Text>
          </div>
          <Group style={{ marginTop: "10px" }}>
            <Button
              radius="md"
              style={{ flex: 1 }}
              disabled={noItemsInCart}
              onClick={submit}
            >
              Submit Order
            </Button>
          </Group>
        </Card>
      </div>
    </Container>
  );
};

export default Cart;
