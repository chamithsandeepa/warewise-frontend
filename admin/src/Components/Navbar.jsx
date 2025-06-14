import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    onLogout(); // Update login state in App
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
      <button
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
