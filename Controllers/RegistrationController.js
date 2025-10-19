const registrationServices = require('../Services/RegistrationServices');

async function registrationController(req,res,next){
    try{
      const files = req.files;
      const userResult = await registrationServices.registerUser(req.userData,req.orgData,req.files);
      res.status(201).json({
      success: true,
      message: "Registration successful! Please log in.",
      user: userResult
    });
    }
    catch(error){
      next(error);
    }
  }

module.exports = { registrationController };