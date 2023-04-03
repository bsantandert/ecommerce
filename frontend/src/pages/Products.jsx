import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchAPI";
import { SimpleGrid } from "@mantine/core";
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
    <SimpleGrid cols={4} spacing="lg" verticalSpacing="xl">
      {products.map((product, index) => (
        <ProductCard key={index} product={product}></ProductCard>
      ))}
    </SimpleGrid>
  );
};

export default Products;
