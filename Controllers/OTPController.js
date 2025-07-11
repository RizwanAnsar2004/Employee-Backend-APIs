const OTPService = require('../Services/OTPService');

async function sendOTP(req,res,next)
    {
        try
        {
            const { email , phoneNo } = req.verificationData;
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
        const dto = req.verificationData;
        const response = await OTPService.verifyOTP(dto);
        res.status(response.success ? 200 : 400).json(response);
      } 
      catch (error) 
      {
        next(error);
      }
    };

module.exports ={sendOTP,verifyOTP}
