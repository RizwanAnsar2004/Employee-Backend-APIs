const bank = require('../Models/BankModel');

const addBankInfo = async (addBankData) => {
    const existing = await bank.findOne({ bankCode: addBankData.bankCode });
    if (existing) {
        throw new Error("Bank with this code already exists");
    }

    const newBank = new bank(addBankData);
    return await newBank.save();
};

const getAllBanks = async () => {
  return await bank.find({ isActive: true});
};

const toggleBankStatus = async (bankID) => {
    const updatedBank = await bank.findById(bankID);

    if (!updatedBank) {
        throw new Error("Bank not found");
    }

    updatedBank.isActive = !updatedBank.isActive;
    return await updatedBank.save();;
};

module.exports = { addBankInfo, getAllBanks, toggleBankStatus };