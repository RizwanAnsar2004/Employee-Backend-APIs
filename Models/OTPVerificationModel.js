const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    phoneNo: {
        type: String,
        required: true,
        match: /^03[0-9]{9}$/
    },
    otp : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
        match: /^[0-9]{4}$/
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt : { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('OTPVerification', otpSchema);