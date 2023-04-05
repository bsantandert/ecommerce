import React from "react";
import { createStyles, Card, Image, Text, Group } from "@mantine/core";

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
    justifyContent: "space-between",
  },
}));

const ProductListItem = ({ product }) => {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.content}>
      <Image
        src={product.image_url}
        height={100}
        width={100}
        fit={"contain"}
      ></Image>
      <div className={classes.detail}>
        <Group position="center">
          <Text size="lg" fw={700}>
            {product.name}
          </Text>
        </Group>
        <Group className={classes.info}>
          <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
            Price:
          </Text>
          <Text weight={500} size="md">
            {product.price} $
          </Text>
        </Group>
        <Group className={classes.info}>
          <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
            Quantity:
          </Text>
          <Text weight={500} size="md">
            {product.quantity}
          </Text>
        </Group>
        <Group className={classes.info}>
          <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
            Subtotal:
          </Text>
          <Text weight={500} size="md">
            {product.quantity * product.price} $
          </Text>
        </Group>
      </div>
    </Card>
  );
};

export default ProductListItem;
