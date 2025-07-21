class RegisterBankInfoDTO {
  constructor({ userID, bankName, bankID, accountTitle, accountNo, swiftCode }) {
    if (!userID) throw new Error("User ID is required");
    const anyfield = bankName || bankID || accountTitle || accountNo || swiftCode;
    const fillfields = bankName && bankID && accountTitle && accountNo && swiftCode;

    if (anyfield && !fillfields) {
      throw new Error("If you're entering bank information, Fill all the fields");
    }

    this.userID = userID;
    this.bankName = bankName || null;
    this.bankID = bankID || null;
    this.accountTitle = accountTitle || null;
    this.accountNo = accountNo || null;
    this.swiftCode = swiftCode || null;
  }
}

module.exports = { RegisterBankInfoDTO };