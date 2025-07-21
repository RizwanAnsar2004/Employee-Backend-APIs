const { RegisterUserDTO } = require("../DTO/RegisterUserDTO")
const { RegisterLicenseDTO } = require("../DTO/RegisterLicenseDTO");
const { RegisterBankInfoDTO } = require("../DTO/RegisterBankInfoDTO");

function validateUser(req,res,next){
try {
    const dto = new RegisterUserDTO(req.body);
    req.userData = dto;
    
    next();
} catch (err) {
    res.status(400).json({message: err.message});
}
}

function validateLicense(req,res,next){
    try {
        const LicenseVdto = new RegisterLicenseDTO(req.body);
        req.licenseData = LicenseVdto;  
        
        next();
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

function validateBankInfo(req,res,next){
    try {
        const BankInfoDTO = new RegisterBankInfoDTO(req.body);
        req.bankData = BankInfoDTO;

        next();
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}


module.exports = { validateUser,validateLicense,validateBankInfo };