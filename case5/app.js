const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const configService = require("./services/configService");

const app = express();
app.use(express.json());

app.get("/api/config/:environment", (req, res) => {
  try {
    const { environment } = req.params;
    const config = configService.loadConfig(environment);

    res.json({
      environment,
      config,
    });
  } catch (error) {
    console.error("Config loading error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to load configuration" });
  }
});

app.post("/api/config/reload", (req, res) => {
  try {
    const { environment } = req.body;
    configService.reloadConfig(environment);

    res.json({
      message: "Configuration reloaded successfully",
    });
  } catch (error) {
    console.error("Config reload error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to reload configuration" });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Config Loader API running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/config/production`);
});
