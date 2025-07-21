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
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
    password: String,
    frontLicenseImgID: String,
    backLicenseImgID : String
});

module.exports = mongoose.model('users', userSchema);
