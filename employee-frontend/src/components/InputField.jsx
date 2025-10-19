import React from "react";

const InputField = ({ label, type = "text", value, onChange, name }) => (
  <div className="flex flex-col mb-4">
    <label className="text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

export default InputField;