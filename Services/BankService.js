const bank = require('../Models/BankModel');

const addBankInfo = async (addBankData) => {
    const existing = await bank.findOne({ bankCode: addBankData.bankCode });
    if (existing) {
        throw new Error("Bank already exists");
    }

    const newBank = new bank(addBankData);
    return await newBank.save();
};

const getAllBanks = async () => {
  return await bank.find({ isActive: true});
};

const deactivateBank  = async (bankID) => {
    const updatedBank = await bank.findByIdAndUpdate(bankID,{ isActive: false },{ new: true});
    if (!updatedBank) {
        throw new Error("An error occured while updating the Bank");
    }

    return updatedBank;
};


module.exports = { addBankInfo, getAllBanks, deactivateBank };