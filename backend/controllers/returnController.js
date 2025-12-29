const Order = require("../models/Order");

// ================= REQUEST RETURN =================
const requestReturn = async (req, res) => {
  const userId = req.user.id;
  const { reason } = req.body;

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // ❌ User can only return own orders
  if (order.user.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // ❌ Order must be delivered
  if (order.orderStatus !== "delivered") {
    return res
      .status(400)
      .json({ message: "Order not delivered yet" });
  }

  // 🔴 BULK RETURN RULE
  if (order.orderType === "BULK" && !order.isReturnEligible) {
    return res.status(400).json({
      message: "Bulk orders can be returned only if unsealed",
    });
  }

  // ❌ Already requested
  if (order.returnRequested) {
    return res
      .status(400)
      .json({ message: "Return already requested" });
  }

  // ✅ MARK RETURN REQUEST
  order.returnRequested = true;
  order.returnReason = reason;
  order.returnStatus = "REQUESTED";

  await order.save();

  res.json({ message: "Return request submitted successfully" });
};

// ================= ADMIN: UPDATE RETURN =================
const updateReturnStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.returnStatus = status;

  if (status === "APPROVED") {
    order.orderStatus = "returned";
  }

  await order.save();

  res.json({ message: "Return status updated", order });
};

module.exports = {
  requestReturn,
  updateReturnStatus,
};
