class AddBankDTO{
    constructor({bankName,bankCode,bankAddress}){
        if (!bankName || !bankCode){
            throw new Error("*Bank Name and Bank Code are required")
        }
        this.bankName = bankName;
        this.bankCode = bankCode;
        this.bankAddress = bankAddress || null;

    }
}
module.exports = { AddBankDTO };