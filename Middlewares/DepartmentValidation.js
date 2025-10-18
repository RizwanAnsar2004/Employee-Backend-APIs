const { DepartmentDTO } = require('../DTO/DepartmentDTO');

function validateDepartment(req, res, next) {
    try
    {
        const dto = new DepartmentDTO(req.body);
        req.departmentData = dto;
        next();
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { validateDepartment };