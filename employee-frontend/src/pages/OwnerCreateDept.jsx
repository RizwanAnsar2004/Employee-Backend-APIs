import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddDepartmentForm from "../components/AddDepartmentForm";
import DepartmentTable from "../components/DepartmentTable";
import axiosInstance from "../api/axiosInstance";

const OwnerCreateDept = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const orgId = localStorage.getItem("orgId"); // must be set at login

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get(`/department/getByOrg/${orgId}`);
      setDepartments(res.data.data || []); // use data field from backend
    } catch (err) {
      console.error("Failed to fetch departments:", err);
      alert("Error fetching departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="OWNER" />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="OWNER" />

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Departments</h1>
          <AddDepartmentForm orgId={orgId} refresh={fetchDepartments} />
          <DepartmentTable departments={departments} refresh={fetchDepartments} />
        </main>
      </div>
    </div>
  );
};

export default OwnerCreateDept;