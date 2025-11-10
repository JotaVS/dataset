const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const path = require("path");
const orderService = require("./services/orderService");

const app = express();
app.use(express.json());

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  logAndSendError(reason, __dirname);
});

app.post("/api/orders", async (req, res) => {
  const { userId, items } = req.body;

  orderService
    .processOrder(userId, items)
    .then((order) => {
      console.log("Order processed successfully:", order.id);
      return orderService.notifyUser(order);
    })
    .then((notification) => {
      console.log("User notified:", notification);
    });

  res.status(202).json({
    message: "Order received and being processed",
    status: "pending",
  });
});

app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await orderService.getOrderStatus(req.params.orderId);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: "Order not found" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Order Processing API running on port ${PORT}`);
  console.log(`Try POST: http://localhost:${PORT}/api/orders`);
  console.log(
    `Body: { "userId": "user123", "items": [{"id": "item1", "qty": 2}] }`
  );
});
