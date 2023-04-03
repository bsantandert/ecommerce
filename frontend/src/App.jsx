import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AppShell, Loader } from "@mantine/core";
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const NoMatch = lazy(() => import("./pages/NoMatch"));

const App = () => {
  return (
    <>
      <AppShell padding="md" header={<NavBar></NavBar>}>
        <Suspense fallback={<Loader></Loader>}>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<OrderDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </AppShell>
    </>
  );
};

export default App;
