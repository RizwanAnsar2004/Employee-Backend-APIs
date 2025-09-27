const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multer");
const { registrationController } = require("../Controllers/RegistrationController");
const { validateDTO,validateUserCredentials } = require("../Middlewares/ValidateUserRegistration");
const { validateOrgDTO } = require("../Middlewares/ValidateOrgRegistration");
const { loginController } = require("../Controllers/AuthController");

router.post("/register",  upload.fields([
    { name: "frontLicenseImg", maxCount: 1 },
    { name: "backLicenseImg", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  validateDTO, validateOrgDTO, registrationController);

router.post("/login",validateUserCredentials,loginController);
module.exports = router;