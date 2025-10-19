const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
   organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  isActive: { type: Boolean, default: true },},
  { timestamps: true });
  
module.exports = mongoose.model('Employee', EmployeeSchema);