const orgService = require("../Services/OrganizationService");

async function getAllOrgsController(req,res)
{
  try
  {
    const orgs = await orgService.getAllOrganization();
    res.status(200).json(orgs);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
}

async function getPendingOrgsController(req,res)
{
  try
  {
    const orgs = await orgService.getPendingOrganizations();
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

module.exports = { getAllOrgsController,getPendingOrgsController,verifyOrgController,rejectOrgController }