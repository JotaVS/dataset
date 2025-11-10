const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const inventoryService = require("./services/inventoryService");

const app = express();
app.use(express.json());

app.get("/api/inventory/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await inventoryService.getProduct(productId);

    res.json(product);
  } catch (error) {
    console.error("Inventory error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.post("/api/inventory", async (req, res) => {
  try {
    const productData = req.body;
    const result = await inventoryService.addProduct(productData);

    res.status(201).json(result);
  } catch (error) {
    console.error("Add product error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to add product" });
  }
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Inventory Management API running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/inventory/PROD001`);
});
