const jwt = require("jsonwebtoken");
const Organization = require("../Models/OrganizationModel");
const { role, organizationStatus } = require("../Utils/Enums");

async function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

function requireSuperAdmin(req, res, next) {
  if (req.user.isSystemAdmin && req.user.roleID === role.SUPERADMIN) {
    return next();
  }
  return res.status(403).json({ message: "Only Super Admin can access" });
}

async function requireVerifiedOwner(req, res, next) {
  try {
    const { roleID, orgId } = req.user;
    if (roleID !== role.OWNER) {
      return res.status(403).json({ message: "Only organization owners can perform this action" });
    }

    const org = await Organization.findById(orgId);
    if (!org || org.orgStatus !== organizationStatus.VERIFIED) {
      return res.status(403).json({ message: "Your organization must be verified before adding departments or employees" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Authorization check failed: " + err.message });
  }
}

module.exports = { authenticateUser, requireSuperAdmin, requireVerifiedOwner };