const EmailOtp = require("../models/EmailOtp");
const User = require("../models/User");
const sendOtpEmail = require("../utils/sendOtpEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResetEmail = require("../utils/sendResetEmail");
const validatePassword = require("../utils/validatePassword");




// ================= USER REGISTER =================
const register = async (req, res) => {
  const { email, mobile, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!validatePassword(password)) {
  return res.status(400).json({
    message:
      "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol",
  });
}

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Remove old OTPs for this email
  await EmailOtp.deleteMany({ email });

  // Save OTP temporarily (password NOT hashed yet)
  await EmailOtp.create({
    email,
    mobile,
    password,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });

  // Send OTP email
  await sendOtpEmail(email, otp);

  res.json({
    message: "OTP sent to email. Please verify to complete registration.",
  });
};


// ================= VERIFY OTP & CREATE USER =================
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await EmailOtp.findOne({ email, otp });
  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < new Date()) {
    await EmailOtp.deleteOne({ _id: record._id });
    return res.status(400).json({ message: "OTP expired" });
  }

  // Hash password now


  const user = await User.create({
    email: record.email,
    mobile: record.mobile,
    password: record.password,
    role: "user",
  });

  // Remove OTP record
  await EmailOtp.deleteOne({ _id: record._id });

  res.status(201).json({
    message: "Email verified successfully. Account created.",
    userId: user._id,
  });
};






// ================= LOGIN (USER + ADMIN) =================
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
    token,
  });
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  // Check if user already verified
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already verified" });
  }

  // Generate new OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Remove old OTPs
  await EmailOtp.deleteMany({ email });

  await EmailOtp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  await sendOtpEmail(email, otp);

  res.json({ message: "OTP resent successfully" });
};

// ================= FORGOT PASSWORD =================
// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // ✅ Always respond success (security)
  if (!user) {
    return res.json({
      message: "If an account with this email exists, a reset link has been sent",
    });
  }

  const resetToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  await sendResetEmail(user.email, resetLink);

  res.json({
    message: "If an account with this email exists, a reset link has been sent",
  });
};


// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const user = await User.findOne({
    _id: decoded.id,
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
if (!validatePassword(password)) {
  return res.status(400).json({
    message:
      "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol",
  });
}

user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};



module.exports = { register, verifyOtp, login, resendOtp, forgotPassword, resetPassword };

