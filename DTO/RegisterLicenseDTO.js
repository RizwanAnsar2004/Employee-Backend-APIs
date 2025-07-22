class RegisterLicenseDTO{
    constructor({frontLicenseImgID,backLicenseImgID}){
        if (!frontLicenseImgID) throw new Error("Front License Image is required"); // Image URL rather than img ID right??
        if (!backLicenseImgID) throw new Error("Back License Image is required");

        this.frontLicenseImgID = frontLicenseImgID;
        this.backLicenseImgID = backLicenseImgID;
    }
}

module.exports = { RegisterLicenseDTO };