class VerifyOTPModel {
constructor ({email,phoneNo,otp})
{
    if(!otp){
        throw new Error("OTP is Required");
    }
    if (!email) {
        throw new Error("Invalid Email");
    }
    if (!phoneNo) {
        throw new Error("Invalid Phone No")
    }

    this.email = email || null;
    this.phoneNo = phoneNo || null;
    this.otp = otp;
}
isValid() {
return !!this.otp && (this.email || this.phoneNo);
}
}
module.exports = {VerifyOTPModel};