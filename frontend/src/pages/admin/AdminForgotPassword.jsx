import { useState } from "react";
import api from "../../api/axios";
import AdminAuthLayout from "./AdminAuthLayout";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { data } = await api.post("/auth/forgot-password", {
        email,
        resetPath: "/admin/reset-password",
      });
      setMessage(data.message || "Reset link sent to email");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthLayout
      title="Admin Password Reset"
      subtitle="Enter your admin email and we will send a secure reset link for the admin portal."
      footerLinks={[
        { to: "/admin/login", label: "Back to admin login" },
        { to: "/login", label: "User login" },
      ]}
    >
      <form onSubmit={submitHandler} className="admin-auth-form">
        <label className="admin-auth-label">
          Admin email
          <input
            className="admin-auth-input"
            type="email"
            placeholder="admin@rootorigin.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {message && <p className="admin-auth-success">{message}</p>}
        {error && <p className="admin-auth-error">{error}</p>}

        <button className="admin-auth-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </AdminAuthLayout>
  );
};

export default AdminForgotPassword;
