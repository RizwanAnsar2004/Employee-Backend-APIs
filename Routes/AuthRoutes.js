const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multer");
const { registerationController } = require("../Controllers/RegistrationController");
const { validateDTO } = require("../Middlewares/ValidateUserRegistration");
const { validateOrgDTO } = require("../Middlewares/ValidateOrgRegistration");

router.post("/register",  upload.fields([
    { name: "frontLicenseImg", maxCount: 1 },
    { name: "backLicenseImg", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  validateDTO, validateOrgDTO, registerationController);

module.exports = router;