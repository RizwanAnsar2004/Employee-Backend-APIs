import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();

  // Redirect to OTP page if OTP not verified
  useEffect(() => {
    const otpVerified = localStorage.getItem("otpVerified");
    if (!otpVerified) {
      navigate("/otp"); // force OTP verification first
    }
  }, [navigate]);

  const [banks, setBanks] = useState([]);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    dateOfBirth: "",
    password: "",
    bankID: "",
    accountTitle: "",
    accountNo: "",
    swiftCode: "",
  });

  const [orgData, setOrgData] = useState({
    organizationName: "",
    orgType: "", // number
    registrationNumber: "",
    industryOrSector: "",
    orgEmail: "",
    orgPhoneNo: "",
    website: "",
    address: "",
    city: "",
    country: "",
    stablishedDate: "",
    description: "",
    numberOfEmployees: "",
  });

  const [files, setFiles] = useState({
    frontLicenseImg: null,
    backLicenseImg: null,
    logo: null,
  });

  // Fetch active banks from backend
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axiosInstance.get("/banks?status=active"); // endpoint should return active banks
        setBanks(res.data); // response: array of { _id, name }
      } catch (err) {
        console.error("Failed to fetch banks", err);
      }
    };
    fetchBanks();
  }, []);

  const orgTypeOptions = [
    { label: "Company", value: 1 },
    { label: "School", value: 2 },
    { label: "NGO", value: 3 },
    { label: "Hospital", value: 4 },
    { label: "Other", value: 5 },
  ];

  // Handlers
  const handleUserChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });
  const handleOrgChange = (e) => {
    const value = e.target.name === "orgType" ? Number(e.target.value) : e.target.value;
    setOrgData({ ...orgData, [e.target.name]: value });
  };
  const handleFileChange = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpToken = localStorage.getItem("otpToken");
  if (!otpToken) {
    alert("Please verify OTP first!");
    navigate("/otp");
    return;
  }
    // Bank validation: if any bank field filled, all must be filled
    const bankFields = ["bankID", "accountTitle", "accountNo", "swiftCode"];
    const filled = bankFields.filter((f) => userData[f]);
    if (filled.length > 0 && filled.length < bankFields.length) {
      return alert("If you enter any bank info, all fields must be completed.");
    }

    const formData = new FormData();
    Object.keys(userData).forEach(
      (key) => userData[key] && formData.append(key, userData[key])
    );
    Object.keys(orgData).forEach(
      (key) => orgData[key] && formData.append(key, orgData[key])
    );
    Object.keys(files).forEach(
      (key) => files[key] && formData.append(key, files[key])
    );
    formData.append("otpToken", otpToken);
    try {
      const res = await axiosInstance.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: `Bearer ${otpToken}`,
      });
      alert(res.data.message);
      localStorage.removeItem("otpVerified");
      localStorage.removeItem("otpToken");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-white via-mint-100 to-blue-50 font-sans overflow-hidden p-4">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-mint-200 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create Your Account
        </h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
          <input
            type="text"
            placeholder="Phone No"
            name="phoneNo"
            value={userData.phoneNo}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleUserChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-mint-400 outline-none"
          />
        </div>

        {/* License Upload */}
        <h3 className="text-lg font-semibold text-gray-700">License Files</h3>
        <p className="text-sm text-gray-500 mb-2">
          Upload your organization license (front & back). Accepted formats: JPG, PNG, PDF.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="file" name="frontLicenseImg" onChange={handleFileChange} className="border p-2 rounded-lg" />
          <input type="file" name="backLicenseImg" onChange={handleFileChange} className="border p-2 rounded-lg" />
        </div>

        {/* Organization Info */}
        <h3 className="text-lg font-semibold text-gray-700">Organization Info</h3>
        <p className="text-sm text-gray-500 mb-2">Add your organization details and logo (PNG/JPG, max 2MB).</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Organization Name" name="organizationName" value={orgData.organizationName} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <select name="orgType" value={orgData.orgType} onChange={handleOrgChange} className="border p-2 rounded-lg bg-white">
            <option value="">Select Organization Type</option>
            {orgTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Registration Number" name="registrationNumber" value={orgData.registrationNumber} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Industry/Sector" name="industryOrSector" value={orgData.industryOrSector} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="email" placeholder="Org Email" name="orgEmail" value={orgData.orgEmail} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Org Phone No" name="orgPhoneNo" value={orgData.orgPhoneNo} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Website" name="website" value={orgData.website} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Address" name="address" value={orgData.address} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="City" name="city" value={orgData.city} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Country" name="country" value={orgData.country} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="date" placeholder="Established Date" name="stablishedDate" value={orgData.stablishedDate} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <textarea placeholder="Description" name="description" value={orgData.description} onChange={handleOrgChange} className="border p-2 rounded-lg col-span-full" />
          <input type="file" name="logo" onChange={handleFileChange} className="border p-2 rounded-lg col-span-full" />
          <input type="text" placeholder="Number of Employees" name="numberOfEmployees" value={orgData.numberOfEmployees} onChange={handleOrgChange} className="border p-2 rounded-lg" />
        </div>

        {/* Bank Details */}
        <h3 className="text-lg font-semibold text-gray-700">Bank Details</h3>
        <p className="text-sm text-gray-500 mb-2">Add your bank info (optional, all-or-none).</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
          name="bankID"
          value={userData.bankID}
          onChange={handleUserChange}
          className="border p-2 rounded-lg">
            <option value="">Select Bank (optional)</option>
            <option value="687f9a72f2119c25cdd7c22c">Meezan Bank</option>
            <option value="687f9ae2f2119c25cdd7c22f">Habib Bank Limited</option>
            <option value="687f9b5ff2119c25cdd7c232">Bank Alfalah</option>
            <option value="68c12c778950298b7292f55b">Faysal Bank</option>
          </select>

          <input type="text" placeholder="Account Title" name="accountTitle" value={userData.accountTitle} onChange={handleUserChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="Account Number" name="accountNo" value={userData.accountNo} onChange={handleUserChange} className="border p-2 rounded-lg" />
          <input type="text" placeholder="SWIFT Code" name="swiftCode" value={userData.swiftCode} onChange={handleUserChange} className="border p-2 rounded-lg" />
        </div>

        <button type="submit" className="w-full bg-teal-300 text-black py-3 rounded-xl shadow-md font-semibold hover:bg-teal-400 transition-colors">
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span className="text-mint-600 font-medium cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;