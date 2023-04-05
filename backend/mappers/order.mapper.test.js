const orderMapper = require("./order.mapper");
const orderConstants = require("../constants/orders.constant");

describe("Order Mapper functions", function () {
  describe("mapToDtoModel", function () {
    it("should return a dto object model for orders", function () {
      const currentDateTime = new Date().toLocaleDateString(
        "en-US"
      );
      const order = {
        id: 123,
        amount: 123.12,
        status: orderConstants.PENDING,
        created_at: currentDateTime,
        employee_id: 456,
      };
      const orderDto = orderMapper.mapToDtoModel(order);
      expect(orderDto.id).toBe(order.id);
      expect(orderDto.amount).toBe(order.amount);
      expect(orderDto.status).toBe(order.status);
      expect(orderDto.createdAt).toBe(order.created_at);
      expect(orderDto.employeeId).toBe(order.employee_id);
    });
  });
});
