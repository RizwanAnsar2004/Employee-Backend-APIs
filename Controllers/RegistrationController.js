const registrationServices = require('../Services/RegistrationServices');

async function registerUser(req,res,next){
    try{
      const userResult = await registrationServices.registerUser(req.userData);
      const userID = userResult.userID;
      req.licenseData.userID = userID;
      const licenseResult = await registrationServices.registerLicenseInfo(req.licenseData);
      req.bankData.userID = userID;
      const bankResult = await registrationServices.registerBankInfo(req.bankData);
      
      res.status(201).json({
      message: "User registered successfully",
      user: userResult,
      license: licenseResult,
      bank: bankResult
    });
    }
    catch(error){
      next(error);
    }
  }

module.exports = { registerUser };
