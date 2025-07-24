const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    password: String,
    frontLicenseImgID: String,
    backLicenseImgID : String,
    isActive: {
        type: Boolean,
        default: true
    },
     statusID: {
    type: Number,
    enum: [0,1],
    default: 0
    },
    roleID: {
        type: String,
        default: "Owner" 
    }

});

module.exports = mongoose.model('users', userSchema);