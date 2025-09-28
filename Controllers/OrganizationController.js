const orgService = require("../Services/OrganizationService");

async function getOrgsController(req,res)
{
  try
  {
    const filter = req.params.status;
    const orgs = await orgService.getOrganization(filter);
    res.status(200).json(orgs);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
}

async function verifyOrgController(req, res)
{
  try
  {
    const { orgId } = req.params;
    const updated = await orgService.verifyOrganization(orgId);
    res.status(200).json({ message: "Organization approved", org: updated });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
}

async function rejectOrgController(req, res)
{
  try
  {
    const { orgId } = req.params;
    const updated = await orgService.rejectOrganization(orgId);
    res.status(200).json({ message: "Organization rejected", org: updated });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getOrgsController,verifyOrgController,rejectOrgController }