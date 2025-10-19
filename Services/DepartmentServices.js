const Department = require('../Models/DepartmentModel');

async function createDepartment(deptDTO) {
  const newDept = new Department(deptDTO);
  await newDept.save();
  return { message: "Department created successfully", data: newDept };
}

async function getDepartmentsByOrg(orgId) {
  if (!orgId) throw new Error("orgId is required");
  const departments = await Department.find({ organizationId: orgId });
  return departments;
}

async function deleteDepartmentById(deptId) {
  const result = await Department.findByIdAndDelete(deptId);
  if (!result) throw new Error("Department not found");
  return { message: "Department deleted successfully" };
}

module.exports = { createDepartment, getDepartmentsByOrg, deleteDepartmentById };