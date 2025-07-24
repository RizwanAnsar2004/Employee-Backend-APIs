const registrationServices = require('../Services/RegistrationServices');

async function registerUserController(req,res,next){
    try{
      const userResult = await registrationServices.registerUser(req.userData);
      res.status(201).json({
      user: userResult
    });
    }
    catch(error){
      next(error);
    }
  }

module.exports = { registerUserController };
