import {
  REMOVE_ITEM,
  ADD_ITEM,
  INCREASE,
  DECREASE,
  SUBMIT,
  CLEAR,
  UPDATE_ITEM,
} from "./CartTypes.js";
import {
  calculateQuantityAndTotal,
  setCartItems,
} from "../../utils/cart.utils.js";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        const newCartItems = [...state.cartItems, action.payload];
        setCartItems(newCartItems);
        return {
          ...state,
          ...calculateQuantityAndTotal(newCartItems),
          cartItems: newCartItems,
        };
      }

      const updatedCartItems = [
        ...state.cartItems.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
      setCartItems(updatedCartItems);
      return {
        ...state,
        ...calculateQuantityAndTotal(updatedCartItems),
        cartItems: updatedCartItems,
      };

    case REMOVE_ITEM: {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      setCartItems(newCartItems);
      return {
        ...state,
        ...calculateQuantityAndTotal(newCartItems),
        cartItems: newCartItems,
      };
    }

    case UPDATE_ITEM: {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      return {
        ...state,
        ...calculateQuantityAndTotal(updatedCartItems),
        cartItems: updatedCartItems,
      };
    }

    case INCREASE: {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + action.payload.quantity;
        }
        return item;
      });
      setCartItems(newCartItems);
      return {
        ...state,
        ...calculateQuantityAndTotal(newCartItems),
        cartItems: newCartItems,
      };
    }

    case DECREASE: {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity - action.payload.quantity;
        }
        return item;
      });
      setCartItems(newCartItems);
      return {
        ...state,
        ...calculateQuantityAndTotal(newCartItems),
        cartItems: newCartItems,
      };
    }

    case SUBMIT:
      setCartItems([]);
      return {
        cartItems: [],
        ...calculateQuantityAndTotal([]),
      };

    case CLEAR:
      setCartItems([]);
      return {
        cartItems: [],
        ...calculateQuantityAndTotal([]),
      };

    default:
      return state;
  }
};

export default CartReducer;
