const express = require("express");
const app = express();

app.use(express.json());

function getUserProfile(userId) {
  // Simula busca de perfil do usuário
  const profiles = {
    1: { id: "1", name: "João Silva", email: "joao@email.com" },
    2: { id: "2", name: "Maria Santos", email: "maria@email.com" },
  };

  return profiles[userId];
}

function processUserData(userId) {
  const profile = getUserProfile(userId);

  // Processa dados do usuário
  const formattedData = {
    id: profile.id,
    displayName: profile.name,
    contact: profile.email,
    lastUpdate: userData.timestamp, // variável não definida
  };

  return formattedData;
}

app.get("/api/profile/:userId", (req, res) => {
  try {
    const result = processUserData(req.params.userId);
    res.json(result);
  } catch (error) {
    console.error("Error processing request:", error);

    // Envia notificação de erro para webhook
    fetch("http://localhost:4000/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errorPayload: error.stack,
      }),
    }).catch((err) => console.error("Failed to send webhook:", err));

    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/profile/1`);
});
