const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const paymentService = require("./services/paymentService");

const app = express();

app.use(express.text({ type: "application/json" }));

app.post("/api/webhooks/payment", (req, res) => {
  try {
    const payload = paymentService.parseWebhookPayload(req.body);

    const result = paymentService.processPayment(payload);

    res.json({
      success: true,
      transactionId: result.transactionId,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);

    logAndSendError(error, __dirname);

    res.status(400).json({ error: "Invalid webhook payload" });
  }
});

app.get("/api/payments/:id", (req, res) => {
  const payment = paymentService.getPayment(req.params.id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: "Payment not found" });
  }
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Payment Webhook API running on port ${PORT}`);
  console.log(`Try POST: http://localhost:${PORT}/api/webhooks/payment`);
  console.log(`Content-Type: application/json`);
  console.log(
    `Body: {"status":"approved","amount":100,"transactionId":"TX123",}`
  );
});
