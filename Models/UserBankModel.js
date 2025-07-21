const mongoose = require("mongoose");

const userBankSchema = new mongoose.Schema({
      userID: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      bankName:String,
      bankID:String,
      accountTitle: String,
      accountNo: String,
      swiftCode: String
})

module.exports = mongoose.model('user_banks', userBankSchema);