const { RegistrationDTO,UserCredentialsDTO } = require("../DTO/RegistrationDTO");

function validateDTO(req, res, next) {
    try {
        const dto = new RegistrationDTO(req.body);
        req.userData = dto;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

function validateUserCredentials(req,res,next){
    try
    {
        const dto2 = new UserCredentialsDTO(req.body);
        req.loginCredentials = dto2;
        next();
    }
    catch(err)
    {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { validateDTO,validateUserCredentials };
