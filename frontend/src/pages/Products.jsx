import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/fetchAPI";
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  SimpleGrid,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { classes, theme } = useStyles();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchData("products");
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  const goToProductDetail = (path) => {
    navigate(path);
  };

  return (
    <SimpleGrid cols={4} spacing="lg" verticalSpacing="xl">
      {products.map((product, index) => (
        <Card key={index} withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={product.image_url} alt={product.name} height={450} />
          </Card.Section>
          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text fz="lg" fw={500}>
                {product.name}
              </Text>
            </Group>
            <Text fw={700}>{product.price} $</Text>
            <Text fz="sm" mt="xs">
              {product.description}
            </Text>
          </Card.Section>
          <Group mt="xs">
            <Button
              radius="md"
              style={{ flex: 1 }}
              onClick={() => goToProductDetail(`/products/${product.id}`)}
            >
              Show details
            </Button>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Products;
