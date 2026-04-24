import { useState } from "react";
import "./Account.css";
import Orders from "../orders/Orders";
import Address from "./Address";
import SubscriptionDetails from "./SubscriptionDetails";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import boy from "../../assets/boy.png";
import girl from "../../assets/girl.png";
import { FaMale, FaFemale } from "react-icons/fa";

const Account = () => {
  const [section, setSection] = useState("membership");
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState(() => localStorage.getItem("gender") || "female");
  const { logout } = useAuth();

  const handleForgotPassword = async () => {
    try {
      await api.post("/auth/forgot-password", {
        email: user.email,
      });
      setMessage("Password reset email sent. Please check your inbox.");
    } catch {
      setMessage("Failed to send reset email");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="account-container">
      <div className="details border-2 border-cyan-300 p-4 rounded-xl">
        <h2>My Account</h2>

        <div className="profile-section">
          <img key={gender} src={gender === "male" ? boy : girl} alt="Profile" className="profile-img" />

          <div className="flex gap-2">
            <div
              onClick={() => {
                setGender("male");
                localStorage.setItem("gender", "male");
              }}
            >
              <FaMale size={20} />
            </div>
            <div
              onClick={() => {
                setGender("female");
                localStorage.setItem("gender", "female");
              }}
            >
              <FaFemale size={20} />
            </div>
          </div>
        </div>

        <div className="account-form">
          <h3>Account Details</h3>

          <div className="readonly-field">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <h3 className="mt-4">Security</h3>

          <button className="reset-btn" onClick={handleForgotPassword}>
            Reset Password
          </button>

          <button className="rounded mt-1 bg-red-300! text-black! border-2! border-red-400!" onClick={logout}>
            Logout
          </button>

          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
        </div>
      </div>

      <div className="acc-summary border-2 border-cyan-300 rounded-xl">
        <div className="flex">
          <span className="tab" onClick={() => setSection("membership")}>
            MEMBERSHIP
          </span>
          <span className="tab" onClick={() => setSection("orders")}>
            ORDERS
          </span>
          <span className="tab" onClick={() => setSection("address")}>
            ADDRESS
          </span>
        </div>

        <div className="section-content">
          {section === "orders" ? <Orders /> : section === "address" ? <Address /> : <SubscriptionDetails />}
        </div>
      </div>
    </div>
  );
};

export default Account;
