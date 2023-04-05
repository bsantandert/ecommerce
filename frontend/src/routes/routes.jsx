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
const defaultAdminRoute = "/orders";

const routes = [
  <Route path="/" element={<Navigate to="/products" />} />,
  <Route
    path="/products"
    element={!isAdmin ? <Products /> : <Navigate to={defaultAdminRoute} />}
  />,
  <Route
    path="/products/:id"
    element={
      !isAdmin ? <ProductDetails /> : <Navigate to={defaultAdminRoute} />
    }
  />,
  <Route path="/orders" element={<Orders />} />,
  <Route path="/orders/:id" element={<OrderDetails />} />,
  <Route
    path="/cart"
    element={!isAdmin ? <Cart /> : <Navigate to={defaultAdminRoute} />}
  />,
  <Route path="*" element={<NoMatch />} />,
];

export default routes;
