function validateSendOTP(req, res, next) {
  const { email, phoneNo } = req.body;
  if (!email || !phoneNo)
     {
    return res.status(400).json({ message: "Email and PhoneNo both are required" });
     }

  next();
}

function validateVerificationOTP(req, res, next) {
  const { email, phoneNo, otp } = req.body;
  if (!email && !phoneNo) 
    {
    return res.status(400).json({ message: "At least enter Email or PhoneNo for verification" });
    }
  if (!otp) 
    {
    return res.status(400).json({ message: "Please enter OTP, it is required" });
    }

  next();
}

module.exports = {validateSendOTP,validateVerificationOTP};