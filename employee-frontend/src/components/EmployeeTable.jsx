import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const EmployeeTable = ({ orgId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/employees/getAll");
      // backend sends array under res.data
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      alert("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axiosInstance.delete(`/employees/delete/${id}`);
      fetchEmployees(); // refresh table
    } catch (err) {
      console.error("Failed to delete employee:", err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (!employees || employees.length === 0) return <p>No employees found.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Department</th>
            <th className="px-6 py-3 text-left">Designation</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.map((emp, idx) => {
            // handle department name from either populated object or fallback
            const deptName =
              emp.departmentId?.deptName || emp.departmentId?.name || "N/A";

            return (
              <tr key={emp._id}>
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{`${emp.firstName} ${emp.lastName}`}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.phoneNo}</td>
                <td className="px-6 py-4">{deptName}</td>
                <td className="px-6 py-4">{emp.designation || "N/A"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;