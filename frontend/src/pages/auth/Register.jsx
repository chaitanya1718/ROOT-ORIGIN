import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";


// 🔐 Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/;
const mobileRegex = /^\d{10,}$/;
const Register = () => {
  const [step, setStep] = useState("register"); // register | otp

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SEND OTP =================
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 Password strength check
    if (!passwordRegex.test(form.password)) {
      return setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol"
      );
    }
if (!mobileRegex.test(form.mobile)) {
  return setError("Mobile number must contain at least 10 digits and numbers only");
}
    // 🔐 Confirm password check
    if (form.password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await api.post("/auth/register", {
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });

      showToast("OTP sent to your email");
      // alert("OTP sent to your email");
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/verify-otp", {
        email: form.email,
        otp,
      });
showToast("Email verified! Redirecting to Login.");
    setTimeout(()=>{
      navigate("/login");
    },3000)  
    // alert("Email verified! You can now login.");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };

  return (
    <div className="auth-page">
 
  {toast && <div className="cart-toast">{toast}</div>}
      {step === "register" && (
        <form onSubmit={sendOtp}>
          <h2>Register</h2>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

         <input
  name="mobile"
  placeholder="Mobile"
  value={form.mobile}
  onChange={(e) => {
    if (/^\d*$/.test(e.target.value)) {
      handleChange(e);
    }
  }}
  required
/>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <p style={{ fontSize: "12px", color: "#555" }}>
            Password must be at least 6 characters and include uppercase,
            lowercase, number, and symbol.
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}
           <p className="forgot">
        <a href="/login">Existing user?</a>
      </p>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp}>
          <p>Enter OTP sent to {form.email}</p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit OTP"
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Verify OTP</button>
        </form>
      )}

    </div>
  );
};

export default Register;
