const mongoose = require('mongoose');
const status ={
    PENDING: 0,
    VERIFIED: 1
}
const role ={
    OWNER: 0,
    EMPLOYEE: 1
}

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
    enum: [status.PENDING, status.VERIFIED],
    default: status.PENDING
    },
    roleID: {
        type: Number,
        enum: [role.OWNER, role.EMPLOYEE],
        default: role.OWNER 
    }
});

module.exports = mongoose.model('users', userSchema);