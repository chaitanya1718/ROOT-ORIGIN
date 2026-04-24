import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import AdminAuthLayout from "./AdminAuthLayout";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/;

const AdminResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      setSuccess(data.message || "Password reset successful");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthLayout
      title="Choose a New Admin Password"
      subtitle="Use a strong password so access to products, analytics, and order management stays protected."
      footerLinks={[{ to: "/admin/login", label: "Back to admin login" }]}
    >
      <form onSubmit={submitHandler} className="admin-auth-form">
        <label className="admin-auth-label">
          New password
          <input
            className="admin-auth-input"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="admin-auth-label">
          Confirm password
          <input
            className="admin-auth-input"
            type="password"
            placeholder="Repeat your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <p className="admin-auth-note">
          Password must be at least 6 characters and include uppercase,
          lowercase, a number, and a symbol.
        </p>
        {success && <p className="admin-auth-success">{success}</p>}
        {error && <p className="admin-auth-error">{error}</p>}

        <button className="admin-auth-button" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </AdminAuthLayout>
  );
};

export default AdminResetPassword;
