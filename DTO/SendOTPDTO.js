class SendOTPDTO{
    constructor({email,phoneNo}){
        if (!email) {
            throw new Error("Invalid Email");
        }
        if (!phoneNo){
            throw new Error("Invalid Phone No");
        }

        this.email = email ;
        this.phoneNo=phoneNo;
    }
    isValid()
    {
        return !!this.email && !!this.phoneNo;
    }
}
module.exports = {SendOTPDTO};