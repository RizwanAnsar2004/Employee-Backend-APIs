import React from "react";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";

const DepartmentTable = ({ departments, refresh }) => {
  const handleDelete = async (deptId, deptName) => {
    if (!window.confirm(`Delete "${deptName}"?`)) return;
    try {
      await axiosInstance.delete(`/department/delete/${deptId}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete department:", err);
      alert("Delete failed");
    }
  };

  if (!departments || departments.length === 0) return <p>No departments found.</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-purple-600 text-white text-left">
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Department Name</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, idx) => (
            <tr key={dept._id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-6">{idx + 1}</td>
              <td className="py-3 px-6">{dept.deptName}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => handleDelete(dept._id, dept.deptName)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;