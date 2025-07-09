const { default: mongoose } = require('mongoose');
const OTPVerificationModel = require ('../Models/OTPVerificationModel');

function generateOTP(){
    return Math.floor(Math.random()*10000).toString().padStart(4,'0');
}

async function createOrResendOTP(Email,PhoneNo)
{
    await OTPVerificationModel.updateMany({Email,PhoneNo,IsVerified: false, IsActive: true}, 
        { $set: { IsActive: false } });
    const otp = generateOTP();
    const newOTP = new OTPVerificationModel({
        Email, PhoneNo, OTP, IsVerified:false, IsActive :true
    })
    await newOTP.save();
    console.log(`OTP sent to ${Email} | ${PhoneNo} \n otp: ${OTP}`);
    console.log('OTP expires in 5 minutes⏳')
    return {message: 'OTP sent'};
}

async function verifyOTP(Email,PhoneNo,otpEntered)
{
    const query=
    {
        IsActive:true,
        IsVerified: false 
    };
    if(Email) 
    {
        query.Email = Email;
    }
    if(PhoneNo)
    {
        query.PhoneNo = PhoneNo;
    }
    const record = await OTPVerificationModel.findOne(query).sort({createdAt:-1});
    if (!record) return { success: false, message: 'OTP not found. Please request a new one' };
    if (record.OTP !== otpEntered) return { success: false, message: 'Incorrect OTP entered' };
    record.IsVerified = true;
    record.IsActive = false;
    await record.save();
    return { success: true, message: 'OTP Verified successfully' };
}

module.exports= {createOrResendOTP,verifyOTP};