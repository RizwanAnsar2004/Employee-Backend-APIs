const OTPService = require('../Services/OTPService');

async function sendOTP(req,res,next)
    {
        try
        {
            const { email , phoneNo } = req.body;
            const response = await OTPService.createOrResendOTP(email,phoneNo);
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
        const { email, phoneNo, otp } = req.body;
        const response = await OTPService.verifyOTP(email,phoneNo,otp);
        res.status(response.success ? 200 : 400).json(response);
      } 
      catch (error) 
      {
        next(error);
      }
    };

module.exports ={sendOTP,verifyOTP}
