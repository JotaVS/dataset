const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const analyticsService = require("./services/analyticsService");

const app = express();
app.use(express.json());

app.post("/api/analytics/calculate", (req, res) => {
  try {
    const { metrics } = req.body;

    if (!Array.isArray(metrics)) {
      return res.status(400).json({ error: "Metrics must be an array" });
    }

    const results = analyticsService.calculateMetrics(metrics);

    res.json(results);
  } catch (error) {
    console.error("Analytics calculation error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to calculate metrics" });
  }
});

app.get("/api/analytics/report/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    const report = analyticsService.generateUserReport(userId);

    res.json(report);
  } catch (error) {
    console.error("Report generation error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to generate report" });
  }
});

const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Analytics API running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/analytics/report/user123`);
});
