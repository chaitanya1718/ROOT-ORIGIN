const razorpay = require("../utils/razorpay");

const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  res.json(order);
};

module.exports = { createRazorpayOrder };
