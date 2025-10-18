import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // used for sendOTP
import axios from "axios"; // used for verifyOTP

const OTP = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Send OTP
  const sendOTP = async () => {
    try {
      const res = await axiosInstance.post("/otp/createOrResendOTP", {
        email,
        phoneNo,
      });
      setMessage(res.data.message);

      if (res.data.success) {
        localStorage.setItem("otpEmail", email);
        localStorage.setItem("otpPhone", phoneNo);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      const res = await axios.post("/otp/verifyOTP", { email, phoneNo, otp });
      setMessage(res.data.message);

      if (res.data.success) {
        localStorage.setItem("otpToken", res.data.otpToken);
        navigate("/register");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP");
    }
  };

  // Back handler
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        {/* Small back arrow in top-left corner */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Go back"
        >
          ←
        </button>

        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and phone number to receive OTP
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendOTP}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={verifyOTP}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>

          {message && (
            <p className="text-center text-purple-600 mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTP;