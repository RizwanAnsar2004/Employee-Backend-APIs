const required = require('../Helpers/RequiredParameters');

class DepartmentDTO {
  constructor({
    deptName = required('deptName'),
    organizationId = required('organizationId'),
  })
  {
    if (typeof deptName !== 'string' || !deptName.trim())
    {
      throw new Error("deptName must be a non-empty string");
    }

    this.deptName = deptName.trim();
    this.organizationId = organizationId;
  }
}

module.exports = { DepartmentDTO };