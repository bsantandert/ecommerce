import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import CartState from "./context/cart/CartState";
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartState>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <App />
        <Notifications position="top-right" />
      </BrowserRouter>
    </MantineProvider>
  </CartState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
