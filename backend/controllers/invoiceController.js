const PDFDocument = require("pdfkit");
const Order = require("../models/Order");

const generateInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  // ===== HEADER =====
  doc.fontSize(20).text("INVOICE", { align: "center" });
  doc.moveDown();

  // ===== ORDER INFO =====
  doc.fontSize(10);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Order Date: ${order.createdAt.toDateString()}`);
  doc.text(`Payment Method: ${order.paymentMethod}`);
  doc.text(`Order Status: ${order.orderStatus}`);
  doc.moveDown();

  // ===== CUSTOMER =====
  doc.text(`Customer Email: ${order.user.email}`);
  doc.moveDown();

  // ===== ADDRESS =====
  doc.text("Delivery Address:");
  doc.text(
    `${order.address.name}, ${order.address.hno}, ${order.address.street}`
  );
  doc.text(`${order.address.city} - ${order.address.pincode}`);
  doc.moveDown();

  // ===== ITEMS TABLE =====
  doc.fontSize(12).text("Items:");
  doc.moveDown(0.5);

  order.items.forEach((item, index) => {
    const price =
      item.discountedPrice ?? item.price;

    doc.text(
      `${index + 1}. ${item.name}  | Qty: ${
        item.quantity
      } | ₹${price} × ${item.quantity} = ₹${
        price * item.quantity
      }`
    );
  });

  doc.moveDown();

  // ===== TOTAL =====
  doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
    align: "right",
  });

  doc.end();
};

module.exports = { generateInvoice };
