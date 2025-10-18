import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);

  // Get role from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userRole = payload.roleID || payload.role || payload.roleId;
        setRole(Number(userRole));
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  if (!role) return null; // wait until role is loaded

  const superAdminItems = [
    { name: "Dashboard", path: "/superadmin/dashboard" },
    { name: "Banks", path: "/banks" },
    { name: "Organizations", path: "/organizations" },
  ];

  const ownerItems = [
    { name: "Dashboard", path: "/owner/dashboard" },
    { name: "Departments", path: "/owner/departments" },
    { name: "Employees", path: "/owner/employees" },
  ];

  const menuItems = role === 1 ? superAdminItems : ownerItems;

  const renderMenu = () =>
    menuItems.map((item) => (
      <button
        key={item.name}
        onClick={() => navigate(item.path)}
        className={`text-left px-4 py-2 rounded-xl w-full font-medium transition
          ${location.pathname === item.path
            ? "bg-purple-600 text-white shadow-md"
            : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"}`}
      >
        {item.name}
      </button>
    ));

  return (
    <div className="w-64 h-screen flex flex-col justify-between p-6 bg-white shadow-lg rounded-r-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">EMS Admin</h2>
        <nav className="flex flex-col gap-3">{renderMenu()}</nav>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="mt-6 w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-xl shadow hover:scale-105 transition transform font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;