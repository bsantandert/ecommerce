import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  createStyles,
  Header,
  Container,
  Group,
  rem,
  Select,
  Image,
} from "@mantine/core";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import {
  isCurrentUserAdmin,
  getCurrentUser,
  setCurrentUser,
} from "../utils/user.utils";
import { CUSTOMER, ADMIN } from "../constants/users.contants";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const NavBar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const { classes, cx } = useStyles();
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const links = isCurrentUserAdmin()
    ? [{ label: "Orders", link: "/orders" }]
    : [
        { label: "Products", link: "/products" },
        { label: "Orders", link: "/orders" },
        {
          label: "Cart",
          link: "/cart",
          icon: <IconShoppingCart size="1rem" />,
        },
      ];

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
    >
      {link.icon}
      {!link.icon && link.label}
    </a>
  ));

  const changeCurrentUser = (user) => {
    setCurrentUser(user);
    window.location.reload();
  };

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Image height={50} width={150} src="./logo.png" alt="logo" />
        <Group spacing={5}>
          {items}
          <Select
            placeholder="User"
            rightSection={<IconUser size="1rem" />}
            data={[CUSTOMER, ADMIN]}
            defaultValue={getCurrentUser()}
            onChange={changeCurrentUser}
          />
        </Group>
      </Container>
    </Header>
  );
};

export default NavBar;
