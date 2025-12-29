const Cart = require("../models/Cart");
const Order = require("../models/Order");
const generateInvoiceBuffer = require("../utils/invoiceGenerator");
const sendInvoiceEmail = require("../utils/sendInvoiceEmail");

// Place order
const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { address, paymentMethod, eventType } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const isBulkOrder = cart.items.some(item => item.orderType === "BULK");

  const items = cart.items.map(i => {
    const discount = i.product.discount || 0;
    const discountedPrice = i.product.price - (i.product.price * discount)/100;
    return {
      product: i.product._id,
      name: i.product.name,
      price: i.product.price,
      discount,
      quantity: i.quantity,
      discountedPrice,
      tag: i.product.tag,
    };
  });

  const subtotal = items.reduce((sum,i) => sum + i.discountedPrice*i.quantity, 0);
  const deliveryFee = isBulkOrder ? 0 : subtotal*0.1;
  const totalAmount = subtotal + deliveryFee;

  const order = await Order.create({
    user: userId,
    items,
    address,
    subtotal,
    deliveryFee,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
    orderStatus: "placed",
    orderType: isBulkOrder ? "BULK" : "NORMAL",
    eventType: isBulkOrder ? eventType : null,
    isReturnEligible: isBulkOrder,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// Other controllers
const getMyOrders = async (req,res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};

const getAllOrders = async (req,res) => {
  const filter = {};
  if (req.query.type === "bulk") filter.orderType = "BULK";
  const orders = await Order.find(filter).populate("user", "email").sort({ createdAt:-1 });
  res.json(orders);
};

const updateOrderStatus = async (req,res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.orderStatus = status;
  await order.save();

  if(status==="delivered") {
    const pdfBuffer = await generateInvoiceBuffer(order);
    await sendInvoiceEmail(order.user.email, pdfBuffer, order._id);
  }

  res.json(order);
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
