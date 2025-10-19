import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AddDepartmentForm = ({ orgId, refresh }) => {
  const [deptName, setDeptName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/department/create", { deptName, organizationId: orgId });
      setDeptName("");
      refresh();
    } catch (err) {
      console.error("Failed to add department:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add department");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
        placeholder="Department Name"
        required
        className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
        Add Department
      </button>
    </form>
  );
};

export default AddDepartmentForm;