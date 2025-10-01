const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

async function loginService (loginCredentials)
{
    const user = await User.findOne({ email: loginCredentials.email });
    if (!user)
    {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(loginCredentials.password, user.password);
    if (!isMatch)
    {
        throw new Error("Invalid credentials");
    }
    
    const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" });

   return {
    message: "Login successful",
    token: token
  };
}

module.exports = { loginService }