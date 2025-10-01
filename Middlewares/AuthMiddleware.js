const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const { role } = require("../Utils/Enums");

async function authenticateUser(req,res,next){
    const authHeader = req.headers["authorization"];
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) 
    {
        token = authHeader.split(" ")[1];
    }
    if (!token)
    {
    return res.status(401).json({ message: "Authorization token required" });
    }
    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (err)
    {
    return res.status(403).json({ message: "Invalid or expired token" });
    }
}

function requireSuperAdmin(req, res, next) {
    if (req.user.isSystemAdmin && req.user.roleID === role.SUPERADMIN) 
    {
        return next();
    }
    return res.status(403).json({ message: "Only Super Admin can access" });
}

module.exports = { authenticateUser, requireSuperAdmin }