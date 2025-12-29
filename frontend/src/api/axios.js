import axios from "axios";

const api = axios.create({
  baseURL: "http://172.31.156.216/api",
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

    if (error.response?.status === 401 && !isAuthCheck) {
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
