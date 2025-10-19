import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import OwnerCreateDept from "./pages/OwnerCreateDept";
import OwnerCreateEmp from "./pages/OwnerCreateEmp";
import OwnerDashboard from "./pages/OwnerDashboard";
import Bank from "./pages/Bank";
import OrgManagement from "./pages/OrgManagement";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Robust RoleRoute
const RoleRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // If your backend sends role as a number
    const userRole = payload.roleID || payload.role || payload.roleId;

    if (!userRole) {
      console.warn("Role not found in token");
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return allowedRoles.includes(Number(userRole)) ? children : <Navigate to="/login" />; 
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* SuperAdmin */}
        <Route path="/superadmin/dashboard" element={<RoleRoute allowedRoles={[1]}><SuperAdminDashboard /></RoleRoute>} />
        <Route path="/banks" element={<RoleRoute allowedRoles={[1]}><Bank /></RoleRoute>} />
        <Route path="/organizations" element={<RoleRoute allowedRoles={[1]}><OrgManagement /></RoleRoute>} />

        {/* Owner */}
        <Route path="/owner/dashboard" element={<RoleRoute allowedRoles={[2]}><OwnerDashboard /></RoleRoute>} />
        <Route path="/owner/departments" element={<RoleRoute allowedRoles={[2]}><OwnerCreateDept /></RoleRoute>} />
        <Route path="/owner/employees" element={<RoleRoute allowedRoles={[2]}><OwnerCreateEmp /></RoleRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;