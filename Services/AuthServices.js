const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const { role } = require("../Utils/Enums");

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
    
    if (user.isSystemAdmin && user.roleID === role.SUPERADMIN) 
    {
    return{
      message: "Super Admin Login successful"
    };}

  return{
    message: "Login successful"
  };
}

module.exports = { loginService }