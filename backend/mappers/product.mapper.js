function mapToDtoModel(product) {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    imageUrl: product.image_url,
    quantity: product.quantity,
  };
}

module.exports = {
  mapToDtoModel,
};
