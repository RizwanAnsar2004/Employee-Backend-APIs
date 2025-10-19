import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [bankError, setBankError] = useState("");

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
    frontLicenseImg: null,
    backLicenseImg: null,
  });

  const [orgData, setOrgData] = useState({
    organizationName: "",
    orgType: "",
    registrationNumber: "",
    industryOrSector: "",
    orgEmail: "",
    orgPhoneNo: "",
    website: "",
    address: "",
    city: "",
    country: "",
    stablishedDate : "",
    description: "",
    numberOfEmployees: "",
    logo: null,
  });

  useEffect(() => {
  const otpVerified = localStorage.getItem("otpVerified");
  const otpToken = localStorage.getItem("otpToken");
  const otpEmail = localStorage.getItem("otpEmail");
  const otpPhone = localStorage.getItem("otpPhone");

  if (otpVerified !== "true" || !otpToken) {
    navigate("/otp");
    return;
  }

  setUserData((prev) => ({
    ...prev,
    email: otpEmail || "",
    phoneNo: otpPhone || "",
  }));
}, [navigate]);


  // Hardcoded banks
  useEffect(() => {
    setBanks([
      {
        _id: "687f9a72f2119c25cdd7c22c",
        bankName: "Meezan Bank",
        bankCode: "MZ001",
        bankAddress: "Shahrah-e-Faisal, Karachi",
        isActive: true,
      },
      {
        _id: "687f9ae2f2119c25cdd7c22f",
        bankName: "Habib Bank Limited",
        bankCode: "HBL001",
        bankAddress: "Khehkashan Branch, Karachi",
        isActive: true,
      },
      {
        _id: "687f9b5ff2119c25cdd7c232",
        bankName: "Bank Alfalah",
        bankCode: "ALFH",
        bankAddress: "CTFC Building, Karachi",
        isActive: true,
      },
      {
        _id: "68c12c778950298b7292f55b",
        bankName: "Faysal Bank",
        bankCode: "fays",
        bankAddress: "Faysal House, St-02, Shahrah-e-Faisal, Karachi",
        isActive: true,
      },
    ]);
  }, []);

  const orgTypeOptions = [
    { label: "Company", value: 1 },
    { label: "School", value: 2 },
    { label: "NGO", value: 3 },
    { label: "Hospital", value: 4 },
    { label: "Other", value: 5 },
  ];

  const handleUserChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleOrgChange = (e) => {
    const value = e.target.name === "orgType" ? Number(e.target.value) : e.target.value;
    setOrgData({ ...orgData, [e.target.name]: value });
  };

  const handleUserFileChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });

  const handleOrgFileChange = (e) =>
    setOrgData({ ...orgData, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setBankError("");

  const otpToken = localStorage.getItem("otpToken");
  console.log("Retrieved otpToken:", otpToken); // Log for debugging
  if (!otpToken) {
    alert("Please verify OTP first!");
    navigate("/otp");
    return;
  }

  // Bank info validation (all-or-none)
  const bankFields = ["bankID", "accountTitle", "accountNo", "swiftCode"];
  const filled = bankFields.filter((f) => userData[f]);
  if (filled.length > 0 && filled.length < bankFields.length) {
    return setBankError("If you enter any bank info, all fields must be completed.");
  }

  const formData = new FormData();
  Object.keys(userData).forEach((key) => userData[key] && formData.append(key, userData[key]));
  Object.keys(orgData).forEach((key) => orgData[key] && formData.append(key, orgData[key]));
  formData.append("otpToken", otpToken);
  console.log("FormData contents:", [...formData.entries()]); // Log FormData entries

  try {
    const res = await axiosInstance.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${otpToken}`,
      },
    });
    alert(res.data.message);
    localStorage.removeItem("otpVerified");
    localStorage.removeItem("otpToken");
    localStorage.removeItem("otpEmail");
    localStorage.removeItem("otpPhone");
    navigate("/login");
  } catch (err) {
    console.error("Registration error:", err.response?.data, err); // Log full error
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white via-mint-100 to-blue-50 font-sans p-4">
      <form onSubmit={handleSubmit} className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Create Your Account</h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={userData.firstName} onChange={handleUserChange} className="border p-3 rounded-lg" required />
          <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleUserChange} className="border p-3 rounded-lg" required />
          <input type="email" name="email" value={userData.email} readOnly />
          <input type="text" name="phoneNo" value={userData.phoneNo} readOnly />
          <input type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleUserChange} className="border p-3 rounded-lg" required />
          <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleUserChange} className="border p-3 rounded-lg" required />

          {/* License Upload */}
          <label className="col-span-full">
            Upload Front License (User):
            <input type="file" name="frontLicenseImg" onChange={handleUserFileChange} className="border p-2 rounded-lg w-full mt-1" />
          </label>
          <label className="col-span-full">
            Upload Back License (User):
            <input type="file" name="backLicenseImg" onChange={handleUserFileChange} className="border p-2 rounded-lg w-full mt-1" />
          </label>
        </div>

        {/* Organization Info */}
        <h3 className="text-lg font-semibold text-gray-700">Organization Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="organizationName" placeholder="Organization Name" value={orgData.organizationName} onChange={handleOrgChange} className="border p-2 rounded-lg" required />
          <select name="orgType" value={orgData.orgType} onChange={handleOrgChange} className="border p-2 rounded-lg bg-white" required>
            <option value="">Select Organization Type</option>
            {orgTypeOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <input type="text" name="registrationNumber" placeholder="Registration Number" value={orgData.registrationNumber} onChange={handleOrgChange} className="border p-2 rounded-lg" required />
          <input type="text" name="industryOrSector" placeholder="Industry/Sector" value={orgData.industryOrSector} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="email" name="orgEmail" placeholder="Org Email" value={orgData.orgEmail} onChange={handleOrgChange} className="border p-2 rounded-lg" required />
          <input type="text" name="orgPhoneNo" placeholder="Org Phone No" value={orgData.orgPhoneNo} onChange={handleOrgChange} className="border p-2 rounded-lg" required />
          <input type="text" name="website" placeholder="Website" value={orgData.website} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" name="address" placeholder="Address" value={orgData.address} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" name="city" placeholder="City" value={orgData.city} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="text" name="country" placeholder="Country" value={orgData.country} onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <input type="date" name="stablishedDate" placeholder="Established Date" value={orgData.stablishedDate } onChange={handleOrgChange} className="border p-2 rounded-lg" />
          <textarea name="description" placeholder="Description" value={orgData.description} onChange={handleOrgChange} className="border p-2 rounded-lg col-span-full" />
          <label className="col-span-full">
            Upload Organization Logo:
            <input type="file" name="logo" onChange={handleOrgFileChange} className="border p-2 rounded-lg w-full mt-1" />
          </label>
          <input type="text" name="numberOfEmployees" placeholder="Number of Employees" value={orgData.numberOfEmployees} onChange={handleOrgChange} className="border p-2 rounded-lg" />
        </div>

        {/* Bank Info */}
        <h3 className="text-lg font-semibold text-gray-700">Bank Details (optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="bankID" value={userData.bankID} onChange={handleUserChange} className="border p-2 rounded-lg">
            <option value="">Select Bank</option>
            {banks.map((b) => (
              <option key={b._id} value={b._id}>
                {b.bankName} ({b.bankCode})
              </option>
            ))}
          </select>
          <input type="text" name="accountTitle" placeholder="Account Title" value={userData.accountTitle} onChange={handleUserChange} className="border p-2 rounded-lg" />
          <input type="text" name="accountNo" placeholder="Account Number" value={userData.accountNo} onChange={handleUserChange} className="border p-2 rounded-lg" />
          <input type="text" name="swiftCode" placeholder="SWIFT Code" value={userData.swiftCode} onChange={handleUserChange} className="border p-2 rounded-lg" />
        </div>
        {bankError && <p className="text-red-500">{bankError}</p>}

        <button type="submit" className="w-full bg-teal-300 text-black py-3 rounded-xl hover:bg-teal-400 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;