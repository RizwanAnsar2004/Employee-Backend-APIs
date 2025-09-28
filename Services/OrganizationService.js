const Organization = require("../Models/OrganizationModel");
const { organizationStatus } = require("../Utils/Enums");
const { OrgResponseDTO } = require("../DTO/OrganizationDTO")

async function getOrganization(filter)
{
  let query={};
  switch(filter?.toLowerCase()){
    case "pending" :
      query.orgStatus = organizationStatus.PENDING;
      break;
    case "approved" :
      query.orgStatus = organizationStatus.VERIFIED;
      break;
    case "rejected" :
      query.orgStatus = organizationStatus.BLOCKED;
      break;
    case "all" :
      break;
    default:
      throw new Error("Invalid status filter");
  }
  const allOrgs = await Organization.find(query);
  const response = allOrgs.map(org => new OrgResponseDTO(org))
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

module.exports = {  getOrganization,verifyOrganization,rejectOrganization}