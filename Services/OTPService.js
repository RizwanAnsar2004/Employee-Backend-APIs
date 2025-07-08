const { default: mongoose } = require('mongoose');
const OTPVerificationModel = require ('../Models/OTPVerificationModel');

function generateOTP(){
    return Math.floor(Math.random()*10000).toString().padStart(4,'0');
}

async function createOrResendOTP(email,phoneNo)
{
    await OTPVerificationModel.deleteMany({email,phoneNo,verified: false});
    const otp = generateOTP();
    await OTPVerificationModel.create({email,phoneNo,otp});
    console.log(`OTP sent to ${email} | ${phoneNo} \n otp: ${otp}`);
    console.log('OTP expires in 5 minutes⏳')
    return {message: 'OTP sent'};
}

async function verifyOTP(email,phoneNo,otpEntered)
{
    const record = await OTPVerificationModel.findOne({email,phoneNo}).sort({createdAt:-1});
    if (!record) return { success: false, message: 'OTP not found. Please request a new one' };
    if (record.otp !== otpEntered) return { success: false, message: 'Incorrect OTP entered' };
    record.verified = true;
    await record.save();
    return { success: true, message: 'OTP Verified successfully' };
}

module.exports= {createOrResendOTP,verifyOTP};