function mapToDtoModel(order) {
  return {
    id: order.id,
    amount: order.amount,
    status: order.status,
    createdAt: order.created_at,
    employeeId: order.employee_id,
  };
}

module.exports = {
  mapToDtoModel,
};
