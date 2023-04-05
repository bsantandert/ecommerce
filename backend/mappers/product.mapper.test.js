const productMapper = require("./product.mapper");

describe("Product Mapper functions", function () {
  describe("mapToDtoModel", function () {
    it("should return a dto object model for products", function () {
      const product = {
        id: 123,
        sku: "iphone13",
        name: "iPhone 13",
        description: "Amazing iPhone 13",
        stock: 20,
        quantity: 3,
        price: 20.8,
        image_url: "http://image.com",
      };
      const productDto = productMapper.mapToDtoModel(product);
      expect(productDto.id).toBe(product.id);
      expect(productDto.sku).toBe(product.sku);
      expect(productDto.name).toBe(product.name);
      expect(productDto.description).toBe(product.description);
      expect(productDto.stock).toBe(product.stock);
      expect(productDto.quantity).toBe(product.quantity);
      expect(productDto.price).toBe(product.price);
      expect(productDto.imageUrl).toBe(product.image_url);
    });
  });
});
