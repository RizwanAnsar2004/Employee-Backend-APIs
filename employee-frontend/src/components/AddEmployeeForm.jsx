import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AddEmployeeForm = ({ orgId, departments, refresh }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departmentId) {
      alert("Please select a department");
      return;
    }

    const employeeData = {
      firstName,
      lastName,
      email,
      phoneNo,
      departmentId,
      designation,
      organizationId: orgId,
    };

    try {
      const res = await axiosInstance.post("/employees/add", employeeData);
      alert(`Employee added. Temp password: ${res.data.tempPassword}`);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNo("");
      setDepartmentId("");
      setDesignation("");
      refresh();
    } catch (err) {
      console.error("Failed to add employee:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4 bg-white p-4 shadow rounded-lg">
      <div className="flex gap-2">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        />
        <input
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          placeholder="Phone No"
          required
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>{dept.deptName}</option>
          ))}
        </select>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Designation"
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1"
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-32"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;