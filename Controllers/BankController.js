const bankService = require("../Services/BankService");
const { BankResponseDTO } = require("../DTO/BankDTO");

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
    const response = banks.map(b => new BankResponseDTO(b));
    res.status(200).json({ Banks : response });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBankStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBank = await bankService.deactivateBank(id);
    res.status(200).json({ message: "Bank status updated", data: updatedBank });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addBankInfo, getAllBanks,updateBankStatus };
