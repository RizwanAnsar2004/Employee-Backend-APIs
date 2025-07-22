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

const updateBankStatus = async (bankID, isActive) => {
    const updatedBank = await bank.findByIdAndUpdate(
        bankID,
        { isActive },
        { new: true, runValidators: true }
    );

    if (!updatedBank) {
        throw new Error("Bank not found");
    }

    return updatedBank;
};


module.exports = { addBankInfo, getAllBanks, updateBankStatus };