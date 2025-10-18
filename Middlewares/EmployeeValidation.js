const { AddEmployeeDTO } = require('../DTO/EmployeeDTO');
const { role } = require('../Utils/Enums');

function validateEmployee(req, res, next) {
  try
  {
    const dto = new AddEmployeeDTO(req.body);

    if (dto.roleID === role.EMPLOYEE && (!dto.designation || !dto.designation.trim()))
    {
      throw new Error("Employees must have a designation");
    }

    req.employeeData = dto;
    next();
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { validateEmployee };