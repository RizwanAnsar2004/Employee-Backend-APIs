import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import axiosInstance from "../api/axiosInstance";

const OwnerCreateEmp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const orgId = localStorage.getItem("orgId");

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/employees/getAll");
      setEmployees(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      alert("Error fetching employees");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get(`/department/getByOrg/${orgId}`);
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="OWNER" />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="OWNER" />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Employees</h1>
          <AddEmployeeForm orgId={orgId} departments={departments} refresh={fetchEmployees} />
          <EmployeeTable employees={employees} refresh={fetchEmployees} />
        </main>
      </div>
    </div>
  );
};

export default OwnerCreateEmp;