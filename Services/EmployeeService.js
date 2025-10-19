const Employee = require('../Models/EmployeeModel');
const bcrypt = require("bcrypt");
const { role, status } = require("../Utils/Enums");

async function addEmployee(dto) {
  const companyPrefix = dto.organizationName
    ? dto.organizationName.replace(/\s+/g, "").toLowerCase().slice(0, 6)
    : "org";
  const initials = dto.firstName ? dto.firstName[0].toLowerCase() : "x";
  const randomDigits = Math.floor(100 + Math.random() * 900);

  const tempPassword = `${companyPrefix}${initials}${randomDigits}`;
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const newEmployee = new Employee({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    phoneNo: dto.phoneNo,
    organizationId: dto.organizationId,
    departmentId: dto.departmentId,
    designation: dto.designation, 
    password: hashedPassword,
    roleID: role.EMPLOYEE,
    statusID: status.VERIFIED,
  });

  await newEmployee.save();

  return {
    message: "Employee added successfully",
    email: newEmployee.email,
    tempPassword,
  };
}

async function getEmployeesByOrg(orgId) {
  const employees = await Employee.find({ organizationId: orgId }).populate("departmentId", "name").lean();;
  return employees;
}

async function removeEmployee(id) {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error("Employee not found");
  }
  employee.isActive = false;
  await employee.save();

  return { message: "Employee terminated" };
}
module.exports = { addEmployee, getEmployeesByOrg, removeEmployee };
