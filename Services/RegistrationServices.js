const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const userBank = require("../Models/UserBankModel");

async function registerUser(userData)
{
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const user = await new User({
    email : userData.email,
    phoneNo : userData.phoneNo,
    firstName : userData.firstName,
    lastName : userData.lastName,
    dateOfBirth : userData.dateOfBirth,
    password: hashedPassword,
    frontLicenseImgID: userData.frontLicenseImgID,
    backLicenseImgID: userData.backLicenseImgID
    }).save();

    if(user==null){
      throw new Error("User Registration failed");
    }

    const userBankData = await new userBank({
      userID: user._id,
      bankID : userData.bankID,
      accountTitle : userData.accountTitle,
      accountNo : userData.accountNo,
      swiftCode : userData.swiftCode
    }).save();
    
    return {
      message: "User Registration successful",
      userID: user._id
    }
  }

    module.exports = { registerUser };