const { validatePassword } = require("../Helpers/ValidatePassword");

class RegistrationDTO{
    constructor({email,phoneNo,firstName,lastName,dateOfBirth,password,frontLicenseImgID,backLicenseImgID,bankID, accountTitle, accountNo, swiftCode}){
    const requiredUserData =  {email, phoneNo, firstName, lastName, dateOfBirth, password, frontLicenseImgID, backLicenseImgID};
    const missingUserData = Object.entries(requiredUserData).filter(([key, val]) => !val);
    if (missingUserData.length >0)
    {
      const fields = missingUserData.map(([key])=>key).join(", ");
      throw new Error(`Missing required fields: ${fields}`);
    }

    const bankFields = { bankID, accountTitle, accountNo, swiftCode };
    const filledBankFields = Object.entries(bankFields).filter(([k, v]) => v);
    if (
      filledBankFields.length > 0 &&
      filledBankFields.length < Object.keys(bankFields).length
    ) {
      throw new Error("Fill all the Bank account information");
    }

    this.email = email;
    this.phoneNo = phoneNo;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    validatePassword(password);
    this.password = password;
    this.frontLicenseImgID = frontLicenseImgID;
    this.backLicenseImgID = backLicenseImgID;
    this.bankID = bankID || null;
    this.accountTitle = accountTitle || null;
    this.accountNo = accountNo || null;
    this.swiftCode = swiftCode || null;
    }
}

module.exports = { RegistrationDTO }