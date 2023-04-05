import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/fetchAPI";
import ProductCard from "../components/ProductCard";
import CartContext from "../context/cart/CartContext";
import {
  createStyles,
  Group,
  Card,
  Text,
  Button,
  Container,
  NumberInput,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
  },

  content: {
    minWidth: "300px",
    marginLeft: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },
}));

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { addItem, cartItems, increase } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { classes } = useStyles();

  const isInStock = product?.stock > 0;
  const isInCart = !!cartItems.find((item) => item.id === product?.id);

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await fetchData(`products/${id}`);
      setProduct(product.data);
    };
    fetchProducts();
  }, [id]);

  const addToOrder = () => {
    const productToAdd = {
      ...product,
      quantity: quantity,
    };
    if (isInCart) {
      increase(productToAdd);
    } else {
      addItem(productToAdd);
    }
    navigate("/products");
  };

  return (
    <Container style={{ display: "flex" }}>
      {product && (
        <div className={classes.inner}>
          <ProductCard product={product} hideActions={true}></ProductCard>
          <div className={classes.content}>
            <Card withBorder radius="md" p="md">
              {!isInStock && <Text c="red">No Stock Available</Text>}
              {isInStock && <Text c="teal">In Stock</Text>}
              <NumberInput
                value={quantity}
                max={product.stock}
                min={1}
                disabled={!isInStock}
                placeholder="Quantity"
                label="Quantity"
                withAsterisk
                onChange={setQuantity}
              />
              <Group>
                <Text size="md" color="dimmed">
                  Subtotal:
                </Text>
                <Text weight={500} size="sm">
                  {quantity * product.price} $
                </Text>
              </Group>
              <Group mt="xs" grow>
                <Button radius="md" disabled={!isInStock} onClick={addToOrder}>
                  Add to Order
                </Button>
              </Group>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
