import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  createStyles,
  Header,
  Container,
  Group,
  Select,
  Image,
} from "@mantine/core";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import NavBarItem from "./NavBarItem";
import {
  isCurrentUserAdmin,
  getCurrentUser,
  setCurrentUser,
} from "../../utils/user.utils";
import { CUSTOMER, ADMIN } from "../../constants/users.contants";

const useStyles = createStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

const NavBar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const { classes } = useStyles();
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

  const changeCurrentUser = (user) => {
    setCurrentUser(user);
    window.location.reload();
  };

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Image height={50} width={150} src="./logo.png" alt="logo" />
        <Group spacing={5}>
          {links.map((link) => (
            <NavBarItem link={link} active={active}></NavBarItem>
          ))}
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
