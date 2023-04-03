import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/fetchAPI";
import ProductCard from "../components/ProductCard";
import {
  createStyles,
  Group,
  rem,
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
    maxWidth: rem(480),
    marginLeft: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },
}));

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { classes } = useStyles();

  const isInStock = product.stock > 0;

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await fetchData(`products/${id}`);
      setProduct(product.data);
    };
    fetchProducts();
  }, [id]);

  const addToOrder = () => {
    navigate("/products");
  };

  return (
    <Container style={{ display: "flex" }}>
      <div className={classes.inner}>
        <ProductCard product={product} hideActions={true}></ProductCard>
        <div className={classes.content}>
          <Card withBorder radius="md" p="md">
            {!isInStock && <Text c="red">No Stock Available</Text>}
            {isInStock && <Text c="teal">In Stock</Text>}
            <NumberInput
              defaultValue={1}
              max={product.stock}
              min={1}
              disabled={!isInStock}
              placeholder="Quantity"
              label="Quantity"
              withAsterisk
            />
            <Group mt="xs">
              <Button
                radius="md"
                style={{ flex: 1 }}
                disabled={!isInStock}
                onClick={addToOrder}
              >
                Add to Order
              </Button>
            </Group>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
