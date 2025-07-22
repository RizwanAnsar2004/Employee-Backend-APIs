const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const userBank = require("../Models/UserBankModel");

async function registerUser(userData)
{
    try{const {email,phoneNo,firstName,lastName,dateOfBirth,password} = userData;

    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await new User({
    email : email,
    phoneNo : phoneNo,
    firstName : firstName,
    lastName : lastName,
    dateOfBirth : dateOfBirth,
    password: hashedPassword
    }).save();

     return {
    message: "User Identity Info saved",
    userID: user._id
  };}
    catch (error) {
    throw new Error(`User registration failed: ${error.message}`);
  }
  }
    

 async function registerLicenseInfo(licenseData){
   try{const user = await User.findByIdAndUpdate(
    licenseData.userID,
    {
      frontLicenseImgID: licenseData.frontLicenseImgID,
      backLicenseImgID: licenseData.backLicenseImgID,
    },
    { new: true }
  );

  if (!user) throw new Error("User not found");
  return { message: "License Info saved" };}
  catch(error){
    throw new Error(`Failed to save license info: ${error.message}`);
  }
  }
  
  async function registerBankInfo(bankData){
    try {const { userID } = bankData;
    const user = await User.findById(userID);
    
    if (!user) throw new Error("User not found");
    await new userBank(bankData).save();
    
    return { message: "Bank info saved" };}

    catch (error) {
    throw new Error(`Failed to save bank info: ${error.message}`);
  }
  }

    module.exports = { registerUser, registerLicenseInfo,registerBankInfo };