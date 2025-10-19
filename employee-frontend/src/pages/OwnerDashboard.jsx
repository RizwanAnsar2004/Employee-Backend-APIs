import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";
import { FaBuilding, FaUser, FaTasks } from "react-icons/fa";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const orgId = localStorage.getItem("orgId");

  const fetchDepartments = async () => {
    if (!orgId) return console.warn("No orgId found");
    try {
      const res = await axiosInstance.get(`/department/getByOrg/${orgId}`);
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/employees/getAll");
      const filtered = (res.data.data || []).filter(emp => emp.organizationId === orgId);
      setEmployees(filtered);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, [orgId]);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="OWNER" />
      <div className="flex-1 flex flex-col">
        <Navbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          role="OWNER"
        />

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">Welcome, Owner!</h1>
          <p className="text-gray-600 mt-2">Summary of your organization</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <FaBuilding className="text-purple-600 text-4xl mb-2" />
              <h3 className="text-lg font-medium">Departments</h3>
              <p className="text-gray-600">{departments.length}</p>
              <button
                onClick={() => navigate("/owner/create-department")}
                className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-lg"
              >
                Add Department
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <FaUser className="text-green-600 text-4xl mb-2" />
              <h3 className="text-lg font-medium">Employees</h3>
              <p className="text-gray-600">{employees.length}</p>
              <button
                onClick={() => navigate("/owner/create-employee")}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded-lg"
              >
                Add Employee
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <FaTasks className="text-blue-600 text-4xl mb-2" />
              <h3 className="text-lg font-medium">Pending Tasks</h3>
              <p className="text-gray-600">0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;