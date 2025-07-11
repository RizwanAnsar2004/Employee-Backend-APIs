const { default: mongoose } = require('mongoose');
const otpVerificationModel = require ('../Models/OTPVerificationModel');

function generateOTP(){
    return Math.floor(Math.random()*10000).toString().padStart(4,'0');
}

async function createOrResendOTP(OTPObject)
{
    const {email, phoneNo} = OTPObject;
    await otpVerificationModel.updateMany({
        email:email,
        phoneNo:phoneNo,
        isVerified: false, 
        isActive: true
    }, 
        {
             $set: { isVerified : true, isActive : false } 
        });

    const otp = generateOTP();
    await new otpVerificationModel({
        email :email,
        phoneNo : phoneNo,
        otp : otp,
        isVerified: false,
        isActive:true
    }).save();
    
    console.log(`OTP sent to ${email} | ${phoneNo} \n otp: ${otp}`);
    return {message: 'OTP sent'};
}

async function verifyOTP(dto)
{
    const { email, phoneNo, otp } = dto;
    const searchParamters={
        isActive:true,
        isVerified: false 
    };

    if(email) 
    {
        searchParamters.email = email;
    }
    if(phoneNo)
    {
        searchParamters.phoneNo = phoneNo;
    }
    const record = await otpVerificationModel.findOne(searchParamters);
    if (!record)  throw new Error('Invalid Email or Phone Number');
    if (record.otp !== otp) throw new Error('Incorrect OTP entered');
   
    record.isVerified = true;
    record.isActive = false;
    await record.save();
    return { success: true, message: 'OTP Verified successfully' };
}

module.exports= {createOrResendOTP,verifyOTP};