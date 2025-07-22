class RegisterBankInfoDTO {
  constructor({ bankID, accountTitle, accountNo, swiftCode }) {
    const anyfield =  bankID || accountTitle || accountNo || swiftCode;
    const fillfields = bankID && accountTitle && accountNo && swiftCode;

    if (anyfield && !fillfields) {
      throw new Error("If you're entering bank information, Fill all the fields");
    }

    this.bankID = bankID || null;
    this.accountTitle = accountTitle || null;
    this.accountNo = accountNo || null;
    this.swiftCode = swiftCode || null;
  }
}

module.exports = { RegisterBankInfoDTO };