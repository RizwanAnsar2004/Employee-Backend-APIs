import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.error("Invalid JWT:", err);
      return {};
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (!token || !user) {
        setError("Invalid server response");
        return;
      }

      // Store token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Decode token just in case roleID missing in user
      const payload = decodeJWT(token);
      const roleID = user?.roleID ?? payload?.roleID ?? 0;

      // Store organization ID if available
      if (user?.organizationId) {
        localStorage.setItem("orgId", user.organizationId);
      } else {
        localStorage.removeItem("orgId");
        console.warn("⚠️ No organizationId found for this user");
      }

      // Store role for Navbar & Sidebar
      let roleName = "USER";
      let redirectPath = "/dashboard";

      if (roleID === 1) {
        roleName = "SUPERADMIN";
        redirectPath = "/superadmin/dashboard";
      } else if (roleID === 2) {
        roleName = "OWNER";
        redirectPath = "/owner/dashboard";
      }

      localStorage.setItem("role", roleName);
      navigate(redirectPath);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access the Employee Management System
        </p>

        {error && <p className="text-center text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
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
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-gray-600 text-sm">
          <button
            onClick={() => navigate("/")}
            className="hover:text-purple-600 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/register")}
            className="hover:text-green-500 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;