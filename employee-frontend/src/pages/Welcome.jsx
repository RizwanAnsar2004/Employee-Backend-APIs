import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-green-50 overflow-hidden font-sans">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>

      {/* Main card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg text-center space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Your gateway to work made simple
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition transform font-semibold"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/otp")}
            className="w-full md:w-auto bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition transform font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
