import { calculateQuantityAndTotal } from "./cart.utils";

describe("Cart util functions", function () {
  describe("calculateQuantityAndTotal", function () {
    it("should calculate quantity and total of cart items (decimals)", function () {
      const cartItems = [
        { quantity: 3, price: 10 },
        { quantity: 10, price: 30.2 },
        { quantity: 5, price: 20.99 },
        { quantity: 12, price: 5.66 },
      ];
      const data = calculateQuantityAndTotal(cartItems);
      expect(data.itemCount).toBe(30);
      expect(data.total).toBe(504.87);
    });

    it("should calculate quantity and total of cart items (no decimals)", function () {
      const cartItems = [
        { quantity: 5, price: 10 },
        { quantity: 2, price: 30 },
        { quantity: 8, price: 20 },
      ];
      const data = calculateQuantityAndTotal(cartItems);
      expect(data.itemCount).toBe(15);
      expect(data.total).toBe(270.0);
    });

    it("should return zeros for empty cart", function () {
      const cartItems = [];
      const data = calculateQuantityAndTotal(cartItems);
      expect(data.itemCount).toBe(0);
      expect(data.total).toBe(0.0);
    });
  });
});
