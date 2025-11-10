const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const categoryService = require("./services/categoryService");

const app = express();
app.use(express.json());

app.get("/api/categories/:categoryId/tree", (req, res) => {
  try {
    const { categoryId } = req.params;
    const includeProducts = req.query.includeProducts === "true";

    const tree = categoryService.buildCategoryTree(categoryId, includeProducts);

    res.json(tree);
  } catch (error) {
    console.error("Category tree error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to build category tree" });
  }
});

app.get("/api/categories/:categoryId/depth", (req, res) => {
  try {
    const { categoryId } = req.params;

    const depth = categoryService.calculateDepth(categoryId);

    res.json({ categoryId, depth });
  } catch (error) {
    console.error("Depth calculation error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to calculate depth" });
  }
});

const PORT = 3011;
app.listen(PORT, () => {
  console.log(`Category Tree API running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/categories/1/tree`);
});
