import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

// ✅ Enum label mappings (frontend)
const STATUS_LABELS = {
  1: "PENDING",
  2: "VERIFIED",
  3: "BLOCKED",
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  BLOCKED: "BLOCKED",
};

// ✅ Match OrgTypeEnum from backend
const ORG_TYPE_LABELS = {
  1: "Company",
  2: "School",
  3: "NGO",
  4: "Hospital",
  5: "Other",
};

const OrgManagement = () => {
  const [orgs, setOrgs] = useState([]);
  const [pendingOrgs, setPendingOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrgs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orgs", {
        headers: { Authorization: `Bearer ${token}` },
        params: { pageNumber: 1, pageSize: 100 },
      });

      const orgArray = Array.isArray(res.data?.data?.data)
        ? res.data.data.data
        : [];

      console.log("Fetched Orgs:", orgArray);

      // ✅ Normalize field names and convert status strings to numeric codes
      const normalized = orgArray.map((org) => {
        let statusValue = org.status || org.orgStatus || org.organizationStatus;

        // Convert strings to numeric enum codes if needed
        if (typeof statusValue === "string") {
          const s = statusValue.toUpperCase();
          if (s === "PENDING") statusValue = 1;
          else if (s === "VERIFIED") statusValue = 2;
          else if (s === "BLOCKED") statusValue = 3;
        }

        return {
          ...org,
          orgStatus: statusValue,
        };
      });

      setOrgs(normalized.filter((org) => org.orgStatus !== 1));
      setPendingOrgs(normalized.filter((org) => org.orgStatus === 1));
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

  useEffect(() => {
    fetchOrgs();
  }, [token]);

  const handleStatusUpdate = async (orgId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orgs/${orgId}/${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrgs();
    } catch (err) {
      console.error(err);
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

          {/* ✅ Verified / Blocked */}
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Verified / Blocked Organizations
            </h3>
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
                    <tr key={org.orgId || org._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        {org.organizationName || "N/A"}
                      </td>
                      <td
                        className={`p-3 border-b font-semibold ${
                          org.orgStatus === 2
                            ? "text-green-600"
                            : org.orgStatus === 3
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {STATUS_LABELS[org.orgStatus] || "UNKNOWN"}
                      </td>
                      <td className="p-3 border-b">
                        {ORG_TYPE_LABELS[org.orgType] || "N/A"}
                      </td>
                      <td className="p-3 border-b">
                        {org.numberOfEmployees || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ✅ Pending Organizations */}
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Pending Organizations
            </h3>
            {loading ? (
              <p className="text-gray-600">Loading organizations...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : pendingOrgs.length === 0 ? (
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
                    <tr key={org.orgId || org._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        {org.organizationName || "N/A"}
                      </td>
                      <td className="p-3 border-b">
                        {ORG_TYPE_LABELS[org.orgType] || "N/A"}
                      </td>
                      <td className="p-3 border-b">
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                          onClick={() =>
                            handleStatusUpdate(org.orgId || org._id, "VERIFIED")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() =>
                            handleStatusUpdate(org.orgId || org._id, "BLOCKED")
                          }
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