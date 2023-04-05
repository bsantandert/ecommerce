import {
  REMOVE_ITEM,
  ADD_ITEM,
  INCREASE,
  DECREASE,
  SUBMIT,
  CLEAR,
  UPDATE_ITEM,
} from "./CartTypes.js";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        const newCartItems = [...state.cartItems, action.payload];
        return {
          ...state,
          ...sumItems(newCartItems),
          cartItems: newCartItems,
        };
      }

      const updatedCartItems = [
        ...state.cartItems.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
      return {
        ...state,
        ...sumItems(updatedCartItems),
        cartItems: updatedCartItems,
      };

    case REMOVE_ITEM: {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        ...sumItems(newCartItems),
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
      return {
        ...state,
        ...sumItems(updatedCartItems),
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
      return {
        ...state,
        ...sumItems(newCartItems),
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
      return {
        ...state,
        ...sumItems(newCartItems),
        cartItems: newCartItems,
      };
    }

    case SUBMIT:
      return {
        cartItems: [],
        submit: true,
        ...sumItems([]),
      };

    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
      };

    default:
      return state;
  }
};

export default CartReducer;
