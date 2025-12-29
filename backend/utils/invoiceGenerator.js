const PDFDocument = require("pdfkit");

const path = require("path");




const generateInvoiceBuffer = (order) => {
  return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];
    const logoPath = path.join(__dirname, "../assets/logo.png");

// Add logo
doc.image(logoPath, 40, 30, { width: 120 });

// Move content below logo
doc.moveDown(6);



    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

doc.fontSize(10).text("SMart Pvt Ltd");
doc.text("support@smart.com");
doc.moveDown();
    doc.fontSize(10);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Order Date: ${order.createdAt.toDateString()}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Order Status: ${order.orderStatus}`);
    doc.moveDown();

    doc.text(`Customer: ${order.user.email}`);
    doc.moveDown();

    doc.text("Delivery Address:");
    doc.text(
      `${order.address.name}, ${order.address.hno}, ${order.address.street}`
    );
    doc.text(`${order.address.city} - ${order.address.pincode}`);
    doc.moveDown();

    doc.fontSize(12).text("Items:");
    doc.moveDown(0.5);

    order.items.forEach((item, index) => {
      const price = item.discountedPrice ?? item.price;
      doc.text(
        `${index + 1}. ${item.name} | Qty: ${
          item.quantity
        } | ₹${price * item.quantity}`
      );
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: ₹${order.totalAmount}`, { align: "right" });

    doc.end();
  });
};

module.exports = generateInvoiceBuffer;
