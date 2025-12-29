const transporter = require("../config/email");

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"MyStore" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your verification OTP",
    html: `
      <h3>Email Verification</h3>
      <p>Your OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP expires in 5 minutes.</p>
    `,
  });
};

module.exports = sendOtpEmail;
