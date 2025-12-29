import { useState } from "react";
import api from "../../api/axios";
import './Register.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message || "Reset link sent to email");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="auth-page">

      <form onSubmit={submitHandler}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
      </form>

    </div>
  );
};

export default ForgotPassword;
