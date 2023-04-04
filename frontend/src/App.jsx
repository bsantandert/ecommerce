import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AppShell, Loader } from "@mantine/core";
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const NoMatch = lazy(() => import("./pages/NoMatch"));

const App = () => {
  return (
    <>
      <AppShell padding="md" header={<NavBar></NavBar>}>
        <Suspense fallback={<Loader></Loader>}>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </AppShell>
    </>
  );
};

export default App;
