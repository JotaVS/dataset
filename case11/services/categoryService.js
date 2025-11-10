const categoryRepository = require("../repositories/categoryRepository");

function buildCategoryTree(categoryId, includeProducts) {
  const category = categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const tree = {
    id: category.id,
    name: category.name,
    children: [],
  };

  if (category.childrenIds && category.childrenIds.length > 0) {
    for (const childId of category.childrenIds) {
      const childTree = buildCategoryTree(childId, includeProducts);
      tree.children.push(childTree);
    }
  }

  if (includeProducts && category.products) {
    tree.products = category.products;
  }

  return tree;
}

function calculateDepth(categoryId, currentDepth = 0) {
  const category = categoryRepository.getCategoryById(categoryId);

  if (!category) {
    return currentDepth;
  }

  if (!category.childrenIds || category.childrenIds.length === 0) {
    return currentDepth + 1;
  }

  let maxDepth = currentDepth + 1;

  for (const childId of category.childrenIds) {
    const childDepth = calculateDepth(childId, currentDepth + 1);
    if (childDepth > maxDepth) {
      maxDepth = childDepth;
    }
  }

  return maxDepth;
}

module.exports = {
  buildCategoryTree,
  calculateDepth,
};
