const OTPService = require('../Services/OTPService');
const { SendOTPDTO } = require('../DTO/SendOTPDTO');
const { VerifyOTPModel } = require('../DTO/OTPVerificationDTO');

async function sendOTP(req,res,next)
    {
        try
        {
          const OTPObject = new SendOTPDTO(req.verificationData);
          const response = await OTPService.createOrResendOTP(OTPObject);
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
        const dto = new VerifyOTPModel(req.verificationData);
        const response = await OTPService.verifyOTP(dto);
        res.status(response.success ? 200 : 400).json(response);
      } 
      catch (error) 
      {
        next(error);
      }
    };

module.exports ={sendOTP,verifyOTP}
