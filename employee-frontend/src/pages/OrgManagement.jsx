import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const OrgManagement = () => {
  const [orgs, setOrgs] = useState([]);
  const [pendingOrgs, setPendingOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // get token once

  // Fetch organizations
  useEffect(() => {
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    const fetchOrgs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orgs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orgData = res.data?.data?.data || res.data?.data || [];
        setOrgs(orgData.filter((org) => org.status !== "PENDING"));
        setPendingOrgs(orgData.filter((org) => org.status === "PENDING"));
        setError(null);
      } catch (err) {
        const message = err.response
          ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
          : `Network Error: ${err.message}`;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, [token]);

  // Approve or reject a pending org
  const handleStatusUpdate = async (orgId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orgs/${orgId}/${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingOrgs((prev) => prev.filter((org) => org.orgId !== orgId));
      const updatedOrg = pendingOrgs.find((o) => o.orgId === orgId);
      if (updatedOrg)
      {
        setOrgs((prev) => [...prev, { ...updatedOrg, status }]);
      }
    }
    catch (err) {
      console.error("Error updating organization status:", err);
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!token) {
    return (
      <div className="text-center mt-20 text-red-500">
        No token found. Please login.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-tr from-blue-50 to-green-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 overflow-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Organizations Management
          </h2>

          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto mb-8">
            <h3 className="text-xl font-semibold mb-4">Verified / Blocked Organizations</h3>
            {loading ? (
              <p className="text-gray-600">Loading organizations...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : orgs.length === 0 ? (
              <p className="text-gray-600">No organizations found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="p-3 border-b text-gray-800">Name</th>
                    <th className="p-3 border-b text-gray-800">Status</th>
                    <th className="p-3 border-b text-gray-800">Type</th>
                    <th className="p-3 border-b text-gray-800">Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((org) => (
                    <tr key={org.orgId} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{org.organizationName || "N/A"}</td>
                      <td
                        className={`p-3 border-b font-semibold ${
                          org.status === "VERIFIED"
                            ? "text-green-600"
                            : org.status === "BLOCKED"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {org.status || "UNKNOWN"}
                      </td>
                      <td className="p-3 border-b">{org.orgTypeDetail || org.orgType || "N/A"}</td>
                      <td className="p-3 border-b">{org.numberOfEmployees || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Pending Organizations</h3>
            {pendingOrgs.length === 0 ? (
              <p className="text-gray-600">No pending organizations.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-3 border-b text-gray-800">Name</th>
                    <th className="p-3 border-b text-gray-800">Type</th>
                    <th className="p-3 border-b text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrgs.map((org) => (
                    <tr key={org.orgId} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{org.organizationName || "N/A"}</td>
                      <td className="p-3 border-b">{org.orgTypeDetail || org.orgType || "N/A"}</td>
                      <td className="p-3 border-b">
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                          onClick={() => handleStatusUpdate(org.orgId, "VERIFIED")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() => handleStatusUpdate(org.orgId, "BLOCKED")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgManagement;