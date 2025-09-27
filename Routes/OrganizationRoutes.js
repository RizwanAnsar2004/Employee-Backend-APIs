const express = require("express");
const router = express.Router();
const { getAllOrgsController,getPendingOrgsController,verifyOrgController,rejectOrgController } = 
require("../Controllers/OrganizationController");
const { superAdminOnly } = require("../Middlewares/CheckSuperAdmin");

router.get("/all",superAdminOnly,getAllOrgsController);
router.get("/pending", superAdminOnly,getPendingOrgsController);
router.patch("/:orgId/approve", superAdminOnly,verifyOrgController);
router.patch("/:orgId/reject", superAdminOnly,rejectOrgController);

module.exports = router;