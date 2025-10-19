const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/EmployeeController');
const { validateEmployee } = require('../Middlewares/EmployeeValidation');
const { authenticateUser, requireVerifiedOwner } = require('../Middlewares/AuthMiddleware');

router.post('/add', authenticateUser, requireVerifiedOwner, validateEmployee, employeeController.addEmployee);
router.get('/getAll', authenticateUser, requireVerifiedOwner, employeeController.getEmployees);
router.delete('/delete/:id',authenticateUser,requireVerifiedOwner,employeeController.removeEmployee);

module.exports = router;