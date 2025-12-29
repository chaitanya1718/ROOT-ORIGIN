import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;
