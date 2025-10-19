import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaBuilding } from "react-icons/fa";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({ employees: 0, organizations: 0 });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  const fetchDashboardData = async () => {
    if (!token) { setError("No token found. Please login."); setLoading(false); return; }
    try {
      const userRes = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = userRes.data?.data || [];
      setPendingUsers(usersData.filter(u => u.status === "PENDING"));

      const orgRes = await axios.get("http://localhost:5000/api/orgs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orgData = orgRes.data?.data?.data || orgRes.data?.data || [];

      setStats({ employees: usersData.length, organizations: orgData.length });
      setError(null);
    } catch (err) {
      const message = err.response
        ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
        : `Network Error: ${err.message}`;
      console.error(message);
      setError(message);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      console.error("Failed to update user status:", err);
      alert("Failed to update user status");
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="SUPERADMIN" />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="SUPERADMIN" />

        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">Hello, Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Here's a quick overview of your dashboard.</p>
          {loading && <p className="text-gray-500 mt-2">Loading data...</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100 text-purple-600"><FaUsers size={24} /></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Employees</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-1">{stats.employees}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100 text-green-500"><FaBuilding size={24} /></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Organizations</h3>
                    <p className="text-3xl font-bold text-green-500 mt-1">{stats.organizations}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition mt-6">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Pending Users</h3>
                {pendingUsers.length === 0
                  ? <p className="text-gray-600">No pending users.</p>
                  : <ul className="text-gray-600 space-y-3">
                      {pendingUsers.map(user => (
                        <li key={user._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                          <span>{user.name} - {user.role || "N/A"}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(user._id, "VERIFIED")}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >Approve</button>
                            <button
                              onClick={() => handleStatusUpdate(user._id, "REJECTED")}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >Reject</button>
                          </div>
                        </li>
                      ))}
                    </ul>}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;