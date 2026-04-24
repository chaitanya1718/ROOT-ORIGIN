const transporter = require("../config/email");

const sendResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"Root Origin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};

module.exports = sendResetEmail;
