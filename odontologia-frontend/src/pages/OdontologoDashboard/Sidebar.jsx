// src/pages/OdontologoDashboard/Sidebar.jsx
import React, { useState } from "react";
import { FaBars, FaUserMd, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`bg-blue-900 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 focus:outline-none hover:bg-blue-800"
      >
        <FaBars size={20} />
      </button>

      <div className="flex flex-col items-center mt-4">
        {!collapsed && <h2 className="text-xl font-bold">Odontólogo</h2>}
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        <a
          href="#"
          className="flex items-center gap-2 p-2 hover:bg-blue-800 rounded"
        >
          <FaUserMd />
          {!collapsed && <span>Perfil</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-2 p-2 hover:bg-blue-800 rounded"
        >
          <FaCalendarAlt />
          {!collapsed && <span>Citas</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-2 p-2 hover:bg-blue-800 rounded"
        >
          <FaChartLine />
          {!collapsed && <span>Estadísticas</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
