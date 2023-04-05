import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products.api";
import { SimpleGrid, Container, Autocomplete } from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const productOptions = products.map((p) => p.name);

  useEffect(() => {
    const searchString = searchParams.get("search");
    const getProducts = async () => {
      const products = await fetchProducts(searchString);
      setProducts(products.data);
    };
    getProducts();
  }, [searchParams]);

  const search = (value) => {
    setSearchParams(`search=${value}`);
  };

  return (
    <Container>
      <Autocomplete
        label="Search"
        placeholder="Search Product"
        rightSection={<IconSearch size="1rem" />}
        style={{ marginBottom: "10px" }}
        onChange={search}
        data={productOptions}
      />

      <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
        {products.map((product, index) => (
          <ProductCard key={index} product={product}></ProductCard>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;
