const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const { role } = require("../Utils/Enums");
const { UserCredentialsDTO } = require("../DTO/RegistrationDTO"); 

async function superAdminOnly(req, res, next) {
  try 
  {
    let loginCredentials;
    try 
    {
      loginCredentials = new UserCredentialsDTO({
        email: req.headers["superadmin-email"],   
        password: req.headers["superadmin-password"]
      });
    } 
    catch (err) 
    {
      return res.status(400).json({ message: err.message });
    }

    const user = await User.findOne({ email: loginCredentials.email });
    if (!user)
    {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(loginCredentials.password, user.password);
    if (!isMatch)
    {
        return res.status(401).json({ message: "Invalid password" });
    }
    if (!(user.isSystemAdmin && user.roleID === role.SUPERADMIN)) 
    {
      return res.status(403).json({ message: "Only Super Admins can access this" });
    }
    req.superAdmin = user;
    next();
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { superAdminOnly };