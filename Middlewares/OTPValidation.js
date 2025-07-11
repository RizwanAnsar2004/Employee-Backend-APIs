const { VerifyOTPModel } = require("../DTO/OTPVerificationDTO");
const { SendOTPDTO }= require("../DTO/SendOTPDTO");

function validateSendOTP(req, res, next) {
 try {
  const dto = new SendOTPDTO(req.body);
  req.verificationData = dto;

   next();

 } catch (err) {
  res.status(400).json({ message: err.message });
 }
}

function validateVerificationOTP(req, res, next) {
  try {
    const dto = new VerifyOTPModel(req.body);
    req.verificationData= dto;

    next();

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {validateSendOTP,validateVerificationOTP};