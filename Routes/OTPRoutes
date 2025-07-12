const express = require ('express');
const router = express.Router();
const otpController = require('../Controllers/OTPController');
const otpValidation = require('../Middlewares/OTPValidation');

router.post('/createOrResendOTP', otpValidation.validateSendOTP, otpController.sendOTP);
router.post('/verifyOTP', otpValidation.validateVerificationOTP, otpController.verifyOTP);
module.exports = router;