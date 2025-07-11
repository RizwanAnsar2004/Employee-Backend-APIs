const VerifyOTPModel = require("../DTO/OTPVerificationDTO");
const SendOtpDTO = require("../DTO/SendOTPDTO");

function validateSendOTP(req, res, next) {
 try {
  const dto = new SendOtpDTO(req.body);
  req.verificationData = dto;

   next();

 } catch (err) {
  res.status(400);
 }
}

function validateVerificationOTP(req, res, next) {
  try {
    const dto = new VerifyOTPModel(req.body);
    req.verificationData= dto;

    next();
    
  } catch (err) {
    res.status(400);
  }
}

module.exports = {validateSendOTP,validateVerificationOTP};