const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/EmployeeController');
const { validateEmployee } = require('../Middlewares/EmployeeValidation');
const { authenticateUser } = require('../Middlewares/AuthMiddleware');

router.post('/add', authenticateUser, validateEmployee, employeeController.addEmployee);
router.get('/getAll', authenticateUser, employeeController.getEmployees);

module.exports = router;