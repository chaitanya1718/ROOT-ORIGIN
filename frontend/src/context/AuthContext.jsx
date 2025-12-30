import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [justLoggedIn, setJustLoggedIn] = useState(false);
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const restoreAuth = async () => {
   
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.token) {
     
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser({ ...data, token: storedUser.token });
      } catch {
         localStorage.removeItem("user");
      setUser(null);
        // logout(); // token expired or invalid
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);





  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading,  justLoggedIn,
        setJustLoggedIn, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
