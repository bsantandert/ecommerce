import { lazy } from "react";
import { isCurrentUserAdmin } from "../utils/user.utils";
import { Route, Navigate } from "react-router-dom";

const Orders = lazy(() => import("../pages/Orders"));
const OrderDetails = lazy(() => import("../pages/OrderDetails"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const NoMatch = lazy(() => import("../pages/NoMatch"));

const isAdmin = isCurrentUserAdmin();

const routes = [
  <Route
    path="/products"
    element={!isAdmin ? <Products /> : <Navigate to="/orders" />}
  />,
  <Route path="/orders" element={<Orders />} />,
  <Route path="/orders/:id" element={<OrderDetails />} />,
  <Route
    path="/cart"
    element={!isAdmin ? <Cart /> : <Navigate to="/orders" />}
  />,
  <Route
    path="/products/:id"
    element={!isAdmin ? <ProductDetails /> : <Navigate to="/orders" />}
  />,
  <Route path="*" element={<NoMatch />} />,
];

export default routes;
