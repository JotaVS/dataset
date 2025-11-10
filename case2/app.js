const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const path = require("path");
const app = express();

app.use(express.json());

function getUserProfile(userId) {
  const profiles = {
    1: { id: "1", name: "João Silva", email: "joao@email.com" },
    2: { id: "2", name: "Maria Santos", email: "maria@email.com" },
  };

  return profiles[userId];
}

function processUserData(userId) {
  const profile = getUserProfile(userId);

  const formattedData = {
    id: profile.id,
    displayName: profile.name,
    contact: profile.email,
    lastUpdate: userData.timestamp,
  };

  return formattedData;
}

app.get("/api/profile/:userId", (req, res) => {
  try {
    const result = processUserData(req.params.userId);
    res.json(result);
  } catch (error) {
    console.error("Error processing request:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/profile/1`);
});
