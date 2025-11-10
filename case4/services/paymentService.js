const payments = new Map();

function parseWebhookPayload(rawBody) {
  const payload = JSON.parse(rawBody);

  return payload;
}

function processPayment(payload) {
  const { status, amount, transactionId } = payload;

  if (!transactionId) {
    throw new Error("Missing transactionId");
  }

  const payment = {
    id: transactionId,
    status,
    amount,
    processedAt: new Date().toISOString(),
  };

  payments.set(transactionId, payment);

  return payment;
}

function getPayment(id) {
  return payments.get(id);
}

module.exports = {
  parseWebhookPayload,
  processPayment,
  getPayment,
};
