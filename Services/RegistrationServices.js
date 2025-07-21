const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const userBank = require("../Models/UserBankModel");

async function registerUser(userData)
{
    const {email,phoneNo,firstname,lastname,dateOfBirth,password} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
    email,
    phoneNo,
    firstname,
    lastname,
    dateOfBirth,
    password: hashedPassword
    }).save();

     return {
    message: "User Identity Info saved",
    userID: user._id
  };
    }

 async function registerLicenseInfo(licenseData){
    const {userID, frontLicenseImgID, backLicenseImgID} = licenseData;
    const user = await User.findByIdAndUpdate(userID,{ frontLicenseImgID, backLicenseImgID },{ new: true });
    
    if(!user) throw new Error("User not found");

    return{message:"License Info saved"};
  }
  
    async function registerBankInfo(bankData){
    const { userID } = bankData;
    const user = await User.findById(userID);
    
    if (!user) throw new Error("User not found");
    await new userBank(bankData).save();
    
    return { message: "Bank info saved" };
}

    module.exports = { registerUser, registerLicenseInfo,registerBankInfo };