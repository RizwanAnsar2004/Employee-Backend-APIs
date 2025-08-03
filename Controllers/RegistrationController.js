const registrationServices = require('../Services/RegistrationServices');

async function registerationController(req,res,next){
    try{
      const userResult = await registrationServices.registerUser(req.userData,req.orgData);
      res.status(201).json({
      user: userResult
    });
    }
    catch(error){
      next(error);
    }
  }

module.exports = { registerationController };
