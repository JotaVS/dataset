let database = null;

async function getDatabase() {
  if (database) {
    return database;
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  database = {
    products: {
      findOne: async (query) => {
        const mockProducts = {
          PROD001: { id: "PROD001", name: "Laptop", stock: 10, price: 999 },
          PROD002: { id: "PROD002", name: "Mouse", stock: 50, price: 29 },
        };
        return mockProducts[query.id] || null;
      },
      insert: async (data) => {
        return data;
      },
      update: async (query, update) => {
        return { modified: 1 };
      },
    },
  };

  return database;
}

function closeConnection() {
  database = null;
}

module.exports = {
  getDatabase,
  closeConnection,
};
