const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const userBank = require("../Models/UserBankModel");
const bank = require("../Models/BankModel");
const organizationSchema = require("../Models/OrganizationModel");

async function registerUser(userData,orgData)
{
  const session = await mongoose.startSession();
  try{
  session.startTransaction();
  const existingUser = await User.findOne({
      $or: [
        { email: userData.email },
        { phoneNo: userData.phoneNo }
      ]
    }).session(session);

    if (existingUser) {
      throw new Error("User with this email or phone number already exists");
    }

    if (userData.bankID) {
      const existingBank = await bank.findById(userData.bankID).session(session);
      if (existingBank) {
        if (!existingBank.isActive) {
          existingBank.isActive = true;
          await existingBank.save({ session });
        }
      } else {
        throw new Error("Bank not found with the given bankID");
      }
    }

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
    }).save({ session });

    if(user==null){
      throw new Error("User Registration failed");
    }

    const userBankData = await new userBank({
      userID: user._id,
      bankID : userData.bankID,
      accountTitle : userData.accountTitle,
      accountNo : userData.accountNo,
      swiftCode : userData.swiftCode
    }).save({ session });
    
    const org = await new organizationSchema({
      organizationName : orgData.organizationName,
      orgType : orgData.orgType,
      registrationNumber: orgData.registrationNumber,
      industryOrSector : orgData.industryOrSector,
      orgEmail : orgData.orgEmail,
      orgPhoneNo : orgData.orgPhoneNo,
      website : orgData.website,
      address : orgData.address,
      city : orgData.city,
      country : orgData.country,
      stablishedDate : orgData.stablishedDate,
      logoURL : orgData.logoURL,
      description : orgData.description,
      numberOfEmployees : orgData.numberOfEmployees
      }).save({session});

      if (org == null) {
        throw new Error("Organization registration failed");
      }

    await session.commitTransaction();
    return {
      message: "User and Organization registration successful",
      userId: user._id,
      organizationId : org._id
    }
  }
  catch(error){
    await session.abortTransaction();
    throw error;
  }
  finally{
    session.endSession();
  }
}

    module.exports = { registerUser };