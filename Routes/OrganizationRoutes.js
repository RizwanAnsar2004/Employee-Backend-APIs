const express = require("express");
const router = express.Router();
const { getOrgsController,updateOrgStatusController } = 
require("../Controllers/OrganizationController");
const { authenticateUser, requireSuperAdmin } = require("../Middlewares/AuthMiddleware");
const { validatePaginationSortingDTO } = require("../Middlewares/ValidatePaginationSorting")

router.get("/",authenticateUser, requireSuperAdmin,validatePaginationSortingDTO, getOrgsController);
router.patch("/:orgId/:status", authenticateUser, requireSuperAdmin,updateOrgStatusController);

module.exports = router;