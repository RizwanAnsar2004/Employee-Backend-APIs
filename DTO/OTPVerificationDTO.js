class VerifyOTPModel {
  constructor({ email, phoneNo, otp }) {
    if (!otp || typeof otp !== "string" || otp.trim() === "") {
      throw new Error("OTP is required and must be a non-empty string");
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      throw new Error("Valid email is required");
    }
    if (!phoneNo || typeof phoneNo !== "string" || !/^\+?\d{10,15}$/.test(phoneNo.trim())) {
      throw new Error("Valid phone number is required (10-15 digits, optional + prefix)");
    }

    this.email = email.trim().toLowerCase();
    this.phoneNo = phoneNo.trim();
    this.otp = otp.trim();
  }
}
module.exports = { VerifyOTPModel };