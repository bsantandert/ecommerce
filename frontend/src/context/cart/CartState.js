import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer, { sumItems } from "./CartReducer";
import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  INCREASE,
  DECREASE,
  SUBMIT,
  CLEAR,
} from "./CartTypes";

const storage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const CartState = ({ children }) => {
  const initialState = {
    cartItems: storage,
    ...sumItems(storage),
    checkout: false,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addItem = (payload) => {
    dispatch({ type: ADD_ITEM, payload });
  };

  const increase = (payload) => {
    dispatch({ type: INCREASE, payload });
  };

  const decrease = (payload) => {
    dispatch({ type: DECREASE, payload });
  };

  const removeItem = (payload) => {
    dispatch({ type: REMOVE_ITEM, payload });
  };

  const updateItem = (payload) => {
    dispatch({ type: UPDATE_ITEM, payload });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  const handleCheckout = () => {
    dispatch({ type: SUBMIT });
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addItem,
        removeItem,
        updateItem,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
