// src/pages/OdontologoDashboard/Header.jsx
import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
      <div className="flex items-center gap-4">
        <FaBell size={20} className="text-gray-600 cursor-pointer" />
        <FaUserCircle size={30} className="text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
