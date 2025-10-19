import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("otpEmail");
    const savedPhone = localStorage.getItem("otpPhone");
    const otpVerified = localStorage.getItem("otpVerified");

    if (otpVerified === "true") {
      setMessage("OTP already verified. Please proceed to registration or request a new OTP.");
      setOtpSent(false); // Prevent re-verification
    }
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhoneNo(savedPhone);
  }, []);

  const sendOTP = async () => {
    if (!email.trim() || !phoneNo.trim()) {
      setMessage("Email and Phone Number are required.");
      return;
    }
    try {
      const res = await axiosInstance.post("/otp/createOrResendOTP", {
        email: email.trim().toLowerCase(),
        phoneNo: phoneNo.trim(),
      });
      setMessage(res.data.message || "OTP sent successfully");
      setOtpSent(true);
      localStorage.setItem("otpEmail", email.trim().toLowerCase());
      localStorage.setItem("otpPhone", phoneNo.trim());
      localStorage.removeItem("otpVerified"); // Clear previous verification
      localStorage.removeItem("otpToken");
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data);
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOTP = async () => {
    if (localStorage.getItem("otpVerified") === "true") {
      setMessage("OTP already verified. Please request a new OTP or proceed to registration.");
      return;
    }
    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }
    if (!email.trim()) {
      setMessage("Email is required.");
      return;
    }
    if (!phoneNo.trim()) {
      setMessage("Phone number is required.");
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      phoneNo: phoneNo.trim(),
      otp: otp.trim(),
    };
    console.log("Sending OTP verification payload:", payload);

    try {
      const res = await axiosInstance.post("/otp/verifyOTP", payload);
      setMessage(res.data.message || "OTP verified successfully");

      if (res.data.success && res.data.otpToken) {
        localStorage.setItem("otpVerified", "true");
        localStorage.setItem("otpToken", res.data.otpToken);
        localStorage.setItem("otpEmail", email.trim().toLowerCase());
        localStorage.setItem("otpPhone", phoneNo.trim());
        setTimeout(() => navigate("/register"), 50);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data, err);
      setMessage(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">OTP Verification</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email and phone number to receive OTP</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={localStorage.getItem("otpVerified") === "true"}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={localStorage.getItem("otpVerified") === "true"}
          />
          <button
            onClick={sendOTP}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>

          {otpSent && localStorage.getItem("otpVerified") !== "true" && (
            <>
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
            </>
          )}

          {message && <p className="text-center text-purple-600 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default OTP;