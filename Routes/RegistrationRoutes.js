const express = require("express");
const router = express.Router();
const { userRegistration_Info, registerLicense, registerBank } = require('../Controllers/RegistrationController');
const { validateUser, validateLicense,validateBankInfo } = require('../Middlewares/ValidateUserRegistration');
router.post('/basic', validateUser, userRegistration_Info);
router.post('/license', validateLicense, registerLicense);
router.post('/bank', validateBankInfo, registerBank);
module.exports = router;