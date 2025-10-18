const express = require('express');
const router = express.Router();
const deptController = require('../Controllers/DepartmentController');
const { validateDepartment } = require('../Middlewares/DepartmentValidation');
const { authenticateUser, requireVerifiedOwner } = require('../Middlewares/AuthMiddleware');

router.post('/create', authenticateUser, requireVerifiedOwner, validateDepartment, deptController.createDepartment);
router.get('/getByOrg/:orgId', authenticateUser,requireVerifiedOwner, deptController.getDepartments);
router.delete('/delete/:id', authenticateUser, requireVerifiedOwner, deptController.deleteDepartmentById);

module.exports = router;