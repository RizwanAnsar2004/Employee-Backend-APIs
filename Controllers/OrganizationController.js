const orgService = require("../Services/OrganizationService");

async function getOrgsController(req, res)
{
  try
  {
    const orgStatus = req.query.status
    const paginatedResult = await orgService.getOrganization(orgStatus, req.pagination);
    res.status(200).json(paginatedResult);
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
}

async function updateOrgStatusController(req, res)
{
  try
  {
    const { orgId,status } = req.params;
    const updated = await orgService.updateOrganizationStatus(orgId,status);
    res.status(200).json({ message: "Organization status updated", org: updated });
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { getOrgsController,updateOrgStatusController }