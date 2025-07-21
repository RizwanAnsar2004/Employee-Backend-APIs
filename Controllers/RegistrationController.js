const registrationServices = require('../Services/RegistrationServices');

async function userRegistration_Info(req, res, next) {
  try {
    const result = await registrationServices.registerUser(req.userData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function registerLicense(req, res, next) {
  try {
    const result = await registrationServices.registerLicenseInfo(req.licenseData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function registerBank(req, res, next) {
  try {
    const result = await registrationServices.registerBankInfo(req.bankData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { userRegistration_Info,registerLicense,registerBank};
