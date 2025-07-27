const mongoose = require('mongoose');
const { status, role } = require('../Utils/Enums');

const userSchema = new mongoose.Schema({
   email : {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
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
    enum: Object.values(status),
    default: status.PENDING
    },
    roleID: {
        type: Number,
        enum: Object.values(role),
        default: role.OWNER
    }
});

module.exports = mongoose.model('users', userSchema);