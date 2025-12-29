import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { PiListStarFill } from "react-icons/pi";
import { useRef, useState, useEffect } from "react";

import api from "../api/axios";
import SuggestionsDropdown from "../pages/user/SuggestionsDropdown";
import "./css/header.css";
import logo from "../assets/logo.png";





const Header = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dialog,setDialog]=useState("");

  // 🔹 Fetch all products once (frontend search)
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

    


  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSearch = () => {
    inputRef.current?.focus();
  };

  const handleSearchChange = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    navigate(`/search?q=${value}`);
  };

  const handleSelectSuggestion = (value) => {
    setQuery(value);
    setShowDropdown(false);
    navigate(`/search?q=${value}`);
  };
  const confirmation=()=>{
dialog?setDialog(""):setDialog("yes");
  }

  return (
    <header className="header">

{
  dialog&&(
    <div className="overlay"></div>
  )
}
      {
        dialog&&(

      <div className="dialog-box">
       <p>
        
        Are you sure want to logout?
        </p> 
        <div className="flex justify-end gap-4 m-4">

        <button className="bg-gray-300 px-2 rounded" onClick={confirmation}>cancel</button>
        <button className="bg-red-400 border border-red-600 px-2 rounded" onClick={logout}>yes</button>
        </div>
      </div>
      )
    }
      <div className="nav-container">
        {/* Logo */}
        <h1 className="logo">
          <Link to="/home">
          <img src={logo} alt="Root Origin" style={{width:"100px",height:""}} />
          </Link>
        </h1>

        {/* 🔍 SEARCH */}
        <div className="search bg-white opacity-70 " onClick={toggleSearch} style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, categories, events..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />

          <div>
            <BsSearch />
          </div>

          {/* 🔽 DROPDOWN */}
          {showDropdown && (
            <SuggestionsDropdown
              query={query}
              products={products}
              onSelect={handleSelectSuggestion}
            />
          )}
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links flex items-center">
            
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/bulk-products">Bulk</Link></li>
             <li><Link to="/aboutsec">About</Link></li>
            <li onClick={confirmation} style={{ cursor: "pointer" }} className="text-red-400">Logout</li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="lists">
          <Link to="/orders">
            <PiListStarFill size={25} opacity={0.8} />
          </Link>

          <Link to="/cart">
            <FaCartShopping size={25} />
          </Link>

          <Link to="/account">
            <MdAccountCircle size={25} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
