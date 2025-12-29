const express = require("express");
const { login, register, resendOtp,verifyOtp,forgotPassword,resetPassword } = require("../controllers/authController");
const {protect}=require('../middleware/authMiddleware');

const router = express.Router();

const { getUserProfile } = require("../controllers/userController");

router.get("/me",protect, getUserProfile);




// POST /api/auth/login
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/resend-otp", resendOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);



module.exports = router;
