async function getProduct(productId) {
  const dbConnection = require("../databse/connection");
  const db = await dbConnection.getDatabase();

  const product = await db.products.findOne({ id: productId });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

async function addProduct(productData) {
  const dbConnection = require("../databse/connection");
  const db = await dbConnection.getDatabase();

  const newProduct = {
    id: `PROD${Date.now()}`,
    ...productData,
    createdAt: new Date().toISOString(),
  };

  await db.products.insert(newProduct);

  return newProduct;
}

async function updateStock(productId, quantity) {
  const db = await dbConnection.getDatabase();

  await db.products.update({ id: productId }, { $set: { stock: quantity } });

  return { productId, stock: quantity };
}

module.exports = {
  getProduct,
  addProduct,
  updateStock,
};
