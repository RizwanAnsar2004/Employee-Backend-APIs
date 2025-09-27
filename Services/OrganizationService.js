const Organization = require("../Models/OrganizationModel");
const { organizationStatus } = require("../Utils/Enums");
const { OrgResponseDTO } = require("../DTO/OrganizationDTO")

async function getAllOrganization()
{
  const allOrgs = await Organization.find();
  const response = allOrgs.map(org => new OrgResponseDTO(org))
  return response || [];
}

async function getPendingOrganizations()
{
  const pendingOrganizations = await Organization.find({ orgStatus: organizationStatus.PENDING })
  const response = pendingOrganizations.map(p => new OrgResponseDTO(p));
  return response || [];
}

async function verifyOrganization(orgId)
{
  const org = await Organization.findById(orgId);
  if (!org)
  {
    throw new Error("Organization not found");
  }
  org.orgStatus = organizationStatus.VERIFIED;
  const verifiedOrg = await org.save();
  return new OrgResponseDTO(verifiedOrg);
}

async function rejectOrganization(orgId)
{
  const org = await Organization.findById(orgId);
  if (!org)
    {
      throw new Error("Organization not found");
    }
  org.orgStatus = organizationStatus.BLOCKED;
  const rejectedOrg = await org.save();
  return new OrgResponseDTO(rejectedOrg);
}

module.exports = {  getAllOrganization,getPendingOrganizations,verifyOrganization,rejectOrganization}