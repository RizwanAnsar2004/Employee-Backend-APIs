const required = require("../Helpers/RequiredParameters");

class AddEmployeeDTO {
  constructor({
    firstName = required("firstName"),
    lastName,
    email = required("email"),
    phoneNo = required("phoneNo"),
    departmentId = required("departmentId"),
    designation = required("designation"), 
    organizationId,
  }) {
    this.firstName = firstName;
    this.lastName = lastName || "";
    this.email = email;
    this.phoneNo = phoneNo;
    this.departmentId = departmentId;
    this.designation = designation; 
    this.organizationId = organizationId;
  }
}

module.exports = { AddEmployeeDTO };