const Organization = require("../Models/OrganizationModel");
const { organizationStatus } = require("../Utils/Enums");
const { OrgResponseDTO } = require("../DTO/OrganizationDTO")
const { PaginatedOrgResponseDTO } = require("../DTO/PaginationSortingDTO");

async function getOrganization(orgStatus,pagination)
{
  let query={};
  switch (true) {
    case /^pending$/i.test(orgStatus):
      query.orgStatus = organizationStatus.PENDING;
      break;

    case /^(approved|verified)$/i.test(orgStatus): 
      query.orgStatus = organizationStatus.VERIFIED;
      break;

    case /^(rejected|blocked)$/i.test(orgStatus): 
      query.orgStatus = organizationStatus.BLOCKED;
      break;

    default:
      break;
  }

  if (pagination.searchTerm)
  {
    query.organizationName = { $regex: pagination.searchTerm, $options: "i" };
  }
  const sortDirection = pagination.sortDirection === "asc" ? 1 : -1;
  const sortObj = { [pagination.sortColumn]: sortDirection };
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;
  const totalRecords = await Organization.countDocuments(query);
  const allOrgs = await Organization.find(query)
    .sort(sortObj)
    .skip(skip)
    .limit(pagination.pageSize);

  const response = allOrgs.map(org => new OrgResponseDTO(org));
  return new PaginatedOrgResponseDTO({
    noOfRecords: totalRecords,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    data: response
  })
}

async function updateOrganizationStatus(orgId,status)
{
  const org = await Organization.findById(orgId);
  if (!org)
  {
    throw new Error("Organization not found");
  }
  if (status.toLowerCase() === "approve" || status.toLowerCase() === "verify")
  {
    org.orgStatus = organizationStatus.VERIFIED;
  }
  else if (status.toLowerCase() === "reject" || status.toLowerCase() === "block")
  {
    org.orgStatus = organizationStatus.BLOCKED;
  }
  else
  {
    throw new Error("Invalid status");
  }
  const updatedOrgStatus = await org.save();
  return new OrgResponseDTO(updatedOrgStatus);
}

module.exports = {  getOrganization,updateOrganizationStatus }