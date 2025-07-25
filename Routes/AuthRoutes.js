const express = require("express");
const router = express.Router();
const { registerUserController } = require("../Controllers/RegistrationController");
const { validateDTO } = require("../Middlewares/ValidateUserRegistration");
router.post("/register", validateDTO, registerUserController);
module.exports = router;