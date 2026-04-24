import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

});

// 🔹 REQUEST: attach token
api.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  } else if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

// 🔹 RESPONSE: handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheck = error.config?.url?.includes("/auth/me");
    const isAdminPath = window.location.pathname.startsWith("/admin");
    const hasAdminSession = Boolean(localStorage.getItem("admin"));

    if (error.response?.status === 401 && !isAuthCheck) {
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("userInfo");
      window.location.href =
        isAdminPath || hasAdminSession ? "/admin/login" : "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
