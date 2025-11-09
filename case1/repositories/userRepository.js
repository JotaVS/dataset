function findById(userId) {
  // Simula busca no banco de dados
  const users = {
    1: { id: "1", username: "admin", name: "Administrator" },
    2: { id: "2", username: "user", name: "Regular User" },
  };

  // Retorna null se usuário não encontrado
  return users[userId] || null;
}

module.exports = {
  findById,
};
