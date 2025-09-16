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
      swiftCode:{
       type : String,
       minlength: 8,
       maxlength: 11,
      },
      isActive: {
        type: Boolean,
        default: true
    }
})
userBankSchema.index({ bankID: 1, accountNo: 1 }, { unique: true });
module.exports = mongoose.model('user_banks', userBankSchema);