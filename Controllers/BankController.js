const bankService = require("../Services/BankService");

const addBankInfo = async (req, res) => {
  try {
    const savedBank = await bankService.addBankInfo(req.addBankData);
    res.status(201).json({ message: "Bank added", data: savedBank });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBanks = async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.status(200).json({ banks });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleBankStatus = async (req, res) => {
  try {
    const updatedBank = await bankService.toggleBankStatus(req.params.id);
    res.status(200).json({ message: "Bank status updated", data: updatedBank });
  }
   catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addBankInfo, getAllBanks,toggleBankStatus };
