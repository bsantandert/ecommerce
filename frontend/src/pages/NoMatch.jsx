import React from "react";
import { Text, Container } from "@mantine/core";

const NoMatch = () => {
  return (
    <Container>
      <Text fw={700}>404</Text>
      <Text>Page Not Found</Text>
    </Container>
  );
};

export default NoMatch;
