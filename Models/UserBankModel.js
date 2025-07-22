const mongoose = require("mongoose");

const userBankSchema = new mongoose.Schema({
      userID: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }, 
      bankID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "banks",
        required: true
      },
      accountTitle: String,
      accountNo: String,
      swiftCode: String
})

module.exports = mongoose.model('user_banks', userBankSchema);