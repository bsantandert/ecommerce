import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/cart/CartContext";
import { Group, Card, Text, Button, Container, Center } from "@mantine/core";
import { createOrder } from "../api/orders.api";
import { PENDING } from "../constants/orders.constants";
import CartItem from "../components/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItem, total, itemCount, clearCart } =
    useContext(CartContext);

  const noItemsInCart = itemCount === 0;

  const itemChange = (cartItem, newValue) => {
    if (cartItem.quantity !== newValue) {
      updateItem({ ...cartItem, quantity: newValue });
    }
  };

  const submit = async () => {
    await createOrder(cartItems, total, PENDING, () => {
      navigate("/products");
      clearCart();
    });
  };

  return (
    <Container>
      {noItemsInCart && (
        <Center>
          <Text fw={700}>No products in cart</Text>
        </Center>
      )}
      {cartItems.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          onItemChange={itemChange}
          onItemRemoved={removeItem}
        ></CartItem>
      ))}
      <Card withBorder style={{ display: "flex", flexDirection: "column" }}>
        <Group position="right">
          <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
            Total ({itemCount}) items:
          </Text>
          <Text weight={500} size="md">
            {total} $
          </Text>
        </Group>

        <Group style={{ marginTop: "10px" }} position="right">
          <Button radius="md" disabled={noItemsInCart} onClick={submit}>
            Submit Order
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default Cart;
