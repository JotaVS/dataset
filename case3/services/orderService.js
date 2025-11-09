const paymentGateway = require("../gateways/paymentGateway");

const orders = new Map();
let orderIdCounter = 1;

async function processOrder(userId, items) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const orderId = `ORD-${orderIdCounter++}`;
  const total = items.reduce((sum, item) => sum + (item.qty || 0) * 10, 0);

  const order = {
    id: orderId,
    userId,
    items,
    total,
    status: "processing",
    createdAt: new Date().toISOString(),
  };

  orders.set(orderId, order);

  const payment = await paymentGateway.processPayment(orderId, total);

  order.status = "confirmed";
  order.paymentId = payment.id;

  return order;
}

async function notifyUser(order) {
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (order.total > 100) {
    throw new Error(
      `Notification service unavailable for high-value order ${order.id}`
    );
  }

  return {
    orderId: order.id,
    sent: true,
    method: "email",
  };
}

async function getOrderStatus(orderId) {
  const order = orders.get(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
}

module.exports = {
  processOrder,
  notifyUser,
  getOrderStatus,
};
