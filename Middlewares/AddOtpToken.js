 function addOtpToken(req, res, next) {
  const otpToken = req.body.otpToken || req.headers.authorization?.split(" ")[1];
  if (otpToken) {
    if (!req.userData) req.userData = {};
    req.userData.otpToken = otpToken;
  }
  next();
}; 

module.exports = { addOtpToken };