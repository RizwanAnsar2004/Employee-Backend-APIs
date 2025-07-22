const { RegisterUserDTO } = require("../DTO/RegisterUserDTO");
const { RegisterLicenseDTO } = require("../DTO/RegisterLicenseDTO");
const { RegisterBankInfoDTO } = require("../DTO/RegisterBankInfoDTO");

function validateDTO(req, res, next) {
    try {
        const userDTO = new RegisterUserDTO(req.body);
        const licenseDTO = new RegisterLicenseDTO(req.body);
        const bankDTO = new RegisterBankInfoDTO(req.body);

        req.userData = userDTO;
        req.licenseData = licenseDTO;
        req.bankData = bankDTO;

        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { validateDTO };
