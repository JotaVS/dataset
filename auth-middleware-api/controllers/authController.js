const authService = require("../services/authService");

function login(req, res) {
  const { username, password } = req.body;

  const result = authService.authenticate(username, password);

  if (result.success) {
    res.json({
      token: result.token,
      user: result.user,
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
}

function getDashboard(req, res) {
  try {
    const userId = req.headers["user-id"];
    const dashboardData = authService.getDashboardData(userId);

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);

    // Envia notificação de erro para webhook
    fetch("http://localhost:4000/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errorPayload: error.stack,
      }),
    }).catch((err) => console.error("Failed to send webhook:", err));

    res.status(500).json({ error: "Failed to load dashboard" });
  }
}

module.exports = {
  login,
  getDashboard,
};
