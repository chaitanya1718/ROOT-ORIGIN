import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Home from "./pages/user/Home.jsx";
import Cart from "./pages/user/Cart.jsx";
import Account from "./pages/user/Account.jsx";
import Messages from "./pages/user/Messages.jsx";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import BulkProducts from "./pages/BulkProducts";
import CategoriesPage from "./pages/user/CategoriesPage.jsx";
import SearchResults from "./pages/user/SearchResults.jsx";
import CurrentDeals from "./components/CurrentDeals.jsx";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Hero from "./pages/Hero.jsx";
import Aboutsec from "./components/Aboutsec.jsx";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import Analytics from "./pages/admin/Analytics.jsx";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
// import CategoriesPage from "./pages/user/Categories.jsx";
import About from "./components/About.jsx";

function App() {
  return (
    <div>
      <Routes>
        {/* user paths */}

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<UserLayout />}>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:categoryName"
            element={<CategoriesPage />}
          />
          <Route path="/bulk-products" element={<BulkProducts />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/aboutsec" element={<Aboutsec />} />
          <Route path="/deals" element={<CurrentDeals />} />
        </Route>

        {/* admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route
          path="/admin/reset-password/:token"
          element={<AdminResetPassword />}
        />

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
