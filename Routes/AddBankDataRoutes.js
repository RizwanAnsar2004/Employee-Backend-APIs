const express = require("express");
const router = express.Router();
const bankController = require("../Controllers/BankController");
const { validateBanks } = require("../Middlewares/ValidateBanks");

router.post("/addinfo", validateBanks, bankController.addBankInfo);
router.get("/getAllBanksInfo", bankController.getAllBanks);
router.patch("/:id/status", bankController.updateBankStatus);

module.exports = router;