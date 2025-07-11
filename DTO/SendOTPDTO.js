class SendOTPDTO{
    constructor({email,phoneNo}){
        if (!email) {
            throw new Error("Enter Valid Email");
        }
        if (!phoneNo){
            throw new Error("Enter Valid PhoneNo");
        }

        this.email = email ;
        this.phoneNo=phoneNo;
    }
    isValid()
    {
        return !!this.email && !!this.phoneNo;
    }
}
module.exports = { SendOTPDTO };