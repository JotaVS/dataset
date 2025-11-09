let paymentIdCounter = 1;

async function processPayment(orderId, amount) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  if (amount <= 0) {
    throw new Error("Invalid payment amount");
  }

  const payment = {
    id: `PAY-${paymentIdCounter++}`,
    orderId,
    amount,
    status: "approved",
    processedAt: new Date().toISOString(),
  };

  return payment;
}

module.exports = {
  processPayment,
};
