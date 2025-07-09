const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    Email : {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    PhoneNo: {
        type: String,
        required: true,
        match: /^03[0-9]{9}$/
    },
    OTP : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
        match: /^[0-9]{4}$/
    },
    IsVerified : {
        type: Boolean,
        default: false
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    CreatedAt : { 
        type: Date, 
        default: Date.now,
        expires: 300
    }
});

module.exports = mongoose.model('OTPVerification', otpSchema);