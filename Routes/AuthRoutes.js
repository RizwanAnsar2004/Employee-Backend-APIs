const express = require("express");
const router = express.Router();
const { registerationController } = require("../Controllers/RegistrationController");
const { validateDTO } = require("../Middlewares/ValidateUserRegistration");
const { validateOrgDTO } = require("../Middlewares/ValidateOrgRegistration");
router.post("/register", validateDTO,validateOrgDTO, registerationController);
module.exports = router;