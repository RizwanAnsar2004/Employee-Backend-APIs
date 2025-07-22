class RegisterUserDTO{
    constructor({email,phoneNo,firstName,lastName,dateOfBirth,password,frontLicenseImgID,backLicenseImgID,bankInfo})
    {
        if (!email) throw new Error("Email is Required");
        if (!phoneNo) throw new Error("Phone number is required");
        if (!firstName) throw new Error("First name is required");
        if (!lastName) throw new Error("Last name is required");
        if (!dateOfBirth) throw new Error("Date of birth is required");
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (!password || !passwordRegex.test(password)) {
            throw new Error("Password must be at least 8 characters and include a number with letters");}

        this.email = email;
        this.phoneNo = phoneNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
}
module.exports = { RegisterUserDTO }