const categories = {
  1: {
    id: "1",
    name: "Electronics",
    childrenIds: ["2", "3"],
    products: [],
  },
  2: {
    id: "2",
    name: "Computers",
    childrenIds: ["1"],
    products: ["Laptop", "Desktop"],
  },
  3: {
    id: "3",
    name: "Mobile",
    childrenIds: ["4"],
    products: ["iPhone", "Android"],
  },
  4: {
    id: "4",
    name: "Accessories",
    childrenIds: ["3"],
    products: ["Case", "Charger"],
  },
};

function getCategoryById(categoryId) {
  return categories[categoryId] || null;
}

function getAllCategories() {
  return Object.values(categories);
}

module.exports = {
  getCategoryById,
  getAllCategories,
};
