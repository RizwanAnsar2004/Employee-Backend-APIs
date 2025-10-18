const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const { status } = require("../Utils/Enums");

async function loginService(loginCredentials) {
    const user = await User.findOne({ email: loginCredentials.email });
    if (!user)
    {
        throw new Error("User not found");
    }

    if (user.status === status.BLOCKED)
    {
        throw new Error("Your account has been blocked");
    }

    if (user.status === status.PENDING)
    {
        throw new Error("Your account is pending verification.");
    }

    const isMatch = await bcrypt.compare(loginCredentials.password, user.password);
    if (!isMatch)
    {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user._id,
            roleID: user.roleID,         
            isSystemAdmin: user.isSystemAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return{
        message: "Login successful",
        token: token
    };
}

module.exports = { loginService };