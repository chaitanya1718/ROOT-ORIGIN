import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import AdminAuthLayout from "./AdminAuthLayout";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      if (data.role !== "admin") {
        localStorage.removeItem("admin");
        localStorage.removeItem("userInfo");
        showToast("Not an authorized person!");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data));
      localStorage.removeItem("userInfo");
      navigate("/admin/dashboard");
    } catch {
      showToast("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };
  return (
    <AdminAuthLayout
      title="Admin Login"
      subtitle="Sign in to manage products, fulfill orders, and monitor storefront performance."
      footerLinks={[
        { to: "/admin/forgot-password", label: "Forgot password?" },
        { to: "/login", label: "User login" },
      ]}
    >
      <form onSubmit={submitHandler} className="admin-auth-form">
        {toast && <p className="admin-auth-error">{toast}</p>}

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

        <label className="admin-auth-label">
          Password
          <input
            className="admin-auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <p className="admin-auth-note">
          Need recovery access? Use the{" "}
          <Link to="/admin/forgot-password">admin reset flow</Link> so the email
          link returns to the admin portal.
        </p>

        <button className="admin-auth-button" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login to Admin"}
        </button>
      </form>
    </AdminAuthLayout>
  );
};

export default AdminLogin;
