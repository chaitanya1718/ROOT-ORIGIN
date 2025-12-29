import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function DefaultHeader() {
  return (
    <div>
      <div className="header-hero justify-between px-4 flex items-center shadow-black">
        <img src={logo} alt="Root Origin" style={{ width: "100px" }} />
        <div className="flex gap-4">
          <Link to="/">
            <button className=" hover:text-cyan-400">Home</button>
          </Link>
          
          <Link to="/login">
            <button className=" hover:text-cyan-400">Login</button>
          </Link>
          <Link to="/about">
            <button className=" hover:text-cyan-400">About</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DefaultHeader;
