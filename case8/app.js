const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const batchProcessor = require("./services/batchProcessor");

const app = express();
app.use(express.json());

app.post("/api/batch/process", (req, res) => {
  try {
    const { records } = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({ error: "Records must be an array" });
    }

    const result = batchProcessor.processRecords(records);

    res.json({
      processed: result.processed,
      total: result.total,
      results: result.results,
    });
  } catch (error) {
    console.error("Batch processing error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to process batch" });
  }
});

app.post("/api/batch/validate", (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array" });
    }

    const validation = batchProcessor.validateItems(items);

    res.json(validation);
  } catch (error) {
    console.error("Validation error:", error);

    logAndSendError(error, __dirname);

    res.status(500).json({ error: "Failed to validate items" });
  }
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Batch Processor API running on port ${PORT}`);
  console.log(`Try POST: http://localhost:${PORT}/api/batch/process`);
  console.log(`Body: { "records": [{"id": 1}, {"id": 2}, {"id": 3}] }`);
});
