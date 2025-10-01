const { loginService } = require("../Services/AuthServices");

async function loginController(req, res)
{
  try
  {
    const result = await loginService(req.loginCredentials);
    res.status(200).json(result);
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { loginController }