import React from "react";
import {
  createStyles,
  Group,
  rem,
  Card,
  Image,
  Text,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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

const ProductCard = ({ product, hideActions = false }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const goToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };
  return (
    <Card
      key={product.id}
      withBorder
      radius="md"
      p="md"
      className={classes.card}
    >
      <Card.Section>
        <Image
          src={product.image_url}
          alt={product.name}
          height={450}
          fit={"contain"}
        />
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
      {!hideActions && (
        <Group mt="xs">
          <Button
            radius="md"
            style={{ flex: 1 }}
            onClick={() => goToProductDetail(product.id)}
          >
            Show details
          </Button>
        </Group>
      )}
    </Card>
  );
};

export default ProductCard;
