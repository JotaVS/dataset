const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const exportService = require("./services/exportService");

const app = express();
app.use(express.json());

app.get("/api/export/user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const format = req.query.format || "json";

    const exportData = exportService.exportUserData(userId, format);

    res.set("Content-Type", "application/json");
    res.send(exportData);
  } catch (error) {
    console.error("Export error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to export user data" });
  }
});

app.get("/api/export/organization/:orgId", (req, res) => {
  try {
    const { orgId } = req.params;

    const exportData = exportService.exportOrganizationData(orgId);

    res.set("Content-Type", "application/json");
    res.send(exportData);
  } catch (error) {
    console.error("Organization export error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to export organization data" });
  }
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`User Export API running on port ${PORT}`);
  console.log(`Try GET: http://localhost:${PORT}/api/export/user/123`);
});
