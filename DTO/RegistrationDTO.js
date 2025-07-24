class RegistrationDTO{
    constructor({email,phoneNo,firstName,lastName,dateOfBirth,password,frontLicenseImgID,backLicenseImgID,bankID, accountTitle, accountNo, swiftCode}){
    const anyUserDatafield =  email || phoneNo || firstName || lastName || dateOfBirth || password || frontLicenseImgID|| backLicenseImgID;
    const fillUserDatafields = email && phoneNo && firstName && lastName && dateOfBirth && password && frontLicenseImgID&& backLicenseImgID;

    if (anyUserDatafield && !fillUserDatafields) {
      throw new Error("All personal and license information are required");
    }

     if (password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Password must be at least 8 characters and include both letters and numbers.");
        }
    }

    const anyBankfield =  bankID || accountTitle || accountNo || swiftCode;
    const fillBankfields = bankID && accountTitle && accountNo && swiftCode;

    if (anyBankfield && !fillBankfields) {
      throw new Error("If you're entering bank information, Fill all the fields");
    }

    this.email = email;
    this.phoneNo = phoneNo;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
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