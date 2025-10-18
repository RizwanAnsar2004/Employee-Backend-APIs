import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // Decode JWT to check role
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      if (payload.roleID === 1) {
        navigate("/superadmin/dashboard"); // SuperAdminDashboard
      } else {
        navigate("/owner/dashboard"); // OwnerDashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access the Employee Management System
        </p>

        {error && <p className="text-center text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-gray-600 text-sm">
          <button onClick={() => navigate("/")} className="hover:text-purple-600 transition">Back</button>
          <button onClick={() => navigate("/register")} className="hover:text-green-500 transition">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;