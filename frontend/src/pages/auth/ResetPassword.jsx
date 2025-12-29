import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import './Register.css';

// 🔐 Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // ================= SUBMIT HANDLER =================
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 Password strength check
    if (!passwordRegex.test(password)) {
      return setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol"
      );
    }

    // 🔐 Confirm password check
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      showToast(data.message || "Password reset successful");
      // alert(data.message || "Password reset successful");
      setTimeout(()=>{navigate("/login")},3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
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

      <form onSubmit={submitHandler}>
      <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <p style={{ fontSize: "12px", color: "#555" }}>
          Password must be at least 6 characters and include uppercase,
          lowercase, number, and symbol.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
