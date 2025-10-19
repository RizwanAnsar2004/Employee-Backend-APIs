import React from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  // ✅ Read role directly from localStorage
  const storedRole = localStorage.getItem("role");
  const displayRole = storedRole?.toUpperCase() || "OWNER";

  return (
    <div className="bg-white/70 backdrop-blur-md shadow-md p-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <FaBars size={20} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 transition-all duration-300">
          {displayRole === "SUPERADMIN"
            ? "Super Admin Dashboard"
            : "Owner Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800 transition">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 transition">
          <FaUserCircle size={24} className="text-gray-600" />
          <span className="text-gray-700 font-medium">
            {displayRole === "SUPERADMIN" ? "Super Admin" : "Owner"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;