import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <header style={{ padding: "1rem", background: "#111", color: "#fff" }}>
      <Link to="/admin/dashboard" style={{ marginRight: "1rem" }}>
        Dashboard
      </Link>
      <Link to="/admin/products" style={{ marginRight: "1rem" }}>
        Products
      </Link>
       <Link to="/admin/orders" style={{ marginRight: "1rem" }}>
       Orders
      </Link>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default AdminHeader;
