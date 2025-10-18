import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";
import { FaBuilding } from "react-icons/fa";

const OwnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("departments");
  const orgId = localStorage.getItem("orgId");

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get(`/department/getByOrg/${orgId}`);
      setDepartments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/employees/getAll");
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    try {
      await axiosInstance.delete(`/employees/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleDeleteDepartment = async (deptId) => {
    if (!window.confirm("Delete department?")) return;
    try {
      await axiosInstance.delete(`/department/delete/${deptId}`);
      fetchDepartments();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="OWNER" />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="OWNER" />

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">Welcome, Owner!</h1>
          <p className="text-gray-600 mt-2">Manage your departments and employees.</p>

          {/* Tabs */}
          <div className="mt-6 flex gap-4">
            <button onClick={() => setActiveTab("departments")} className={`px-4 py-2 rounded-lg font-medium ${activeTab === "departments" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}>
              Departments
            </button>
            <button onClick={() => setActiveTab("employees")} className={`px-4 py-2 rounded-lg font-medium ${activeTab === "employees" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}>
              Employees
            </button>
          </div>

          {/* Departments Tab */}
          {activeTab === "departments" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {departments.map((dept, idx) => (
                <div key={dept._id} className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{dept.deptName}</h3>
                    <p>Employees: {employees.filter(e => e.departmentId === dept._id).length}</p>
                  </div>
                  <button onClick={() => handleDeleteDepartment(dept._id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              ))}
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === "employees" && (
            <div className="mt-6">
              {employees.map(emp => (
                <div key={emp._id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow mb-2">
                  <div>{emp.firstName} {emp.lastName} - {emp.email}</div>
                  <button onClick={() => handleDeleteEmployee(emp._id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;