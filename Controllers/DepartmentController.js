const DepartmentService = require('../Services/DepartmentServices');

async function createDepartment(req, res, next) {
  try {
    const result = await DepartmentService.createDepartment(req.departmentData);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getDepartments(req, res, next) {
  try {
    const { orgId } = req.params;
    const result = await DepartmentService.getDepartmentsByOrg(orgId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteDepartmentById(req, res, next) {
  try {
    const { id } = req.params; 
    const result = await DepartmentService.deleteDepartmentById(id);
    res.status(200).json(result); 
  } catch (err) {
    next(err);
  }
}

module.exports = { createDepartment, getDepartments, deleteDepartmentById };