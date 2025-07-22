const express = require("express");
const router = express.Router();
const { registerUser } = require('../Controllers/RegistrationController');
const { validateDTO } = require('../Middlewares/ValidateUserRegistration');
router.post('/register', validateDTO, registerUser);
module.exports = router;