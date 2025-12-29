import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import './Register.css';
import { useAuth } from "../../context/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
const { setUser, setJustLoggedIn } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });


      localStorage.setItem("user", JSON.stringify(data));
setUser(data);

setJustLoggedIn(true);

navigate("/home");

      // localStorage.setItem("user", JSON.stringify(data));
      // navigate("/"); // ✅ HOME PAGE
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
  <div className="auth-page">
     {toast && <div className="cart-toast">{toast}</div>}
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
<p className="forgot">
        <a href="/register">New user?</a>
      </p>
      <p className="forgot">
        <a href="/forgot-password">Forgot password?</a>
      </p>



      <button type="submit">Login</button>
    </form>
  </div>
);

};

export default Login;
