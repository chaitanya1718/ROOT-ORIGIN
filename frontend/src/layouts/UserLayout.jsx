import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect,useState } from "react";
import {useAuth} from "../context/AuthContext";


const UserLayout = () => {
   const { justLoggedIn, setJustLoggedIn } = useAuth();
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (justLoggedIn) {
      setToast("Login successful 🎉");
      setJustLoggedIn(false);

      setTimeout(() => setToast(""), 3000);
    }
  }, [justLoggedIn]);

  return (
    <>
     {toast && <div className="cart-toast">{toast}</div>}
      <Header />
      <Outlet />
    </>
  );
};

export default UserLayout;
