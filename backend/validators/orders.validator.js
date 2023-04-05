const yup = require("yup");
const orderConstants = require("../constants/orders.constant");

const orderSchema = yup
  .object({
    amount: yup.string().required(),
    status: yup
      .string()
      .required()
      .oneOf([orderConstants.PENDING, orderConstants.COMPLETED]),
    employeeId: yup.number().optional().min(1),
    products: yup.array().required().min(1),
  })
  .required();

module.exports = {
  orderSchema,
};
