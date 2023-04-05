import React from "react";
import { createStyles, Card, Image, Text, NumberInput, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

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

const CartItem = ({ item, onItemChange, onItemRemoved }) => {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.content}>
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
            onChange={(newValue) => onItemChange(item, newValue)}
          />
        </div>
        <div className={classes.info}>
          <Text size="md" color="dimmed" style={{ marginRight: "10px" }}>
            Subtotal:
          </Text>
          <Text weight={500} size="md">
            {item.quantity * item.price} $
          </Text>
        </div>
      </div>
      <div className={classes.detail}>
        <ActionIcon
          size="xl"
          variant="default"
          onClick={() => onItemRemoved(item)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </div>
    </Card>
  );
};

export default CartItem;
