import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      if (data.role !== "admin") {
        showToast("Not an authorized person!");
        // alert("Not an admin");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/admin/dashboard");
    } catch {
      showToast("Invalid credentials!");
      // alert("Invalid credentials");
    }
  };
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };
  return (
    <form onSubmit={submitHandler}>
       {toast && <div className="cart-toast">{toast}</div>}
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
