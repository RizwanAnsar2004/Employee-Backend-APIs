const mongoose = require("mongoose");

const bankSchema= new mongoose.Schema({
    bankName :String,
    bankCode : String,
    bankAddress : String,
    isActive: {
    type: Boolean,
    default: true
    }
})
module.exports = mongoose.model('banks', bankSchema);