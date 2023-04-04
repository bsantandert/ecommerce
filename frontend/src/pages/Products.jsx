import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchAPI";
import { SimpleGrid, Container } from "@mantine/core";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchData("products");
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
        {products.map((product) => (
          <ProductCard product={product}></ProductCard>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;
