const transporter = require("../config/email");

const sendInvoiceEmail = async (to, pdfBuffer, orderId) => {

     try {


    const info = await transporter.sendMail({
      from: `"MyStore" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Invoice for Order ${orderId}`,
      text: "Your order has been delivered. Invoice attached.",
      attachments: [
        {
          filename: `invoice-${orderId}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }



  await transporter.sendMail({
    from: `"MyStore" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Invoice for Order ${orderId}`,
    text: `Your order has been delivered. Please find the invoice attached.`,
    attachments: [
      {
        filename: `invoice-${orderId}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
};

module.exports = sendInvoiceEmail;
