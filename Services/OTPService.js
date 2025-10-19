const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken"); 
const otpVerificationModel = require("../Models/OTPVerificationModel");

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
             $set: {isActive : false } 
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

async function verifyOTP(dto) {
  try 
  {
    const email = dto.email.trim().toLowerCase();
    const phoneNo = dto.phoneNo.trim();
    const otp = dto.otp.trim();

    console.log("Verifying OTP with:", { email, phoneNo, otp }); 

    const existingRecord = await otpVerificationModel.findOne({ email, phoneNo });
    if (existingRecord && existingRecord.isVerified)
    {
      console.log("OTP already verified for:", { email, phoneNo });
      return { success: false, message: "OTP already verified. Please request a new OTP." };
    }

    const record = await otpVerificationModel.findOne({
      email,
      phoneNo,
      isActive: true,
      isVerified: false,
    });

    if (!record)
    {
      console.log("No active OTP record found for:", { email, phoneNo });
      return { success: false, message: "Invalid Email, Phone Number, or OTP expired" };
    }

    if (record.otp !== otp)
    {
      console.log("OTP mismatch:", { stored: record.otp, provided: otp });
      return { success: false, message: "Incorrect OTP entered" };
    }

    record.isVerified = true;
    record.isActive = false;
    console.log("Updating OTP record:", record); 
    await record.save();

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      throw new Error("Server configuration error: JWT_SECRET missing");
    }

    const otpToken = jwt.sign({ email, phoneNo }, process.env.JWT_SECRET, { expiresIn: "10m" });

    return { success: true, message: "OTP Verified successfully", otpToken };
  }
  catch (err)
  {
    console.error("Detailed error during OTP verification:", {
      message: err.message,
      stack: err.stack,
      email: dto.email,
      phoneNo: dto.phoneNo,
      otp: dto.otp,
    });
    return { success: false, message: `Server error during OTP verification: ${err.message}` };
  }
}

module.exports= {createOrResendOTP,verifyOTP};