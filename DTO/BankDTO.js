class AddBankDTO{
    constructor({bankName,bankCode,bankAddress})
    {
        if (!bankName || !bankCode)
            {
                throw new Error("*Bank Name and Bank Code are required")
            }
            this.bankName = bankName.trim().toLowerCase();
            this.bankCode = bankCode.trim().toLowerCase();
            this.bankAddress = bankAddress ? bankAddress.trim().toLowerCase() : null;
    }
}

class BankResponseDTO{
    constructor(bank)
    {
        this.id = bank._id;
        this.bankName = bank.bankName;
        this.bankCode = bank.bankCode;
        this.bankAddress = bank.bankAddress || null;
    }
}
module.exports = { AddBankDTO, BankResponseDTO };