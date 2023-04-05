import { CART_ITEMS_KEY } from "../constants/cart.constants";

const getCartItems = () => {
  return localStorage.getItem(CART_ITEMS_KEY)
    ? JSON.parse(localStorage.getItem(CART_ITEMS_KEY))
    : [];
};

const setCartItems = (cartItems) => {
  localStorage.setItem(
    CART_ITEMS_KEY,
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

const calculateQuantityAndTotal = (cartItems) => {
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = parseFloat(
    cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2)
  );
  return { itemCount, total };
};

export { getCartItems, setCartItems, calculateQuantityAndTotal };
