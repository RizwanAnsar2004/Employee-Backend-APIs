const express = require("express");
const router = express.Router();
const { getOrgsController,verifyOrgController,rejectOrgController } = 
require("../Controllers/OrganizationController");
const { superAdminOnly } = require("../Middlewares/CheckSuperAdmin");

router.get("/:status",superAdminOnly, getOrgsController);
router.patch("/:orgId/approve", superAdminOnly,verifyOrgController);
router.patch("/:orgId/reject", superAdminOnly,rejectOrgController);

module.exports = router;