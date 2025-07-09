const OTPService = require('../Services/OTPService');

async function sendOTP(req,res,next)
    {
        try
        {
            const { Email , PhoneNo } = req.body;
            const response = await OTPService.createOrResendOTP(Email,PhoneNo);
            res.status(200).json(response); 
        } 
        catch (error) 
           {
            next(error);
           }
    };
async function verifyOTP(req, res, next)
    {
      try 
      {
        const { Email, PhoneNo, OTP } = req.body;
        const response = await OTPService.verifyOTP(Email,PhoneNo,OTP);
        res.status(response.success ? 200 : 400).json(response);
      } 
      catch (error) 
      {
        next(error);
      }
    };

module.exports ={sendOTP,verifyOTP}
