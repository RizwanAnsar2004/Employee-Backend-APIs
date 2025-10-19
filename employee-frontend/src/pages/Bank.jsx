import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/axiosInstance";

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [newBank, setNewBank] = useState({ bankName: "", bankCode: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all active banks
  const fetchBanks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/banks/getAllBanksInfo");
      const banksData = Array.isArray(res.data.Banks) ? res.data.Banks : [];
      setBanks(banksData);
      setError("");
    } catch (err) {
      console.error("Error fetching banks:", err);
      setError("Failed to fetch banks.");
      setBanks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // ✅ Add new bank
  const handleAddBank = async (e) => {
    e.preventDefault();
    try {
      if (!newBank.bankName.trim() || !newBank.bankCode.trim()) {
        alert("Please fill in all fields");
        return;
      }

      await axiosInstance.post("/banks/addinfo", newBank);
      setNewBank({ bankName: "", bankCode: "" });
      fetchBanks();
    } catch (err) {
      console.error("Error adding bank:", err);
      alert("Error adding bank: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ Deactivate bank
  const handleDeactivate = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to deactivate this bank?")) return;
      await axiosInstance.patch(`/banks/${id}/status`);
      fetchBanks();
    } catch (err) {
      console.error("Error deactivating bank:", err);
      alert("Failed to deactivate bank");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-tr from-blue-50 to-green-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Banks Management
          </h2>

          {/* ➕ Add Bank Form */}
          <div className="bg-white p-6 rounded-3xl shadow-lg max-w-md mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Add New Bank
            </h3>
            <form onSubmit={handleAddBank} className="space-y-4">
              <input
                placeholder="Bank Name"
                className="w-full p-2 border rounded-lg"
                value={newBank.bankName}
                onChange={(e) =>
                  setNewBank({ ...newBank, bankName: e.target.value })
                }
              />
              <input
                placeholder="Bank Code"
                className="w-full p-2 border rounded-lg"
                value={newBank.bankCode}
                onChange={(e) =>
                  setNewBank({ ...newBank, bankCode: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add Bank
              </button>
            </form>
          </div>

          {/* 🏦 Banks List */}
          {loading ? (
            <p className="text-gray-600">Loading banks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : banks.length === 0 ? (
            <p className="text-gray-600">No active banks found.</p>
          ) : (
            <div className="bg-white p-6 rounded-3xl shadow-lg max-w-4xl">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Active Banks
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Code</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{b.bankName}</td>
                      <td className="p-3 border-b">{b.bankCode}</td>
                      <td className="p-3 border-b font-semibold text-green-600">
                        Active
                      </td>
                      <td className="p-3 border-b">
                        <button
                          onClick={() => handleDeactivate(b.id)}
                          className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Deactivate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bank;